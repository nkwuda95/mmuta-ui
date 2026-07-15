import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { mmutaApi } from "@/services/api"
import { useParams, Link } from "wouter"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Volume2, CheckCircle, Brain, Book } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function Lesson() {
  const { id } = useParams()
  const queryClient = useQueryClient()

  const { data: lesson, isLoading } = useQuery({
    queryKey: ['lesson', id],
    queryFn: () => mmutaApi.getLesson(id!),
    enabled: !!id,
  })

  const completeLessonMutation = useMutation({
    mutationFn: () => mmutaApi.completeLesson(id!),
    onSuccess: () => {
      // isCompleted lives on both the list and the single-lesson query,
      // and completedLessonIds/masteredVocabulary live on the learner
      // progress query dashboard.tsx reads — refresh all three so the
      // "done" state shows up without a manual page reload.
      queryClient.invalidateQueries({ queryKey: ['lessons'] })
      queryClient.invalidateQueries({ queryKey: ['lesson', id] })
      queryClient.invalidateQueries({ queryKey: ['learner'] })
      setActiveTab('vocab')
    },
  })

  const [activeTab, setActiveTab] = useState<'vocab' | 'grammar' | 'quiz'>('vocab')
  const [quizIndex, setQuizIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8 animate-pulse space-y-8">
        <div className="h-10 w-32 bg-muted rounded"></div>
        <div className="h-20 w-3/4 bg-muted rounded"></div>
        <div className="h-64 bg-card rounded-3xl"></div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold">Lesson not found</h2>
        <Link href="/dashboard"><Button className="mt-4">Back to Dashboard</Button></Link>
      </div>
    )
  }

  const handleQuizAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    // simple simulation of checking answer - UI only
  }

  const nextQuizQuestion = () => {
    setSelectedAnswer(null)
    if (quizIndex < lesson.quiz.length - 1) {
      setQuizIndex(prev => prev + 1)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pb-24 space-y-8 animate-in fade-in duration-500">
      
      <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </Link>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
          {lesson.level}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold">{lesson.title}</h1>
        <p className="text-lg text-muted-foreground">{lesson.description}</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-card border border-border rounded-xl p-1 overflow-x-auto hide-scrollbar">
        {[
          { id: 'vocab', label: 'Vocabulary', icon: Book },
          { id: 'grammar', label: 'Grammar', icon: Brain },
          { id: 'quiz', label: 'Practice Quiz', icon: CheckCircle }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
              activeTab === tab.id 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {activeTab === 'vocab' && (
          <div className="grid sm:grid-cols-2 gap-4 animate-in slide-in-from-right-4 duration-300">
            {lesson.vocabulary.map((vocab) => (
              <div key={vocab.id} className="bg-card border border-border rounded-2xl p-6 space-y-4 group">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{vocab.igbo}</h3>
                    <p className="text-primary text-sm font-mono mt-1">{vocab.pronunciation}</p>
                  </div>
                  <Button variant="outline" size="icon" className="rounded-full h-8 w-8 text-muted-foreground group-hover:text-primary group-hover:border-primary">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="h-px w-full bg-border"></div>
                <div>
                  <p className="font-medium text-lg">{vocab.english}</p>
                </div>
                <div className="bg-muted rounded-xl p-3 text-sm space-y-1">
                  <p className="font-medium">"{vocab.exampleIgbo}"</p>
                  <p className="text-muted-foreground">"{vocab.exampleEnglish}"</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'grammar' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            {lesson.grammar.map((rule) => (
              <div key={rule.id} className="bg-card border border-border rounded-3xl p-6 md:p-8 space-y-6">
                <h3 className="text-2xl font-bold text-primary">{rule.title}</h3>
                <p className="text-lg leading-relaxed">{rule.explanation}</p>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Examples</h4>
                  {rule.examples.map((ex, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 bg-muted p-4 rounded-xl">
                      <div className="font-bold text-lg flex-1">{ex.igbo}</div>
                      <div className="text-muted-foreground flex-1">{ex.english}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            {lesson.quiz.length > 0 ? (
              <div className="max-w-2xl mx-auto bg-card border border-border rounded-3xl p-6 md:p-10 text-center space-y-8">
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                  Question {quizIndex + 1} of {lesson.quiz.length}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold">
                  {lesson.quiz[quizIndex].question}
                </h3>

                {lesson.quiz[quizIndex].type === 'multiple_choice' && lesson.quiz[quizIndex].options && (
                  <div className="grid gap-3">
                    {lesson.quiz[quizIndex].options.map((opt) => (
                      <Button
                        key={opt}
                        variant="outline"
                        size="lg"
                        className={cn(
                          "h-auto py-4 text-lg justify-start rounded-xl font-normal text-left",
                          selectedAnswer === opt 
                            ? opt === lesson.quiz[quizIndex].correctAnswer
                              ? "bg-green-100 border-green-500 text-green-900 dark:bg-green-900/30 dark:text-green-100"
                              : "bg-red-100 border-red-500 text-red-900 dark:bg-red-900/30 dark:text-red-100"
                            : "hover:bg-primary/5 hover:border-primary"
                        )}
                        onClick={() => handleQuizAnswer(opt)}
                        disabled={selectedAnswer !== null}
                      >
                        {opt}
                      </Button>
                    ))}
                  </div>
                )}

                {lesson.quiz[quizIndex].type === 'translation' && (
                  <div className="space-y-4 text-left">
                    {/* Simplified for mock - just a reveal button for translation types */}
                    {selectedAnswer === null ? (
                      <Button onClick={() => setSelectedAnswer('revealed')} className="w-full h-14 text-lg rounded-xl">
                        Reveal Answer
                      </Button>
                    ) : (
                      <div className="bg-green-100 border border-green-500 text-green-900 dark:bg-green-900/30 dark:text-green-100 p-6 rounded-xl font-bold text-xl text-center">
                        {lesson.quiz[quizIndex].correctAnswer}
                      </div>
                    )}
                  </div>
                )}

                {selectedAnswer && (
                  <div className="pt-4 border-t border-border animate-in fade-in">
                    {quizIndex < lesson.quiz.length - 1 ? (
                      <Button onClick={nextQuizQuestion} size="lg" className="rounded-full gap-2 px-8">
                        Next Question <ArrowLeft className="w-4 h-4 rotate-180" />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => completeLessonMutation.mutate()}
                        disabled={completeLessonMutation.isPending}
                        size="lg"
                        className="rounded-full gap-2 px-8 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="w-5 h-5" />
                        {completeLessonMutation.isPending ? "Saving..." : "Lesson Complete"}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center p-8 text-muted-foreground">No quiz available for this lesson.</div>
            )}
          </div>
        )}
      </div>

    </div>
  )
}