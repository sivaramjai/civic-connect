import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StatusTimeline } from '@/components/StatusTimeline';
import { mockIssues, mockComments } from '@/lib/mockData';
import { STATUS_CONFIG, CATEGORY_CONFIG } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  ThumbsUp,
  MessageCircle,
  Share2,
  Flag,
  Clock,
  User,
  Building2,
  CheckCircle2,
  Construction,
  Trash2,
  Droplets,
  Lightbulb,
  TrafficCone,
  ShieldAlert,
  Send,
} from 'lucide-react';

const categoryIcons = {
  pothole: Construction,
  garbage: Trash2,
  water: Droplets,
  streetlight: Lightbulb,
  traffic: TrafficCone,
  safety: ShieldAlert,
};

const IssueDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = useState('');
  const [hasUpvoted, setHasUpvoted] = useState(false);
  
  const issue = mockIssues.find((i) => i.id === id);
  const comments = mockComments.filter((c) => c.issueId === id);

  if (!issue) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Issue Not Found</h1>
            <p className="text-muted-foreground mb-4">The issue you're looking for doesn't exist.</p>
            <Link to="/issues">
              <Button>Back to Issues</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const statusConfig = STATUS_CONFIG[issue.status];
  const categoryConfig = CATEGORY_CONFIG[issue.category];
  const CategoryIcon = categoryIcons[issue.category];

  const statusUpdates = [
    { status: 'reported' as const, date: issue.reportedAt, message: 'Issue reported by citizen' },
    ...(issue.status !== 'reported' ? [{ status: 'acknowledged' as const, date: new Date(issue.reportedAt.getTime() + 86400000), message: 'Issue assigned to department' }] : []),
    ...(issue.status === 'in-progress' || issue.status === 'resolved' ? [{ status: 'in-progress' as const, date: new Date(issue.reportedAt.getTime() + 172800000), message: 'Work crew dispatched' }] : []),
    ...(issue.status === 'resolved' ? [{ status: 'resolved' as const, date: issue.resolvedAt!, message: 'Issue resolved successfully' }] : []),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Back Button */}
          <Link to="/issues" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Issues
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <Card>
                <CardContent className="p-6">
                  {/* Category & Status */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{ 
                        backgroundColor: `hsl(var(--${categoryConfig.color}) / 0.15)`,
                        color: `hsl(var(--${categoryConfig.color}))`
                      }}
                    >
                      <CategoryIcon className="h-4 w-4" />
                      {categoryConfig.label}
                    </div>
                    <Badge className={`${statusConfig.className} status-badge`}>
                      {statusConfig.label}
                    </Badge>
                    {issue.priority === 'critical' && (
                      <Badge className="priority-critical status-badge">
                        Critical Priority
                      </Badge>
                    )}
                  </div>

                  <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {issue.title}
                  </h1>

                  <p className="text-muted-foreground mb-6">
                    {issue.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {issue.location.address}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {formatDistanceToNow(issue.reportedAt, { addSuffix: true })}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="h-4 w-4" />
                      {issue.reportedBy.name}
                    </div>
                    {issue.assignedDepartment && (
                      <div className="flex items-center gap-1.5">
                        <Building2 className="h-4 w-4" />
                        {issue.assignedDepartment}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                    <Button
                      variant={hasUpvoted ? 'default' : 'outline'}
                      onClick={() => setHasUpvoted(!hasUpvoted)}
                      className="gap-2"
                    >
                      <ThumbsUp className={`h-4 w-4 ${hasUpvoted ? 'fill-current' : ''}`} />
                      Upvote ({issue.upvotes + (hasUpvoted ? 1 : 0)})
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="ghost" className="gap-2 text-muted-foreground">
                      <Flag className="h-4 w-4" />
                      Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Images */}
              {issue.images.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Photos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {issue.images.map((img, index) => (
                        <div key={index} className="aspect-video rounded-lg overflow-hidden bg-muted">
                          <img
                            src={img}
                            alt={`Issue photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Comments */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Comments ({comments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Comment Input */}
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Textarea
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                      />
                      <Button size="sm" disabled={!comment.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4 pt-4 border-t border-border">
                    {comments.map((c) => (
                      <div key={c.id} className="flex gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {c.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">{c.author.name}</span>
                            {c.author.isOfficial && (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Official
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(c.createdAt, { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{c.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Status Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <StatusTimeline currentStatus={issue.status} updates={statusUpdates} />
                </CardContent>
              </Card>

              {/* Location Map */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 rounded-lg bg-muted flex items-center justify-center mb-3">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Map view</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{issue.location.address}</p>
                </CardContent>
              </Card>

              {/* Similar Issues */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Similar Issues</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockIssues
                    .filter((i) => i.id !== issue.id && i.category === issue.category)
                    .slice(0, 3)
                    .map((i) => (
                      <Link 
                        key={i.id} 
                        to={`/issues/${i.id}`}
                        className="block p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                      >
                        <p className="font-medium text-sm text-foreground line-clamp-1">{i.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {i.upvotes} upvotes • {i.commentsCount} comments
                        </p>
                      </Link>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IssueDetail;
