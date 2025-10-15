import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getSubjectById, getLessonsBySubject } from '@/data/mockData';

const Subject = () => {
  const { id } = useParams();
  const subject = id ? getSubjectById(id) : undefined;
  const lessons = id ? getLessonsBySubject(id) : [];

  if (!subject) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Subject not found</h1>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{subject.name}</h1>
            <p className="text-muted-foreground">{subject.description}</p>
          </div>
          <div className="rounded-lg overflow-hidden border shadow-card">
            <div className="aspect-video relative bg-muted">
              {subject.image && (
                <img src={subject.image} alt={subject.name} className="absolute inset-0 w-full h-full object-cover" />
              )}
              <div className={`absolute inset-0 ${subject.color} opacity-20`} />
            </div>
          </div>
        </div>

        {/* Lessons */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Lessons</h2>
          {lessons.length === 0 ? (
            <p className="text-muted-foreground">No lessons yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lessons.map(lesson => (
                <Link key={lesson.id} to={`/lesson/${lesson.id}`}>
                  <Card className="shadow-card hover:shadow-card-hover transition-all border">
                    <CardHeader>
                      <CardTitle>{lesson.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{lesson.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Subject;


