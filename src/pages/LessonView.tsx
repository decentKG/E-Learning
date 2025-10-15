import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Video, Paperclip, Save, StickyNote } from 'lucide-react';
import { mockLessons, mockSubjects, getSubjectById } from '@/data/mockData';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

const LessonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  const lesson = mockLessons.find(l => l.id === id);
  const subject = lesson ? getSubjectById(lesson.subjectId) : null;

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }

    // Load saved notes from localStorage
    const savedNotes = localStorage.getItem(`notes_${id}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [id]);

  const handleSaveNotes = () => {
    localStorage.setItem(`notes_${id}`, notes);
    toast.success('Notes saved successfully!');
  };

  if (!lesson || !subject) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Banner Image */}
        <div className="mb-6">
          <img src="https://images.unsplash.com/photo-1523246191871-450c7ee08d34?auto=format&fit=crop&w=1400&q=60" alt="Lesson banner" className="w-full max-h-64 object-cover rounded-lg border shadow-card" />
        </div>
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lesson Header */}
            <Card className="shadow-card border animate-fade-in">
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={`${subject.color} text-white`}>
                    {subject.name}
                  </Badge>
                  {lesson.videoUrl && (
                    <Badge variant="secondary" className="gap-1">
                      <Video className="w-3 h-3" />
                      Video Available
                    </Badge>
                  )}
                  {lesson.attachments && lesson.attachments.length > 0 && (
                    <Badge variant="secondary" className="gap-1">
                      <Paperclip className="w-3 h-3" />
                      {lesson.attachments.length} Attachments
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-3xl">{lesson.title}</CardTitle>
                <p className="text-muted-foreground">{lesson.description}</p>
                <p className="text-sm text-muted-foreground">
                  Posted on {format(new Date(lesson.createdAt), 'MMMM dd, yyyy')}
                </p>
              </CardHeader>
            </Card>

            {/* Video Player */}
            {lesson.videoUrl && (
              <Card className="shadow-card border animate-fade-in">
                <CardContent className="p-0">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={lesson.videoUrl.replace('watch?v=', 'embed/')}
                      title={lesson.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lesson Content */}
            <Card className="shadow-card border animate-fade-in">
              <CardHeader>
                <CardTitle>Lesson Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-foreground">
                    {lesson.content}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Attachments */}
            {lesson.attachments && lesson.attachments.length > 0 && (
              <Card className="shadow-card border animate-fade-in">
                <CardHeader>
                  <CardTitle>Attachments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {lesson.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                      >
                        <Paperclip className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{attachment}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Notes */}
          {currentUser?.role === 'learner' && (
            <div className="lg:col-span-1">
              <Card className="shadow-card border sticky top-20 animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <StickyNote className="w-5 h-5 text-primary" />
                    My Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Take notes here... Your notes are saved automatically to your browser."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[300px] resize-none"
                  />
                  <Button onClick={handleSaveNotes} className="w-full gap-2">
                    <Save className="w-4 h-4" />
                    Save Notes
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Notes are saved locally in your browser
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LessonView;
