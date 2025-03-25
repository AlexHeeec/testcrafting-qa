
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SendHorizontal, Bot, User, Info } from "lucide-react";
import { TestCase } from "@/types";
import { cn } from "@/lib/utils";

interface RightPanelProps {
  testCases: TestCase[];
  onUpdateTestCase: (id: string, updatedTestCase: Partial<TestCase>) => void;
  currentDocument: File | null;
  inputContent: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const RightPanel = ({ 
  testCases, 
  onUpdateTestCase, 
  currentDocument, 
  inputContent 
}: RightPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI assistant for test case generation. I can help you refine and adjust the generated test cases. What would you like to improve?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "";
      
      // Generate contextual responses based on user input
      if (newMessage.toLowerCase().includes("priority")) {
        aiResponse = "I can help you adjust the priority of any test case. Which test case would you like to modify, and what should the new priority be (Low, Medium, High)?";
      } else if (newMessage.toLowerCase().includes("add step") || newMessage.toLowerCase().includes("new step")) {
        aiResponse = "Adding steps is a good way to make test cases more thorough. Tell me which test case you want to add a step to, and what the new step should be.";
      } else if (newMessage.toLowerCase().includes("expected result") || newMessage.toLowerCase().includes("expected outcome")) {
        aiResponse = "I can help you refine the expected results for any test case. Which test case are you referring to?";
      } else if (testCases.length === 0) {
        aiResponse = "It looks like there are no test cases generated yet. Please upload requirements or enter text in the left panel, then click 'Generate Test Cases'.";
      } else {
        aiResponse = "I've analyzed your request and the current test cases. Would you like me to suggest improvements to specific test cases, or should I generate additional test cases based on the requirements?";
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full panel">
      {/* Info Card */}
      {testCases.length > 0 && (
        <div className="p-4 border-b">
          <Card className="bg-secondary/30 p-3">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">AI Assistant</p>
                <p className="text-muted-foreground">
                  Ask me to modify test cases, adjust priorities, or suggest improvements based on the requirements.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start space-x-2 animate-fade-in",
              message.sender === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.sender === "ai" && (
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-primary" />
              </div>
            )}
            
            <div
              className={cn(
                "max-w-[80%] rounded-lg p-3",
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary border"
              )}
            >
              <p className="text-sm">{message.content}</p>
              <div className="text-xs opacity-70 mt-1 text-right">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            
            {message.sender === "user" && (
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="p-4 border-t bg-background">
        <div className="flex space-x-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="shrink-0"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
