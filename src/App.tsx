
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Workspace from "./pages/Workspace";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  // Auth state update function
  const handleAuthChange = (status: boolean) => {
    setIsAuthenticated(status);
    if (status) {
      localStorage.setItem("user", "authenticated");
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={isAuthenticated ? <Navigate to="/workspace" /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/workspace" /> : 
                <Login onAuthChange={handleAuthChange} />
              } 
            />
            <Route 
              path="/workspace" 
              element={
                isAuthenticated ? 
                <Workspace onAuthChange={handleAuthChange} /> : 
                <Navigate to="/login" />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
