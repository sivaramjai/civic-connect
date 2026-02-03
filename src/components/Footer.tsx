import { Link } from 'react-router-dom';
import { MapPin, Twitter, Facebook, Instagram, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg hero-gradient">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-xl">CivicPulse</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Empowering citizens to build better communities through transparent civic engagement.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/report" className="hover:text-background transition-colors">Report an Issue</Link></li>
              <li><Link to="/issues" className="hover:text-background transition-colors">Browse Issues</Link></li>
              <li><Link to="/dashboard" className="hover:text-background transition-colors">Dashboard</Link></li>
              <li><a href="#" className="hover:text-background transition-colors">Track My Reports</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-background transition-colors">Potholes & Roads</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Garbage & Sanitation</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Water & Utilities</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Street Lighting</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Traffic & Transport</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Public Safety</a></li>
            </ul>
          </div>

          {/* SDG Alignment */}
          <div>
            <h4 className="font-heading font-semibold mb-4">SDG Alignment</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-secondary/80 flex items-center justify-center text-xs font-bold">11</span>
                Sustainable Cities
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-primary/80 flex items-center justify-center text-xs font-bold">16</span>
                Good Governance
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-accent/80 flex items-center justify-center text-xs font-bold text-accent-foreground">17</span>
                Partnerships
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} CivicPulse. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-background transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
