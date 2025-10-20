import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, GraduationCap, UserCircle, Users, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [loginData, setLoginData] = useState({ email: '', password: '', idNumber: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [userRole, setUserRole] = useState<'teacher' | 'learner' | 'parent' | 'admin'>('learner');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && profile) {
      const dashboardRoutes: Record<string, string> = {
        admin: '/admin/dashboard',
        teacher: '/teacher/dashboard',
        learner: '/learner/dashboard',
        parent: '/parent/dashboard'
      };
      navigate(dashboardRoutes[profile.role] || '/login');
    }
  }, [user, profile, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (userRole === 'admin') {
        if (!loginData.idNumber) {
          toast.error('ID number is required for admin login');
          setLoading(false);
          return;
        }

        const { data: adminProfile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id_number', loginData.idNumber)
          .eq('role', 'admin')
          .maybeSingle();

        if (profileError || !adminProfile) {
          toast.error('Invalid admin credentials');
          setLoading(false);
          return;
        }

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: adminProfile.email,
          password: loginData.password
        });

        if (signInError) throw signInError;

        toast.success('Welcome back, Admin!');
        navigate('/admin/dashboard');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: loginData.email,
          password: loginData.password
        });

        if (error) throw error;

        toast.success(`Welcome back!`);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (userRole === 'admin') {
        toast.error('Admin accounts must be created by existing administrators');
        setLoading(false);
        return;
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            full_name: signupData.name,
            role: userRole
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email: signupData.email,
            full_name: signupData.name,
            role: userRole
          });

        if (profileError) throw profileError;

        toast.success(`Account created! Welcome, ${signupData.name}!`);
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

              <button
                onClick={() => setUserRole('parent')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  userRole === 'parent'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Users className={`w-8 h-8 mx-auto mb-2 ${userRole === 'parent' ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className={`font-medium ${userRole === 'parent' ? 'text-primary' : 'text-foreground'}`}>
                  Parent
                </div>
              </button>

              <button
                onClick={() => setUserRole('admin')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  userRole === 'admin'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <ShieldCheck className={`w-8 h-8 mx-auto mb-2 ${userRole === 'admin' ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className={`font-medium ${userRole === 'admin' ? 'text-primary' : 'text-foreground'}`}>
                  Admin
                </div>
              </button>
            </div>
          </div>

          <Card className="shadow-strong">
            <CardHeader className="text-center">
              {/* <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-primary-foreground" />
              </div> */}
              <CardTitle className="text-2xl">Welcome to We Learn</CardTitle>
              <CardDescription>
                {userRole === 'admin'
                  ? 'Admin access requires ID number authentication'
                  : userRole === 'teacher'
                  ? 'Access your teacher dashboard to manage lessons'
                  : userRole === 'parent'
                  ? 'Monitor your children\'s learning progress'
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
                    {userRole === 'admin' ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="login-id-number">ID Number</Label>
                          <Input
                            id="login-id-number"
                            type="text"
                            placeholder="Enter your ID number"
                            value={loginData.idNumber}
                            onChange={(e) => setLoginData({ ...loginData, idNumber: e.target.value })}
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
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="login-email">Email</Label>
                          <Input
                            id="login-email"
                            type="email"
                            placeholder={userRole === 'teacher' ? 'teacher@seke5.ac.zw' : userRole === 'parent' ? 'parent@seke5.ac.zw' : 'learner@student.seke5.ac.zw'}
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
                      </>
                    )}

                    <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
                      {loading ? 'Logging in...' : `Login as ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}`}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    {userRole === 'admin' ? (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">Admin accounts must be created by existing administrators. Please contact support.</p>
                      </div>
                    ) : (
                      <>
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
                            placeholder={userRole === 'teacher' ? 'teacher@seke5.ac.zw' : userRole === 'parent' ? 'parent@seke5.ac.zw' : 'learner@student.seke5.ac.zw'}
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

                        <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
                          {loading ? 'Creating account...' : `Create ${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Account`}
                        </Button>
                      </>
                    )}
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Login;
