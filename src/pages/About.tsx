import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { School, Target, Eye, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-hero text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <School className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About We Learn</h1>
              <p className="text-xl text-primary-foreground/90">
                Building a brighter future through quality education in Zimbabwe
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-card p-8 rounded-xl shadow-soft">
                <div className="w-14 h-14 gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-7 h-7 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To provide accessible, quality education that empowers every learner at We Learn 
                  to reach their full potential through innovative digital learning tools and dedicated teaching.
                </p>
              </div>

              <div className="bg-card p-8 rounded-xl shadow-soft">
                <div className="w-14 h-14 gradient-gold rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-7 h-7 text-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To be a leading educational institution in Zimbabwe, recognized for excellence in teaching, 
                  innovation in digital learning, and producing well-rounded graduates who contribute meaningfully to society.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About the Platform */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">About Our Learning Platform</h2>
              
              <div className="bg-card p-8 rounded-xl shadow-soft space-y-6">
                <p className="text-lg leading-relaxed">
                  The We Learn Online Learning Platform is designed to bridge the gap between 
                  traditional classroom learning and modern digital education. Built with Zimbabwean learners 
                  in mind, our platform makes quality education accessible to all.
                </p>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold">What We Offer:</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                      </div>
                      <span><strong className="text-foreground">Interactive Lessons:</strong> Engaging content with videos, notes, and multimedia resources</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                      </div>
                      <span><strong className="text-foreground">Dedicated Teachers:</strong> Experienced educators creating and sharing quality content</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                      </div>
                      <span><strong className="text-foreground">Digital Note-Taking:</strong> Tools to help learners organize and retain information</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                      </div>
                      <span><strong className="text-foreground">Flexible Learning:</strong> Study at your own pace, anytime, anywhere</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: 'Excellence',
                  description: 'We strive for the highest standards in teaching and learning.',
                },
                {
                  title: 'Innovation',
                  description: 'We embrace technology to enhance educational outcomes.',
                },
                {
                  title: 'Inclusivity',
                  description: 'We ensure every learner has access to quality education.',
                },
                {
                  title: 'Integrity',
                  description: 'We maintain honesty and strong moral principles in all we do.',
                },
                {
                  title: 'Community',
                  description: 'We build strong connections between teachers, learners, and families.',
                },
                {
                  title: 'Growth',
                  description: 'We foster continuous learning and personal development.',
                },
              ].map((value, index) => (
                <div
                  key={value.title}
                  className="bg-card p-6 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-xl font-bold mb-2 text-primary">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Users className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl font-bold mb-4">Join Our Learning Community</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Be part of a vibrant community of learners and educators committed to academic excellence.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
