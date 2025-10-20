import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { LogOut, GraduationCap, BookOpen, Calendar, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

interface LinkedLearner {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

interface LearnerProgress {
  learnerId: string;
  completedLessons: number;
  totalLessons: number;
  upcomingLessons: number;
  averageScore: number;
}

const ParentDashboard = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [linkedLearners, setLinkedLearners] = useState<LinkedLearner[]>([]);
  const [selectedLearner, setSelectedLearner] = useState<LinkedLearner | null>(null);
  const [learnerProgress, setLearnerProgress] = useState<LearnerProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinkedLearners();
  }, []);

  useEffect(() => {
    if (selectedLearner) {
      fetchLearnerProgress(selectedLearner.id);
    }
  }, [selectedLearner]);

  const fetchLinkedLearners = async () => {
    try {
      const { data, error } = await supabase
        .from('parent_learner_links')
        .select(`
          learner_id,
          profiles!parent_learner_links_learner_id_fkey (
            id,
            email,
            full_name,
            role
          )
        `)
        .eq('parent_id', profile?.id);

      if (error) throw error;

      const learners = data?.map((link: any) => link.profiles).filter(Boolean) || [];
      setLinkedLearners(learners);

      if (learners.length > 0) {
        setSelectedLearner(learners[0]);
      }
    } catch (error) {
      console.error('Error fetching linked learners:', error);
      toast.error('Failed to load learner information');
    } finally {
      setLoading(false);
    }
  };

  const fetchLearnerProgress = async (learnerId: string) => {
    setLearnerProgress({
      learnerId,
      completedLessons: 12,
      totalLessons: 20,
      upcomingLessons: 3,
      averageScore: 85
    });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const progressPercentage = learnerProgress
    ? (learnerProgress.completedLessons / learnerProgress.totalLessons) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Parent Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {profile?.full_name}</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : linkedLearners.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <GraduationCap className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Linked Learners</h3>
              <p className="text-muted-foreground">
                You don't have any learners linked to your account yet. Please contact an administrator.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">My Children</h2>
              <div className="flex gap-3">
                {linkedLearners.map((learner) => (
                  <Button
                    key={learner.id}
                    variant={selectedLearner?.id === learner.id ? 'default' : 'outline'}
                    onClick={() => setSelectedLearner(learner)}
                  >
                    <GraduationCap className="w-4 h-4 mr-2" />
                    {learner.full_name}
                  </Button>
                ))}
              </div>
            </div>

            {selectedLearner && learnerProgress && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Progress</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
                      <Progress value={progressPercentage} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Completed</CardTitle>
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {learnerProgress.completedLessons}/{learnerProgress.totalLessons}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Lessons</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{learnerProgress.upcomingLessons}</div>
                      <p className="text-xs text-muted-foreground mt-1">Lessons</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{learnerProgress.averageScore}%</div>
                      <p className="text-xs text-muted-foreground mt-1">Overall</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Latest lessons completed by {selectedLearner.full_name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { title: 'Introduction to Algebra', date: '2 days ago', score: 92 },
                          { title: 'English Literature - Act 1', date: '4 days ago', score: 88 },
                          { title: 'Biology: Cell Structure', date: '1 week ago', score: 95 }
                        ].map((lesson, index) => (
                          <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                            <div>
                              <p className="font-medium">{lesson.title}</p>
                              <p className="text-sm text-muted-foreground">{lesson.date}</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                              {lesson.score}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Lessons</CardTitle>
                      <CardDescription>Scheduled lessons for {selectedLearner.full_name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { title: 'Geometry Basics', date: 'Tomorrow at 10:00 AM', subject: 'Mathematics' },
                          { title: 'World War II History', date: 'Dec 24 at 2:00 PM', subject: 'History' },
                          { title: 'Chemical Reactions', date: 'Dec 26 at 11:00 AM', subject: 'Chemistry' }
                        ].map((lesson, index) => (
                          <div key={index} className="flex items-start gap-3 py-3 border-b last:border-0">
                            <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="font-medium">{lesson.title}</p>
                              <p className="text-sm text-muted-foreground">{lesson.date}</p>
                              <Badge variant="outline" className="mt-1">{lesson.subject}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;
