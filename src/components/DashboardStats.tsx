import { dashboardStats } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Users, 
  AlertTriangle,
  Construction,
  Trash2,
  Droplets,
  Lightbulb,
  TrafficCone,
  ShieldAlert,
} from 'lucide-react';

const categoryData = Object.entries(dashboardStats.issuesByCategory).map(([key, value]) => ({
  name: key.charAt(0).toUpperCase() + key.slice(1),
  value,
  fill: `hsl(var(--category-${key}))`,
}));

const statusData = Object.entries(dashboardStats.issuesByStatus).map(([key, value]) => ({
  name: key === 'in-progress' ? 'In Progress' : key.charAt(0).toUpperCase() + key.slice(1),
  value,
}));

const COLORS = ['#f59e0b', '#3b82f6', '#eab308', '#22c55e'];

export function DashboardStats() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Issues</p>
                <p className="text-2xl font-heading font-bold text-foreground">{dashboardStats.totalIssues.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-status-resolved">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved This Month</p>
                <p className="text-2xl font-heading font-bold text-foreground">{dashboardStats.resolvedThisMonth}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-status-resolved/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-status-resolved" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-status-in-progress">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Resolution Time</p>
                <p className="text-2xl font-heading font-bold text-foreground">{dashboardStats.averageResolutionTime}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-status-in-progress/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-status-in-progress" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Citizen Satisfaction</p>
                <p className="text-2xl font-heading font-bold text-foreground">{dashboardStats.citizenSatisfaction}%</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading">
              <TrendingUp className="h-5 w-5 text-primary" />
              Issue Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={dashboardStats.trendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="reported" 
                  stroke="hsl(var(--status-reported))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--status-reported))' }}
                  name="Reported"
                />
                <Line 
                  type="monotone" 
                  dataKey="resolved" 
                  stroke="hsl(var(--status-resolved))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--status-resolved))' }}
                  name="Resolved"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {statusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-heading">Issues by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="name" type="category" width={100} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
