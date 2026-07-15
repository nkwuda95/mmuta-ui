import { useRef, useEffect, useState } from "react"
import { useStore } from "@/store"
import { mmutaApi } from "@/services/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Mic, Sparkles, MessageCircle, Plus, MoreVertical, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 p-4 rounded-2xl bg-card border border-border w-16 h-12 shadow-sm rounded-bl-none">
      <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"></div>
    </div>
  )
}

export default function Tutor() {
  const { conversations, activeConversationId, setActiveConversationId, addMessageToActiveConversation, createNewConversation } = useStore()
  
  const activeConversation = conversations.find(c => c.id === activeConversationId)
  
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [activeConversation?.messages, isTyping])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputValue.trim() || !activeConversationId) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: inputValue,
      timestamp: new Date().toISOString()
    }
    
    addMessageToActiveConversation(userMessage)
    setInputValue("")
    setIsTyping(true)

    try {
      const response = await mmutaApi.sendChatMessage(userMessage.content, activeConversationId)
      addMessageToActiveConversation(response.message)
    } catch (error) {
      console.error("Failed to send message:", error)
      // Could show a toast here
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="flex h-[100dvh] md:h-screen w-full overflow-hidden bg-background">
      
      {/* Sidebar for conversations - hidden on small mobile, drawer could be added later */}
      <div className="hidden lg:flex flex-col w-72 border-r border-border bg-card">
        <div className="p-4 flex flex-col gap-4 border-b border-border">
          <Button onClick={createNewConversation} className="w-full gap-2 rounded-full">
            <Plus className="w-4 h-4" /> New Conversation
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-1">
            {conversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setActiveConversationId(conv.id)}
                className={cn(
                  "w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all",
                  activeConversationId === conv.id 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-muted text-foreground/80 hover:text-foreground"
                )}
              >
                <MessageCircle className="w-5 h-5 mt-0.5 shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-sm font-medium truncate">{conv.title}</div>
                  <div className="text-xs opacity-70 truncate mt-0.5">
                    {conv.messages.length > 0 ? conv.messages[conv.messages.length - 1].content : "No messages yet"}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative min-w-0">
        
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 bg-background/80 backdrop-blur-sm z-10 shrink-0">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border border-border">
              <AvatarFallback className="bg-primary/20 text-primary"><Sparkles className="w-5 h-5" /></AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-foreground">Mmuta Tutor</h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
              </p>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="lg:hidden text-muted-foreground">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-32" ref={scrollRef}>
          <div className="max-w-3xl mx-auto space-y-6 flex flex-col">
            
            {activeConversation?.messages.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center p-8 space-y-4 my-auto h-full text-muted-foreground animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Start Practicing</h3>
                  <p className="text-sm max-w-xs mx-auto mt-2">
                    Say "Nnọọ" to begin, or try asking how to say a specific word in Igbo.
                  </p>
                </div>
              </div>
            )}

            {activeConversation?.messages.map((msg, index) => {
              const isUser = msg.role === 'user'
              return (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex max-w-[85%] md:max-w-[75%]",
                    isUser ? "self-end" : "self-start"
                  )}
                  style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
                >
                  <div className={cn(
                    "px-5 py-3.5 rounded-2xl shadow-sm text-[15px] leading-relaxed",
                    isUser 
                      ? "bg-primary text-primary-foreground rounded-br-none" 
                      : "bg-card border border-border text-card-foreground rounded-bl-none"
                  )}>
                    {msg.content}
                  </div>
                </div>
              )
            })}
            
            {isTyping && (
              <div className="self-start">
                <TypingIndicator />
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent pb-[calc(1rem+env(safe-area-inset-bottom))] md:pb-4">
          <div className="max-w-3xl mx-auto">
            <form 
              onSubmit={handleSend}
              className="relative flex items-center bg-card border border-border rounded-full p-1.5 pr-2 shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all"
            >
              <Button type="button" variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-foreground rounded-full">
                <Mic className="w-5 h-5" />
              </Button>
              
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message in Igbo or English..."
                className="flex-1 bg-transparent border-none outline-none px-2 py-3 text-sm placeholder:text-muted-foreground/60"
              />
              
              <Button 
                type="submit" 
                disabled={!inputValue.trim() || isTyping}
                size="icon"
                className="shrink-0 rounded-full h-10 w-10 shrink-0"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </Button>
            </form>
            <div className="text-center mt-2 text-[11px] text-muted-foreground font-medium">
              Mmuta AI can make mistakes. Verify important translations.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
