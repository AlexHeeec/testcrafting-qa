
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, LogIn } from "lucide-react";

interface LoginProps {
  onAuthChange: (status: boolean) => void;
}

const Login = ({ onAuthChange }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, any email/password combination works
      onAuthChange(true);
      toast.success("Login successful");
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    // Simulate Google auth
    setTimeout(() => {
      onAuthChange(true);
      toast.success("Google login successful");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/50 p-4 page-transition">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-slide-down">
          <h1 className="text-3xl font-bold tracking-tight">AIGenTest</h1>
          <p className="text-muted-foreground mt-2">AI-Powered Test Case Generation</p>
        </div>
        
        <Card className="glassmorphism animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 input-field"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 input-field"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full btn-primary" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
                {!isLoading && <LogIn className="ml-2 h-4 w-4" />}
              </Button>
            </form>
            
            <div className="mt-6 flex items-center justify-between">
              <Separator className="flex-grow" />
              <span className="mx-4 text-sm text-muted-foreground">or</span>
              <Separator className="flex-grow" />
            </div>
            
            <Button
              type="button"
              variant="outline"
              className="w-full mt-4"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                />
              </svg>
              Sign in with Google
            </Button>
          </CardContent>
          
          <CardFooter className="flex justify-center border-t pt-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="#" className="text-primary hover:underline">
                Create one
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
