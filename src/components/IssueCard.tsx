import { Issue, STATUS_CONFIG, CATEGORY_CONFIG } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, ThumbsUp, MessageCircle, Clock, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { 
  Construction, 
  Trash2, 
  Droplets, 
  Lightbulb, 
  TrafficCone, 
  ShieldAlert 
} from 'lucide-react';

const categoryIcons = {
  pothole: Construction,
  garbage: Trash2,
  water: Droplets,
  streetlight: Lightbulb,
  traffic: TrafficCone,
  safety: ShieldAlert,
};

interface IssueCardProps {
  issue: Issue;
  onUpvote?: (id: string) => void;
}

export function IssueCard({ issue, onUpvote }: IssueCardProps) {
  const statusConfig = STATUS_CONFIG[issue.status];
  const categoryConfig = CATEGORY_CONFIG[issue.category];
  const CategoryIcon = categoryIcons[issue.category];

  return (
    <Card className="group overflow-hidden hover:shadow-card-hover transition-all duration-300 border-border/50">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full sm:w-48 h-40 sm:h-auto bg-muted flex-shrink-0">
          <img
            src={issue.images[0] || '/placeholder.svg'}
            alt={issue.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2">
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-${categoryConfig.color} text-primary-foreground`}
              style={{ backgroundColor: `hsl(var(--${categoryConfig.color}))` }}>
              <CategoryIcon className="h-3 w-3" />
              {categoryConfig.label}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {issue.title}
            </h3>
            <Badge className={`${statusConfig.className} status-badge flex-shrink-0`}>
              {statusConfig.label}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {issue.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{issue.location.address}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Clock className="h-3 w-3" />
            <span>Reported {formatDistanceToNow(issue.reportedAt, { addSuffix: true })}</span>
            <span>by {issue.reportedBy.name}</span>
          </div>

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className={`gap-1.5 ${issue.hasUpvoted ? 'text-primary' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  onUpvote?.(issue.id);
                }}
              >
                <ThumbsUp className={`h-4 w-4 ${issue.hasUpvoted ? 'fill-current' : ''}`} />
                <span className="font-medium">{issue.upvotes}</span>
              </Button>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                <span>{issue.commentsCount}</span>
              </div>
            </div>

            <Link to={`/issues/${issue.id}`}>
              <Button variant="ghost" size="sm" className="gap-1">
                View Details
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
