


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import LearnerDashboard from "./pages/LearnerDashboard";
import LessonView from "./pages/LessonView";
import NotFound from "./pages/NotFound";
import Schedule from "./pages/Schedule";
import UpcomingLessons from "./pages/UpcomingLessons";
import LiveRoom from "./pages/LiveRoom";
import Subject from "./pages/Subject";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/learner/dashboard" element={<LearnerDashboard />} />
          <Route path="/lessons/schedule" element={<Schedule />} />
          <Route path="/lessons/upcoming" element={<UpcomingLessons />} />
          <Route path="/lessons/live/:roomId" element={<LiveRoom />} />
          <Route path="/subject/:id" element={<Subject />} />
          <Route path="/lesson/:id" element={<LessonView />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
