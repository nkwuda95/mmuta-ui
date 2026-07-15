import { useStore } from "@/store"
import { mockChartData } from "@/mock/data"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Award, Target, Zap, Clock, CalendarDays } from "lucide-react"

export default function Progress() {
  const { stats } = useStore()

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 pb-24 space-y-8 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Your Progress</h1>
        <p className="text-muted-foreground mt-2 text-lg">Track your journey to fluency.</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 text-primary-foreground flex flex-col justify-between h-40 relative overflow-hidden shadow-md">
          <Zap className="w-24 h-24 absolute -right-4 -bottom-4 opacity-20" />
          <div className="font-medium opacity-90">Current Streak</div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold">{stats.streak}</span>
            <span className="text-lg opacity-80">days</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-6 flex flex-col justify-between h-40">
          <div className="font-medium text-muted-foreground flex items-center gap-2">
            <Award className="w-5 h-5 text-secondary-foreground" />
            Words Mastered
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-foreground">{stats.vocabLearned}</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-6 flex flex-col justify-between h-40">
          <div className="font-medium text-muted-foreground flex items-center gap-2">
            <Target className="w-5 h-5 text-accent-foreground" />
            Overall Accuracy
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-foreground">{stats.accuracy}%</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6 pt-4">
        
        {/* Weekly Activity */}
        <div className="bg-card border border-border rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Words Learned (Last 7 Days)</h3>
            <CalendarDays className="w-5 h-5 text-muted-foreground" />
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="words" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorWords)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Learning Time (Placeholder) */}
        <div className="bg-card border border-border rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Practice Time</h3>
            <Clock className="w-5 h-5 text-muted-foreground" />
          </div>
          
          <div className="flex flex-col items-center justify-center h-64 text-center space-y-2">
            <div className="w-48 h-48 rounded-full border-8 border-muted flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="transparent" stroke="hsl(var(--primary))" strokeWidth="8" strokeDasharray="289" strokeDashoffset="75" strokeLinecap="round" />
              </svg>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">4.2</span>
                <span className="text-sm text-muted-foreground">hours this week</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Top 20% of learners this week!</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}
