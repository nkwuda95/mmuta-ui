import * as React from "react"
import { Link, useLocation } from "wouter"
import { BookOpen, LineChart, MessageCircle, Moon, Sun, Home, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { useTheme } from "./theme-provider"

export function Navbar() {
  const [location] = useLocation()
  const { theme, setTheme } = useTheme()

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/tutor", icon: MessageCircle, label: "Tutor" },
    { href: "/progress", icon: LineChart, label: "Progress" },
  ]

  // Hide full navbar on landing page (handled in App.tsx layout)
  if (location === "/") {
    return (
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              M
            </div>
            Mmuta
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link href="/dashboard" className="hidden sm:inline-flex h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all shadow-sm active:scale-95">
              Start Learning
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <div className="hidden md:flex flex-col w-64 border-r border-border bg-card h-[100dvh] sticky top-0 left-0 p-4">
      <Link href="/" className="flex items-center gap-2 text-primary font-bold text-2xl mb-8 px-2 mt-4 hover:opacity-80 transition-opacity">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
          M
        </div>
        Mmuta
      </Link>

      <div className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all group",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
              {item.label}
            </Link>
          )
        })}
      </div>

      <div className="mt-auto border-t border-border pt-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <><Sun className="w-5 h-5" /> Light Mode</>
          ) : (
            <><Moon className="w-5 h-5" /> Dark Mode</>
          )}
        </Button>
      </div>
    </div>
  )
}

// Mobile bottom navigation
export function MobileNav() {
  const [location] = useLocation()
  
  if (location === "/") return null

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/tutor", icon: MessageCircle, label: "Tutor" },
    { href: "/progress", icon: LineChart, label: "Progress" },
  ]

  return (
    <div className="md:hidden fixed bottom-0 w-full border-t border-border bg-card pb-safe z-50">
      <div className="flex justify-around p-2">
        {navItems.map((item) => {
          const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-14 rounded-lg text-xs font-medium transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className={cn("w-5 h-5 mb-1", isActive ? "fill-primary/20" : "")} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
