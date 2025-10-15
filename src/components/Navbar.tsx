import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, LogOut, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card shadow-nav">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-primary hidden sm:inline">We Learn</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="What do you want to learn?" 
                className="pl-10 bg-muted/50 border-none focus-visible:ring-1"
              />
            </div>
          </div>

          {/* Navigation Links & Auth */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors hidden lg:inline">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors hidden lg:inline">
              About
            </Link>
            <Link to="/lessons/upcoming" className="text-sm font-medium hover:text-primary transition-colors hidden lg:inline">
              Upcoming
            </Link>
            <Link to="/lessons/schedule" className="text-sm font-medium hover:text-primary transition-colors hidden lg:inline">
              Schedule
            </Link>
            {currentUser && (
              <Link 
                to={currentUser.role === 'teacher' ? '/teacher/dashboard' : '/learner/dashboard'} 
                className="text-sm font-medium hover:text-primary transition-colors hidden lg:inline"
              >
                Dashboard
              </Link>
            )}
            
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium hidden md:inline">
                  {currentUser.name}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/login')}
                  className="hidden sm:inline-flex"
                >
                  Log In
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => navigate('/login')}
                >
                  Join for Free
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
