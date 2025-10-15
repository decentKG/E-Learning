// Mock data for Seke 5 High School Learning Platform

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'learner';
  avatar?: string;
  subjects?: string[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  teacherId: string;
  color: string;
  image?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  teacherId: string;
  content: string;
  videoUrl?: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  lessonId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const mockTeachers: User[] = [
  {
    id: 't1',
    name: 'Mrs. Chipo Moyo',
    email: 'c.moyo@seke5.ac.zw',
    role: 'teacher',
    subjects: ['math', 'physics'],
  },
  {
    id: 't2',
    name: 'Mr. Tendai Ncube',
    email: 't.ncube@seke5.ac.zw',
    role: 'teacher',
    subjects: ['english', 'literature'],
  },
  {
    id: 't3',
    name: 'Mrs. Rudo Mapfumo',
    email: 'r.mapfumo@seke5.ac.zw',
    role: 'teacher',
    subjects: ['biology', 'chemistry'],
  },
];

export const mockLearners: User[] = [
  {
    id: 'l1',
    name: 'Tatenda Sibanda',
    email: 't.sibanda@student.seke5.ac.zw',
    role: 'learner',
    subjects: ['math', 'english', 'biology', 'physics'],
  },
];

export const mockSubjects: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    code: 'MATH-101',
    description: 'Advanced level Mathematics covering calculus, algebra, and geometry',
    teacherId: 't1',
    color: 'bg-blue-500',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=60',
  },
  {
    id: 'physics',
    name: 'Physics',
    code: 'PHY-101',
    description: 'Study of matter, energy, and the fundamental laws of nature',
    teacherId: 't1',
    color: 'bg-purple-500',
    image: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc3?auto=format&fit=crop&w=1200&q=60',
  },
  {
    id: 'english',
    name: 'English Language',
    code: 'ENG-101',
    description: 'English grammar, composition, and communication skills',
    teacherId: 't2',
    color: 'bg-green-500',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=60',
  },
  {
    id: 'literature',
    name: 'Literature',
    code: 'LIT-101',
    description: 'Study of poetry, prose, and drama from various cultures',
    teacherId: 't2',
    color: 'bg-amber-500',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=60',
  },
  {
    id: 'biology',
    name: 'Biology',
    code: 'BIO-101',
    description: 'Study of living organisms and life processes',
    teacherId: 't3',
    color: 'bg-emerald-500',
    image: 'https://images.unsplash.com/photo-1559757175-08c6e1b2f6f9?auto=format&fit=crop&w=1200&q=60',
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    code: 'CHEM-101',
    description: 'Study of matter, its properties, and chemical reactions',
    teacherId: 't3',
    color: 'bg-orange-500',
    image: 'https://images.unsplash.com/photo-1581093588401-16ec8a2508d2?auto=format&fit=crop&w=1200&q=60',
  },
];

export const mockLessons: Lesson[] = [
  {
    id: 'l1',
    title: 'Introduction to Calculus',
    description: 'Understanding limits, derivatives, and basic integration techniques',
    subjectId: 'math',
    teacherId: 't1',
    content: `# Introduction to Calculus

## Learning Objectives
- Understand the concept of limits
- Learn about derivatives and their applications
- Introduction to integration

## Key Concepts
Calculus is the mathematical study of continuous change. It has two major branches:
- **Differential Calculus**: Concerned with rates of change and slopes of curves
- **Integral Calculus**: Concerned with accumulation of quantities and areas under curves

## Homework
Complete exercises 1-10 from Chapter 1 of your textbook.`,
    videoUrl: 'https://www.youtube.com/watch?v=WUvTyaaNkzM',
    attachments: ['calculus_notes.pdf', 'practice_problems.pdf'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'l2',
    title: "Newton's Laws of Motion",
    description: 'Exploring the three fundamental laws that govern the motion of objects',
    subjectId: 'physics',
    teacherId: 't1',
    content: `# Newton's Laws of Motion

## The Three Laws

### First Law (Law of Inertia)
An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.

### Second Law (F = ma)
The acceleration of an object depends on the net force acting upon it and the mass of the object.

### Third Law
For every action, there is an equal and opposite reaction.

## Applications
These laws apply to everything from cars on the road to planets in space!`,
    attachments: ['physics_diagrams.pdf'],
    createdAt: '2024-01-16T14:00:00Z',
    updatedAt: '2024-01-16T14:00:00Z',
  },
  {
    id: 'l3',
    title: 'Essay Writing Techniques',
    description: 'Learn how to structure and write compelling essays',
    subjectId: 'english',
    teacherId: 't2',
    content: `# Essay Writing Techniques

## Essay Structure
1. **Introduction**: Hook, background, thesis statement
2. **Body Paragraphs**: Topic sentence, evidence, analysis, transition
3. **Conclusion**: Restate thesis, summarize key points, final thought

## Tips for Success
- Always plan before writing
- Use clear topic sentences
- Support arguments with evidence
- Proofread your work

## Assignment
Write a 500-word essay on "The Importance of Education in Modern Zimbabwe"`,
    createdAt: '2024-01-17T09:00:00Z',
    updatedAt: '2024-01-17T09:00:00Z',
  },
  {
    id: 'l4',
    title: 'Cell Structure and Function',
    description: 'Detailed study of plant and animal cells',
    subjectId: 'biology',
    teacherId: 't3',
    content: `# Cell Structure and Function

## What is a Cell?
The cell is the basic unit of life. All living organisms are made of cells.

## Types of Cells
- **Prokaryotic**: No nucleus (bacteria)
- **Eukaryotic**: Has nucleus (plants, animals)

## Key Organelles
- Nucleus: Control center
- Mitochondria: Powerhouse
- Chloroplasts: Photosynthesis (plants only)
- Cell membrane: Controls what enters/exits

## Lab Activity
Next week we'll be observing cells under the microscope!`,
    videoUrl: 'https://www.youtube.com/watch?v=URUJD5NEXC8',
    attachments: ['cell_diagram.pdf'],
    createdAt: '2024-01-18T11:00:00Z',
    updatedAt: '2024-01-18T11:00:00Z',
  },
];

// Helper functions
export const getSubjectById = (id: string) => 
  mockSubjects.find(subject => subject.id === id);

export const getLessonsBySubject = (subjectId: string) => 
  mockLessons.filter(lesson => lesson.subjectId === subjectId);

export const getLessonById = (id: string) => 
  mockLessons.filter(lesson => lesson.id === id);

export const getTeacherById = (id: string) => 
  mockTeachers.find(teacher => teacher.id === id);
