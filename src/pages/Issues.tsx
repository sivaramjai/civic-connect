import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IssueCard } from '@/components/IssueCard';
 import { useIssues } from '@/contexts/IssueContext';
import { IssueStatus, IssueCategory, CATEGORY_CONFIG, STATUS_CONFIG } from '@/lib/types';
import { Search, Filter, SlidersHorizontal, MapPin, LayoutGrid, List } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Issues = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

   const { issues, upvoteIssue } = useIssues();
 
   const filteredIssues = issues.filter((issue) => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || issue.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b.reportedAt.getTime() - a.reportedAt.getTime();
      case 'upvotes':
        return b.upvotes - a.upvotes;
      case 'comments':
        return b.commentsCount - a.commentsCount;
      default:
        return 0;
    }
  });

 const handleUpvote = (id: string) => {
     upvoteIssue(id);
   };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Browse Issues
            </h1>
            <p className="text-muted-foreground">
              Explore reported issues in your community. Upvote to help prioritize important problems.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issues by title, description, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="upvotes">Most Upvotes</SelectItem>
                  <SelectItem value="comments">Most Comments</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex border border-border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="rounded-none"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredIssues.length} issue{filteredIssues.length !== 1 ? 's' : ''}
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <MapPin className="h-4 w-4" />
              View Map
            </Button>
          </div>

           {/* Issues List */}
           {issues.length === 0 ? (
             <div className="text-center py-16">
               <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                 <MapPin className="h-8 w-8 text-muted-foreground" />
               </div>
               <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                 No issues reported yet
               </h3>
               <p className="text-muted-foreground mb-4">
                 Be the first to report a civic issue in your community.
               </p>
               <Button variant="default" onClick={() => window.location.href = '/report'}>
                 Report an Issue
               </Button>
             </div>
           ) : filteredIssues.length > 0 ? (
             <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
               {filteredIssues.map((issue) => (
                 <IssueCard key={issue.id} issue={issue} onUpvote={handleUpvote} />
               ))}
             </div>
           ) : (
             <div className="text-center py-16">
               <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                 <Search className="h-8 w-8 text-muted-foreground" />
               </div>
               <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                 No matching issues
               </h3>
               <p className="text-muted-foreground mb-4">
                 Try adjusting your filters or search terms.
               </p>
               <Button variant="outline" onClick={() => {
                 setSearchQuery('');
                 setStatusFilter('all');
                 setCategoryFilter('all');
               }}>
                 Clear Filters
               </Button>
             </div>
           )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Issues;
