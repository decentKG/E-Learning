import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="font-bold text-base mb-3">We Learn</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Empowering students and teachers with modern online learning tools.
              Access quality education anytime, anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Contact</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We Learn<br />
              info@welearn.co
            </p>
          </div>
        </div>

        <div className="pt-6 border-t">
          <p className="text-xs text-muted-foreground text-center">
            © 2025 We Learn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
