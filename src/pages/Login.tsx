import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, GraduationCap, UserCircle } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [userRole, setUserRole] = useState<'teacher' | 'learner'>('learner');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login - store user data in localStorage
    const userData = {
      email: loginData.email,
      role: userRole,
      name: loginData.email.split('@')[0],
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    toast.success(`Welcome back! Logging in as ${userRole}...`);
    
    setTimeout(() => {
      navigate(userRole === 'teacher' ? '/teacher/dashboard' : '/learner/dashboard');
    }, 1000);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate signup - store user data in localStorage
    const userData = {
      name: signupData.name,
      email: signupData.email,
      role: userRole,
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    toast.success(`Account created! Welcome, ${signupData.name}!`);
    
    setTimeout(() => {
      navigate(userRole === 'teacher' ? '/teacher/dashboard' : '/learner/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md animate-fade-in">
          {/* Role Selection */}
          <div className="mb-6">
            <Label className="text-base mb-3 block">I am a:</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setUserRole('learner')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  userRole === 'learner'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <GraduationCap className={`w-8 h-8 mx-auto mb-2 ${userRole === 'learner' ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className={`font-medium ${userRole === 'learner' ? 'text-primary' : 'text-foreground'}`}>
                  Learner
                </div>
              </button>
              
              <button
                onClick={() => setUserRole('teacher')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  userRole === 'teacher'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <UserCircle className={`w-8 h-8 mx-auto mb-2 ${userRole === 'teacher' ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className={`font-medium ${userRole === 'teacher' ? 'text-primary' : 'text-foreground'}`}>
                  Teacher
                </div>
              </button>
            </div>
          </div>

          <Card className="shadow-strong">
            <CardHeader className="text-center">
              <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Welcome to We Learn</CardTitle>
              <CardDescription>
                {userRole === 'teacher' 
                  ? 'Access your teacher dashboard to manage lessons'
                  : 'Access your learner dashboard to view lessons'}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="login">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder={userRole === 'teacher' ? 'teacher@seke5.ac.zw' : 'learner@student.seke5.ac.zw'}
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full gradient-primary text-primary-foreground">
                      Login as {userRole === 'teacher' ? 'Teacher' : 'Learner'}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder={userRole === 'teacher' ? 'teacher@seke5.ac.zw' : 'learner@student.seke5.ac.zw'}
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full gradient-primary text-primary-foreground">
                      Create {userRole === 'teacher' ? 'Teacher' : 'Learner'} Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
