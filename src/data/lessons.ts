export type LessonEvent = {
  id: string;
  title: string;
  subject: string;
  teacherName: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  roomId: string;
  description?: string;
};

export const mockLessons: LessonEvent[] = [
  {
    id: "1",
    title: "Algebra: Quadratic Equations",
    subject: "Mathematics",
    teacherName: "Ms. Johnson",
    startTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    roomId: "math-101",
    description: "Solving quadratics by factoring and formula.",
  },
  {
    id: "2",
    title: "Photosynthesis Deep Dive",
    subject: "Biology",
    teacherName: "Dr. Wong",
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
    roomId: "bio-201",
    description: "Light-dependent and Calvin cycle overview.",
  },
];

export function listUpcomingLessons(): Promise<LessonEvent[]> {
  return Promise.resolve(mockLessons);
}

export function getLessonByRoomId(roomId: string): Promise<LessonEvent | undefined> {
  return Promise.resolve(mockLessons.find(l => l.roomId === roomId));
}


