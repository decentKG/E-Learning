export type SubscriptionPlan = "weekly" | "monthly";

export type Subscription = {
  plan: SubscriptionPlan;
  expiresAt: number; // epoch ms
};

const STORAGE_KEY = "subscription";

export function getSubscription(): Subscription | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Subscription;
    return parsed;
  } catch {
    return null;
  }
}

export function isSubscriptionActive(sub?: Subscription | null): boolean {
  const subToCheck = sub ?? getSubscription();
  if (!subToCheck) return false;
  return Date.now() < subToCheck.expiresAt;
}

export function purchaseWeekly(): Subscription {
  const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
  const sub: Subscription = { plan: "weekly", expiresAt: Date.now() + oneWeekMs };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sub));
  return sub;
}

export function purchaseMonthly(): Subscription {
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  const sub: Subscription = { plan: "monthly", expiresAt: Date.now() + thirtyDaysMs };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sub));
  return sub;
}

export function cancelSubscription(): void {
  localStorage.removeItem(STORAGE_KEY);
}


