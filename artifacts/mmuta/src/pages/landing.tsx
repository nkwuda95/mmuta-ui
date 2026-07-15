import { Link } from "wouter"
import { ArrowRight, Globe, MessageCircle, Sparkles, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Landing() {
  return (
    <div className="min-h-screen pt-16 flex flex-col bg-background">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center relative overflow-hidden">
        {/* Subtle background pattern - uli inspired geometric soft shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-[0.03] dark:opacity-[0.05]">
          <div className="w-[800px] h-[800px] border-[40px] border-primary rounded-full blur-3xl absolute -top-[400px] -right-[200px]"></div>
          <div className="w-[600px] h-[600px] border-[30px] border-secondary rounded-full blur-3xl absolute -bottom-[200px] -left-[100px]"></div>
        </div>

        <div className="z-10 max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Sparkles className="mr-2 h-4 w-4" />
            Learn Igbo with AI
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground font-sans">
            Connect with your <span className="text-primary">heritage</span>.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Mmuta is your personal, patient, AI-powered Igbo language tutor. 
            Practice conversation, learn vocabulary, and immerse yourself in the culture at your own pace.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto gap-2 group text-base h-14 px-8 rounded-full">
                Start Learning <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="space-y-4 text-center group">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Conversational AI</h3>
              <p className="text-muted-foreground">Chat with an AI tutor that adapts to your level, explains nuances, and never gets tired.</p>
            </div>
            
            <div className="space-y-4 text-center group">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary/30 flex items-center justify-center text-secondary-foreground group-hover:scale-110 group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-300">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Structured Lessons</h3>
              <p className="text-muted-foreground">Follow a guided curriculum from basic greetings to complex proverbs.</p>
            </div>

            <div className="space-y-4 text-center group">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-accent flex items-center justify-center text-accent-foreground group-hover:scale-110 group-hover:bg-accent-foreground group-hover:text-background transition-all duration-300">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Cultural Context</h3>
              <p className="text-muted-foreground">Learn more than just words. Understand the deep cultural meaning behind the language.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border text-center text-muted-foreground mt-auto">
        <p>© {new Date().getFullYear()} Mmuta. Built for the diaspora and the curious.</p>
      </footer>
    </div>
  )
}
