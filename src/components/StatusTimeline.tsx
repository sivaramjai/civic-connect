import { IssueStatus, STATUS_CONFIG } from '@/lib/types';
import { Check } from 'lucide-react';

interface StatusTimelineProps {
  currentStatus: IssueStatus;
  updates?: {
    status: IssueStatus;
    date: Date;
    message?: string;
  }[];
}

const statusOrder: IssueStatus[] = ['reported', 'acknowledged', 'in-progress', 'resolved'];

export function StatusTimeline({ currentStatus, updates = [] }: StatusTimelineProps) {
  const currentIndex = statusOrder.indexOf(currentStatus);

  return (
    <div className="space-y-4">
      {statusOrder.map((status, index) => {
        const config = STATUS_CONFIG[status];
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const update = updates.find(u => u.status === status);

        return (
          <div key={status} className="flex gap-4">
            {/* Timeline indicator */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                  isCompleted
                    ? 'bg-status-resolved border-status-resolved'
                    : isCurrent
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-background'
                }`}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <div
                    className={`h-2 w-2 rounded-full ${
                      isCurrent ? 'bg-primary animate-pulse-soft' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
              {index < statusOrder.length - 1 && (
                <div
                  className={`w-0.5 flex-1 min-h-[24px] ${
                    isCompleted ? 'bg-status-resolved' : 'bg-border'
                  }`}
                />
              )}
            </div>

            {/* Content */}
            <div className={`flex-1 pb-4 ${!isCurrent && !isCompleted ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-2">
                <span className={`font-medium ${isCurrent ? 'text-primary' : 'text-foreground'}`}>
                  {config.label}
                </span>
                {isCurrent && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    Current
                  </span>
                )}
              </div>
              {update?.message && (
                <p className="text-sm text-muted-foreground mt-1">
                  {update.message}
                </p>
              )}
              {update?.date && (
                <p className="text-xs text-muted-foreground mt-1">
                  {update.date.toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
