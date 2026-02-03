import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { mockIssues, dashboardStats } from '@/lib/mockData';
import { IssueCard } from '@/components/IssueCard';
import heroImage from '@/assets/hero-city.jpg';
import {
  MapPin,
  Camera,
  Bell,
  TrendingUp,
  Shield,
  Users,
  CheckCircle2,
  ArrowRight,
  Construction,
  Trash2,
  Droplets,
  Lightbulb,
  TrafficCone,
  ShieldAlert,
  Globe,
  Smartphone,
  BarChart3,
} from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'Easy Reporting',
    description: 'Submit issues with photos, GPS location, and detailed descriptions in seconds.',
  },
  {
    icon: Bell,
    title: 'Real-time Updates',
    description: 'Track your reports from submission to resolution with instant notifications.',
  },
  {
    icon: Users,
    title: 'Community Power',
    description: 'Upvote and comment on issues to help prioritize what matters most.',
  },
  {
    icon: BarChart3,
    title: 'Smart Analytics',
    description: 'AI-powered classification and duplicate detection for efficient routing.',
  },
  {
    icon: Shield,
    title: 'Transparency',
    description: 'Public issue history and resolution proof ensure accountability.',
  },
  {
    icon: Globe,
    title: 'Accessibility',
    description: 'Multilingual support and low-bandwidth optimization for everyone.',
  },
];

const categories = [
  { icon: Construction, label: 'Potholes', color: 'category-pothole', count: 312 },
  { icon: Trash2, label: 'Garbage', color: 'category-garbage', count: 289 },
  { icon: Droplets, label: 'Water', color: 'category-water', count: 156 },
  { icon: Lightbulb, label: 'Lights', color: 'category-streetlight', count: 198 },
  { icon: TrafficCone, label: 'Traffic', color: 'category-traffic', count: 167 },
  { icon: ShieldAlert, label: 'Safety', color: 'category-safety', count: 125 },
];

const sdgGoals = [
  { number: 11, title: 'Sustainable Cities', description: 'Building inclusive, safe, resilient cities' },
  { number: 16, title: 'Good Governance', description: 'Promoting accountable institutions' },
  { number: 17, title: 'Partnerships', description: 'Strengthening citizen-government collaboration' },
];

const Index = () => {
  const recentIssues = mockIssues.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Sustainable city"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/50" />
          </div>
          
          <div className="relative container py-20 md:py-32">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 backdrop-blur-sm border border-secondary/30 text-secondary mb-6 animate-fade-in">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">Empowering Communities</span>
              </div>
              
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Report. Track.{' '}
                <span className="text-gradient bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Transform
                </span>{' '}
                Your City
              </h1>
              
              <p className="text-lg md:text-xl text-background/80 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                CivicPulse connects citizens and government for faster, transparent resolution of civic issues. 
                Together, we build sustainable, responsive communities.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <Link to="/report">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    Report an Issue
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/issues">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto bg-background/10 border-background/30 text-background hover:bg-background/20">
                    Browse Issues
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="text-center">
                  <p className="text-3xl font-heading font-bold text-background">{dashboardStats.totalIssues.toLocaleString()}</p>
                  <p className="text-sm text-background/70">Issues Reported</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-heading font-bold text-secondary">{dashboardStats.resolvedThisMonth}</p>
                  <p className="text-sm text-background/70">Resolved This Month</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-heading font-bold text-accent">{dashboardStats.citizenSatisfaction}%</p>
                  <p className="text-sm text-background/70">Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-3">What Can You Report?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From potholes to public safety, report any civic issue affecting your neighborhood.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link 
                    key={cat.label} 
                    to={`/issues?category=${cat.label.toLowerCase()}`}
                    className="group"
                  >
                    <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                      <div
                        className="mx-auto h-14 w-14 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `hsl(var(--${cat.color}) / 0.15)` }}
                      >
                        <Icon 
                          className="h-7 w-7" 
                          style={{ color: `hsl(var(--${cat.color}))` }}
                        />
                      </div>
                      <h3 className="font-medium text-foreground mb-1">{cat.label}</h3>
                      <p className="text-sm text-muted-foreground">{cat.count} issues</p>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-3">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Simple, transparent, and effective civic engagement in four easy steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: 1, title: 'Report', desc: 'Submit your issue with photos and location', icon: Smartphone },
                { step: 2, title: 'Verify', desc: 'AI classifies and routes to the right department', icon: TrendingUp },
                { step: 3, title: 'Track', desc: 'Monitor progress with real-time status updates', icon: Bell },
                { step: 4, title: 'Resolve', desc: 'Get notified when the issue is fixed', icon: CheckCircle2 },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="relative">
                    <Card className="p-6 text-center h-full">
                      <div className="h-16 w-16 rounded-full hero-gradient flex items-center justify-center mx-auto mb-4 text-primary-foreground">
                        <Icon className="h-8 w-8" />
                      </div>
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-7 w-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                        {item.step}
                      </div>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </Card>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Recent Issues */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-2">Recent Issues</h2>
                <p className="text-muted-foreground">See what's being reported in your community</p>
              </div>
              <Link to="/issues">
                <Button variant="outline">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-4">
              {recentIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Platform Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need for effective civic engagement and issue resolution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* SDG Alignment */}
        <section className="py-16 hero-gradient text-primary-foreground">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold mb-3">Aligned with UN SDGs</h2>
              <p className="opacity-80 max-w-2xl mx-auto">
                CivicPulse contributes to global sustainable development goals by fostering transparent governance and community participation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sdgGoals.map((goal) => (
                <Card key={goal.number} className="bg-background/10 border-background/20 backdrop-blur-sm p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-background/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-heading font-bold">{goal.number}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{goal.title}</h3>
                  <p className="text-sm opacity-80">{goal.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container">
            <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-card to-muted border-border/50">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Improve Your Community?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Join thousands of citizens making their neighborhoods better, one report at a time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/report">
                  <Button variant="hero" size="xl">
                    Report Your First Issue
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="xl">
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
