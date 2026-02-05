 import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
 import { Issue, IssueCategory } from '@/lib/types';
 
 interface IssueContextType {
   issues: Issue[];
   addIssue: (issue: Omit<Issue, 'id' | 'reportedAt' | 'updatedAt' | 'upvotes' | 'commentsCount' | 'hasUpvoted'>) => void;
   upvoteIssue: (id: string) => void;
 }
 
 const IssueContext = createContext<IssueContextType | undefined>(undefined);
 
 export function IssueProvider({ children }: { children: ReactNode }) {
   // Start with empty array - no fake data
   const [issues, setIssues] = useState<Issue[]>([]);
 
   const addIssue = useCallback((issueData: Omit<Issue, 'id' | 'reportedAt' | 'updatedAt' | 'upvotes' | 'commentsCount' | 'hasUpvoted'>) => {
     const newIssue: Issue = {
       ...issueData,
       id: crypto.randomUUID(),
       reportedAt: new Date(),
       updatedAt: new Date(),
       upvotes: 0,
       commentsCount: 0,
       hasUpvoted: false,
     };
     setIssues(prev => [newIssue, ...prev]);
   }, []);
 
   const upvoteIssue = useCallback((id: string) => {
     setIssues(prev => prev.map(issue => {
       if (issue.id === id) {
         return {
           ...issue,
           upvotes: issue.hasUpvoted ? issue.upvotes - 1 : issue.upvotes + 1,
           hasUpvoted: !issue.hasUpvoted,
         };
       }
       return issue;
     }));
   }, []);
 
   return (
     <IssueContext.Provider value={{ issues, addIssue, upvoteIssue }}>
       {children}
     </IssueContext.Provider>
   );
 }
 
 export function useIssues() {
   const context = useContext(IssueContext);
   if (context === undefined) {
     throw new Error('useIssues must be used within an IssueProvider');
   }
   return context;
 }