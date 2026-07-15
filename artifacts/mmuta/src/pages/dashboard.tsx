import { useQuery } from "@tanstack/react-query"
import { mmutaApi } from "@/services/api"
import { useStore } from "@/store"
import { Link } from "wouter"
import { Flame, Trophy, BookOpen, GraduationCap, ArrowRight, CheckCircle2, Play, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const { stats: mockStats } = useStore()

  const { data: lessons, isLoading } = useQuery({
    queryKey: ['lessons'],
    queryFn: mmutaApi.getLessons,
  })

  const { data: learnerProgress } = useQuery({
    queryKey: ['learner'],
    queryFn: mmutaApi.getLearnerProgress,
  })

  // level/vocabulary/grammar/lessonsCompleted come from the real backend.
  // streak and accuracy don't exist there yet — the backend has no daily
  // activity or answer-accuracy tracking — so those two still fall back
  // to the mock store. Worth building for real before this ships; for
  // now it's a known, visible gap rather than a silently faked number.
  const stats = {
    level: learnerProgress?.level ?? mockStats.level,
    vocabLearned: learnerProgress?.masteredVocabulary.length ?? mockStats.vocabLearned,
    grammarTopics: learnerProgress?.grammarLearned.length ?? mockStats.grammarTopics,
    lessonsCompleted: learnerProgress?.completedLessonIds.length ?? mockStats.lessonsCompleted,
    streak: mockStats.streak,
    accuracy: mockStats.accuracy,
  }

  const nextLesson = lessons?.find(l => !l.isCompleted) || lessons?.[0]

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 pb-24 md:pb-8 space-y-8 animate-in fade-in duration-500">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Nnọọ, Learner!</h1>
          <p className="text-muted-foreground mt-2 text-lg">Ready to practice some Igbo today?</p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-full shadow-sm">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
          <span className="font-bold">{stats.streak} day streak</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-4 flex flex-col justify-between hover-elevate transition-transform">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground text-sm font-medium">Level</span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-primary" />
            </div>
          </div>
          <span className="text-2xl font-bold capitalize">{stats.level}</span>
        </div>
        
        <div className="bg-card border border-border rounded-2xl p-4 flex flex-col justify-between hover-elevate transition-transform">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground text-sm font-medium">Vocabulary</span>
            <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-secondary-foreground" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{stats.vocabLearned}</span>
            <span className="text-sm text-muted-foreground">words</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 flex flex-col justify-between hover-elevate transition-transform">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground text-sm font-medium">Grammar</span>
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-accent-foreground" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{stats.grammarTopics}</span>
            <span className="text-sm text-muted-foreground">topics</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 flex flex-col justify-between hover-elevate transition-transform">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground text-sm font-medium">Accuracy</span>
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{stats.accuracy}%</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 pt-4">
        {/* Next Lesson Card */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold">Up Next</h2>
          {isLoading ? (
            <div className="h-48 bg-muted rounded-3xl animate-pulse"></div>
          ) : nextLesson ? (
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm overflow-hidden relative">
              {/* Decorative background shape */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                  Lesson {(lessons?.findIndex(l => l.id === nextLesson.id) ?? 0) + 1}
                </div>
                <h3 className="text-2xl font-bold">{nextLesson.title}</h3>
                <p className="text-muted-foreground max-w-md">{nextLesson.description}</p>
                
                <div className="flex gap-4 text-sm text-muted-foreground pt-2">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" /> {nextLesson.vocabulary.length} words
                  </span>
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" /> {nextLesson.grammar.length} topics
                  </span>
                </div>
              </div>

              <Link href={`/lessons/${nextLesson.id}`}>
                <Button size="lg" className="w-full md:w-auto rounded-full gap-2 relative z-10 px-8">
                  <Play className="w-4 h-4 fill-current" /> Start Lesson
                </Button>
              </Link>
            </div>
          ) : null}
        </div>

        {/* Practice Reminder */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Free Practice</h2>
          <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-3xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-20 translate-x-1/4 translate-y-1/4">
              <MessageCircle className="w-32 h-32" />
            </div>
            
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-bold leading-tight">Chat with your AI Tutor</h3>
              <p className="text-primary-foreground/80 text-sm">
                Apply what you've learned in a real conversation. The tutor will guide you if you get stuck.
              </p>
              <Link href="/tutor">
                <Button variant="secondary" className="w-full rounded-full gap-2 mt-4 text-primary bg-background hover:bg-background/90">
                  Chat Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}