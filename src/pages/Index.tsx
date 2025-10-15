import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Video, FileText, GraduationCap, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Lessons',
      description: 'Access engaging lessons with videos, notes, and resources anytime, anywhere.',
    },
    {
      icon: Users,
      title: 'Teacher Support',
      description: 'Connect with dedicated teachers who guide your learning journey.',
    },
    {
      icon: FileText,
      title: 'Digital Note-Taking',
      description: 'Take and organize notes right in the platform for easy review.',
    },
    {
      icon: Video,
      title: 'Video Lessons',
      description: 'Watch educational videos to reinforce your understanding of topics.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section with image */}
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Start, switch, or advance your career
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Learn with quality courses from We Learn's expert teachers. Build skills for your future, right from home.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg" className="w-full sm:w-auto text-base px-6">
                    Join for Free
                  </Button>
                </Link>
                  <Link to="/lessons/upcoming">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-6">
                      See Upcoming Lessons
                    </Button>
                  </Link>
              </div>
              </div>
              <div className="order-1 md:order-2">
                <img src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=60" alt="Learning illustration" className="w-full rounded-lg border shadow-card object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Goals Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Launch a new career</h3>
                <p className="text-sm text-muted-foreground">Build skills in high-demand subjects</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Gain in-demand skills</h3>
                <p className="text-sm text-muted-foreground">Learn from expert teachers</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Earn a certificate</h3>
                <p className="text-sm text-muted-foreground">Complete courses and get certified</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with icons */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10">
              Explore our catalog
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-card border rounded-lg p-6 shadow-card hover:shadow-card-hover transition-all duration-200"
                >
                  <feature.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section with image */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto bg-card border rounded-lg shadow-card p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
              <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Take the next step toward your goals
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                Join We Learn's online learning platform and access quality education from anywhere.
              </p>
              <Link to="/login">
                <Button size="lg">
                  Join for Free
                </Button>
              </Link>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=60" alt="Students collaborating" className="w-full rounded-lg border shadow-card object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
