import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, BookOpen, FileText, LogOut, Users } from 'lucide-react';
import { mockSubjects, mockLessons, getLessonsBySubject } from '@/data/mockData';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubjectCard from '@/components/SubjectCard';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userData);
    if (user.role !== 'teacher') {
      navigate('/learner/dashboard');
      return;
    }
    
    setCurrentUser(user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleCreateLesson = () => {
    toast.info('Lesson creation form coming soon!');
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header with CTA to schedule and banner image */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, {currentUser.name || 'Teacher'}!
              </h1>
              <p className="text-muted-foreground">Manage your subjects and lessons</p>
            </div>
            <div className="hidden md:block w-full md:w-60">
              <img src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=800&q=60" alt="Teaching" className="w-full rounded-lg border shadow-card object-cover" />
            </div>
            
            <div className="flex gap-3">
              <Button onClick={() => navigate('/lessons/schedule')} className="gradient-primary text-primary-foreground gap-2">
                <Plus className="w-4 h-4" />
                Schedule Lesson
              </Button>
              <Button onClick={handleLogout} variant="outline" className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Subjects
              </CardTitle>
              <BookOpen className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockSubjects.length}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Lessons
              </CardTitle>
              <FileText className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockLessons.length}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Learners
              </CardTitle>
              <Users className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">125</div>
            </CardContent>
          </Card>
        </div>

        {/* My Subjects */}
        <div className="mb-8">
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

        {/* Recent Lessons */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Lessons</h2>
          <div className="space-y-4">
            {mockLessons.slice(0, 3).map((lesson) => {
              const subject = mockSubjects.find(s => s.id === lesson.subjectId);
              return (
                <Card key={lesson.id} className="shadow-card hover:shadow-card-hover transition-shadow border">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{lesson.title}</CardTitle>
                        <CardDescription>
                          {subject?.name} • {lesson.description}
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeacherDashboard;
