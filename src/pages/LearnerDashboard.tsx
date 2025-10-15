import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, FileText, LogOut, Bell, ShieldCheck } from 'lucide-react';
import { mockSubjects, mockLessons, getLessonsBySubject } from '@/data/mockData';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubjectCard from '@/components/SubjectCard';
import LessonCard from '@/components/LessonCard';
import { getSubscription, isSubscriptionActive, purchaseMonthly, purchaseWeekly, cancelSubscription } from '@/data/subscription';
import { Checkbox } from '@/components/ui/checkbox';

const LearnerDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [subActive, setSubActive] = useState<boolean>(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userData);
    if (user.role !== 'learner') {
      navigate('/teacher/dashboard');
      return;
    }
    
    setCurrentUser(user);
    setSubActive(isSubscriptionActive(getSubscription()));
    const completed = localStorage.getItem('onboardingCompleted');
    if (!completed) {
      setShowOnboarding(true);
      // Preselect user's subjects if present
      if (Array.isArray(user.subjects) && user.subjects.length > 0) {
        setSelectedSubjectIds(user.subjects);
      }
    }
  }, [navigate]);

  const handlePurchaseWeekly = () => {
    purchaseWeekly();
    setSubActive(true);
    toast.success('Weekly plan activated');
  };

  const handlePurchaseMonthly = () => {
    purchaseMonthly();
    setSubActive(true);
    toast.success('Monthly plan activated');
  };

  const handleCancel = () => {
    cancelSubscription();
    setSubActive(false);
    toast.success('Subscription cancelled');
  };

  // Onboarding pricing (demo values per subject)
  const WEEKLY_PER_SUBJECT = 1; // $1 per subject weekly
  const MONTHLY_PER_SUBJECT = 3; // $3 per subject monthly
  const weeklyTotal = selectedSubjectIds.length * WEEKLY_PER_SUBJECT;
  const monthlyTotal = selectedSubjectIds.length * MONTHLY_PER_SUBJECT;

  const toggleSubject = (id: string) => {
    setSelectedSubjectIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const completeOnboarding = () => {
    localStorage.setItem('onboardingSelectedSubjects', JSON.stringify(selectedSubjectIds));
    localStorage.setItem('onboardingCompleted', 'true');
    setShowOnboarding(false);
    toast.success('Preferences saved');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header with banner image */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome, {currentUser.name || 'Learner'}!
              </h1>
              <p className="text-muted-foreground">Continue your learning journey</p>
            </div>
            <div className="hidden md:block w-full md:w-60">
              <img src="https://images.unsplash.com/photo-1498079022511-d15614cb1c02?auto=format&fit=crop&w=800&q=60" alt="Learning" className="w-full rounded-lg border shadow-card object-cover" />
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Notifications</span>
              </Button>
              <Button onClick={handleLogout} variant="outline" className="gap-2">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Subscription Banner */}
        {!subActive && (
          <div className="mb-6">
            <div className="bg-card border shadow-card rounded-lg p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-lg font-semibold">Unlock all lessons</div>
                  <div className="text-sm text-muted-foreground">Choose a plan to access full content</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handlePurchaseWeekly} variant="default">Weekly • $2</Button>
                <Button onClick={handlePurchaseMonthly} variant="outline">Monthly • $5</Button>
              </div>
            </div>
          </div>
        )}

        {/* First-time Onboarding: choose subjects and see pricing */}
        {showOnboarding && (
          <div className="mb-8">
            <div className="bg-card border shadow-card rounded-lg p-4 md:p-6">
              <h2 className="text-xl font-bold mb-4">Choose your subjects</h2>
              <p className="text-sm text-muted-foreground mb-4">Select the subjects you want to learn. Pricing is per subject.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {mockSubjects.map((subject) => (
                  <label key={subject.id} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                    <Checkbox
                      checked={selectedSubjectIds.includes(subject.id)}
                      onCheckedChange={() => toggleSubject(subject.id)}
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 rounded overflow-hidden border">
                        {subject.image ? (
                          <img src={subject.image} alt={subject.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className={`${subject.color} w-full h-full`} />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{subject.name}</div>
                        <div className="text-xs text-muted-foreground">${WEEKLY_PER_SUBJECT}/week • ${MONTHLY_PER_SUBJECT}/month</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <div><span className="font-semibold">Weekly total:</span> ${weeklyTotal}</div>
                  <div><span className="font-semibold">Monthly total:</span> ${monthlyTotal}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setSelectedSubjectIds([])}>Clear</Button>
                  <Button onClick={completeOnboarding} disabled={selectedSubjectIds.length === 0}>Continue</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <Card className="p-4 shadow-card border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mockSubjects.length}</div>
                <div className="text-sm text-muted-foreground">Subjects</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 shadow-card border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mockLessons.length}</div>
                <div className="text-sm text-muted-foreground">Lessons</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 shadow-card border col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">New Updates</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Lessons with quick actions (gated) */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Recent Lessons</h2>
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${subActive ? '' : 'opacity-50 pointer-events-none select-none'}`}>
            {mockLessons.slice(0, 4).map((lesson) => {
              const subject = mockSubjects.find(s => s.id === lesson.subjectId);
              return (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  subjectName={subject?.name}
                />
              );
            })}
          </div>
          <div className="mt-4 flex gap-3">
            <Button variant="outline" onClick={() => navigate('/lessons/upcoming')}>
              See Upcoming Lessons
            </Button>
            {!subActive && (
              <Button onClick={handlePurchaseWeekly}>Unlock with Weekly Plan</Button>
            )}
          </div>
        </div>

        {/* My Subjects */}
        <div>
          <h2 className="text-2xl font-bold mb-6">My Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSubjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                lessonCount={getLessonsBySubject(subject.id).length}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LearnerDashboard;
