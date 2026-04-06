import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import About from "./pages/About";
import Simulator from "./pages/Simulator";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Learning from "./pages/Learning";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MockTests from "./pages/MockTests";
import AdminPanel from "./pages/AdminPanel";
import CompanyDetail from "./pages/CompanyDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mock-tests" element={<MockTests />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
