
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import LeftPanel from "@/components/LeftPanel";
import CenterPanel from "@/components/CenterPanel";
import RightPanel from "@/components/RightPanel";
import { TestCase } from "@/types";

interface WorkspaceProps {
  onAuthChange: (status: boolean) => void;
}

const Workspace = ({ onAuthChange }: WorkspaceProps) => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [currentDocument, setCurrentDocument] = useState<File | null>(null);
  const [inputContent, setInputContent] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleLogout = () => {
    onAuthChange(false);
  };
  
  const handleFileUpload = (file: File) => {
    setCurrentDocument(file);
    // In a real app, we would extract text from the file here
    // For demo purposes, we'll set some sample content
    setInputContent(`Requirements for User Authentication Module:
1. The system shall support user registration with email and password.
2. Users should be able to log in using their credentials.
3. Password reset functionality should be provided via email.
4. The system shall lock accounts after 5 failed login attempts.
5. User sessions should expire after 30 minutes of inactivity.`);
  };
  
  const handleTextInput = (text: string) => {
    setInputContent(text);
    setCurrentDocument(null);
  };
  
  const generateTestCases = () => {
    if (!inputContent) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const newTestCases: TestCase[] = [
        {
          id: "1",
          name: "User Registration - Valid Information",
          preconditions: "System is operational. User has valid email.",
          steps: [
            "Navigate to registration page",
            "Enter valid email",
            "Enter valid password", 
            "Confirm password",
            "Click 'Register' button"
          ],
          expected: "User account is created. Confirmation email is sent. User is redirected to login page.",
          priority: "High"
        },
        {
          id: "2",
          name: "User Login - Valid Credentials",
          preconditions: "User has registered account. Account is active.",
          steps: [
            "Navigate to login page",
            "Enter valid email",
            "Enter valid password",
            "Click 'Login' button"
          ],
          expected: "User is authenticated. User is redirected to dashboard.",
          priority: "High"
        },
        {
          id: "3",
          name: "Password Reset - Valid Email",
          preconditions: "User has registered account.",
          steps: [
            "Navigate to login page",
            "Click 'Forgot Password' link",
            "Enter registered email",
            "Click 'Reset Password' button"
          ],
          expected: "Password reset email is sent to user's email address.",
          priority: "Medium"
        },
        {
          id: "4",
          name: "Account Lockout - Failed Login Attempts",
          preconditions: "User has registered account.",
          steps: [
            "Navigate to login page",
            "Enter valid email",
            "Enter invalid password",
            "Repeat steps 2-3 five times"
          ],
          expected: "Account is locked after 5 failed attempts. User is notified of account lockout.",
          priority: "High"
        },
        {
          id: "5",
          name: "Session Timeout - Inactivity",
          preconditions: "User is logged in.",
          steps: [
            "User is inactive for 30 minutes",
            "User attempts to perform action"
          ],
          expected: "User session expires. User is redirected to login page with message about session timeout.",
          priority: "Medium"
        }
      ];
      
      setTestCases(newTestCases);
      setIsProcessing(false);
    }, 2000);
  };
  
  const updateTestCase = (id: string, updatedTestCase: Partial<TestCase>) => {
    setTestCases(prevTestCases => 
      prevTestCases.map(tc => 
        tc.id === id ? { ...tc, ...updatedTestCase } : tc
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background animate-fade-in">
      {/* Header */}
      <header className="px-6 py-4 bg-white border-b flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-2xl font-bold">AIGenTest</h1>
        <div className="flex items-center space-x-4">
          <span className="text-muted-foreground">Welcome, User</span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/4 border-r panel-transition-left">
          <LeftPanel 
            onFileUpload={handleFileUpload}
            onTextInput={handleTextInput}
            currentFile={currentDocument}
            inputContent={inputContent}
            onGenerate={generateTestCases}
            isProcessing={isProcessing}
          />
        </div>
        
        {/* Center Panel */}
        <div className="w-2/4 panel-transition-up">
          <CenterPanel 
            testCases={testCases} 
            isProcessing={isProcessing}
          />
        </div>
        
        {/* Right Panel */}
        <div className="w-1/4 border-l panel-transition-right">
          <RightPanel 
            testCases={testCases}
            onUpdateTestCase={updateTestCase}
            currentDocument={currentDocument}
            inputContent={inputContent}
          />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
