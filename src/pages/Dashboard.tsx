import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DashboardStats } from '@/components/DashboardStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockIssues } from '@/lib/mockData';
import { STATUS_CONFIG, CATEGORY_CONFIG } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ExternalLink,
  Filter,
  Download,
  Settings,
} from 'lucide-react';

const Dashboard = () => {
  const urgentIssues = mockIssues.filter(
    (i) => i.priority === 'critical' || i.priority === 'high'
  ).slice(0, 5);

  const recentIssues = [...mockIssues]
    .sort((a, b) => b.reportedAt.getTime() - a.reportedAt.getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <LayoutDashboard className="h-6 w-6 text-primary" />
                <h1 className="font-heading text-3xl font-bold text-foreground">
                  Dashboard
                </h1>
              </div>
              <p className="text-muted-foreground">
                Monitor and manage civic issues across the city.
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>

          {/* Stats */}
          <DashboardStats />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Urgent Issues */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-heading flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Urgent Issues
                </CardTitle>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {urgentIssues.map((issue) => (
                  <Link
                    key={issue.id}
                    to={`/issues/${issue.id}`}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                      issue.priority === 'critical' ? 'bg-destructive' : 'bg-priority-high'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground line-clamp-1">
                        {issue.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`${STATUS_CONFIG[issue.status].className} status-badge text-xs`}>
                          {STATUS_CONFIG[issue.status].label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {issue.location.address}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(issue.reportedAt, { addSuffix: true })}
                    </span>
                  </Link>
                ))}
                <Button variant="ghost" className="w-full gap-2">
                  View All Urgent Issues
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Recent Issues */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-heading flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  Recently Reported
                </CardTitle>
                <Link to="/issues">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentIssues.map((issue) => (
                  <Link
                    key={issue.id}
                    to={`/issues/${issue.id}`}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className="mt-1 h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `hsl(var(--${CATEGORY_CONFIG[issue.category].color}) / 0.15)` }}
                    >
                      <span 
                        className="text-xs font-bold"
                        style={{ color: `hsl(var(--${CATEGORY_CONFIG[issue.category].color}))` }}
                      >
                        {CATEGORY_CONFIG[issue.category].label.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground line-clamp-1">
                        {issue.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {issue.reportedBy.name} • {issue.upvotes} upvotes
                      </p>
                    </div>
                    <Badge className={`${STATUS_CONFIG[issue.status].className} status-badge text-xs`}>
                      {STATUS_CONFIG[issue.status].label}
                    </Badge>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Department Performance */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-status-resolved" />
                Department Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Public Works', resolved: 145, pending: 23, avgTime: '3.2 days' },
                  { name: 'Sanitation', resolved: 98, pending: 15, avgTime: '2.8 days' },
                  { name: 'Traffic Management', resolved: 67, pending: 31, avgTime: '5.1 days' },
                ].map((dept) => (
                  <div key={dept.name} className="p-4 rounded-lg border border-border">
                    <h4 className="font-medium text-foreground mb-3">{dept.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Resolved</span>
                        <span className="font-medium text-status-resolved">{dept.resolved}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pending</span>
                        <span className="font-medium text-status-in-progress">{dept.pending}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg. Resolution</span>
                        <span className="font-medium">{dept.avgTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
