import { CATEGORY_CONFIG, IssueCategory } from '@/lib/types';
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

interface CategorySelectorProps {
  selected?: IssueCategory;
  onSelect: (category: IssueCategory) => void;
}

export function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  const categories = Object.entries(CATEGORY_CONFIG) as [IssueCategory, typeof CATEGORY_CONFIG[IssueCategory]][];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {categories.map(([key, config]) => {
        const Icon = categoryIcons[key];
        const isSelected = selected === key;
        
        return (
          <button
            key={key}
            type="button"
            onClick={() => onSelect(key)}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
              isSelected
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border hover:border-primary/30 hover:bg-muted/50'
            }`}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `hsl(var(--${config.color}) / 0.15)` }}
            >
              <Icon 
                className="h-5 w-5" 
                style={{ color: `hsl(var(--${config.color}))` }}
              />
            </div>
            <span className={`font-medium text-sm ${isSelected ? 'text-primary' : 'text-foreground'}`}>
              {config.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
