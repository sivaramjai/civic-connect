export type IssueCategory = 
  | 'pothole'
  | 'garbage'
  | 'water'
  | 'streetlight'
  | 'traffic'
  | 'safety';

export type IssueStatus = 
  | 'reported'
  | 'acknowledged'
  | 'in-progress'
  | 'resolved';

export type IssuePriority = 
  | 'low'
  | 'medium'
  | 'high'
  | 'critical';

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  priority: IssuePriority;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  images: string[];
  reportedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  reportedAt: Date;
  updatedAt: Date;
  upvotes: number;
  hasUpvoted?: boolean;
  commentsCount: number;
  assignedDepartment?: string;
  resolvedAt?: Date;
  resolutionProof?: string[];
}

export interface Comment {
  id: string;
  issueId: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    isOfficial?: boolean;
  };
  content: string;
  createdAt: Date;
}

export interface StatusUpdate {
  id: string;
  issueId: string;
  status: IssueStatus;
  message: string;
  updatedBy: string;
  updatedAt: Date;
}

export const CATEGORY_CONFIG: Record<IssueCategory, {
  label: string;
  icon: string;
  color: string;
}> = {
  pothole: { label: 'Pothole', icon: 'construction', color: 'category-pothole' },
  garbage: { label: 'Garbage', icon: 'trash-2', color: 'category-garbage' },
  water: { label: 'Water Leakage', icon: 'droplets', color: 'category-water' },
  streetlight: { label: 'Streetlight', icon: 'lightbulb', color: 'category-streetlight' },
  traffic: { label: 'Traffic', icon: 'traffic-cone', color: 'category-traffic' },
  safety: { label: 'Public Safety', icon: 'shield-alert', color: 'category-safety' },
};

export const STATUS_CONFIG: Record<IssueStatus, {
  label: string;
  className: string;
}> = {
  reported: { label: 'Reported', className: 'status-reported' },
  acknowledged: { label: 'Acknowledged', className: 'status-acknowledged' },
  'in-progress': { label: 'In Progress', className: 'status-in-progress' },
  resolved: { label: 'Resolved', className: 'status-resolved' },
};

export const PRIORITY_CONFIG: Record<IssuePriority, {
  label: string;
  className: string;
}> = {
  low: { label: 'Low', className: 'priority-low' },
  medium: { label: 'Medium', className: 'priority-medium' },
  high: { label: 'High', className: 'priority-high' },
  critical: { label: 'Critical', className: 'priority-critical' },
};
