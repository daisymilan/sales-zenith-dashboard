
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Temporary components until we implement them
const AdminDashboard = () => (
  <div className="text-2xl font-bold">Admin Dashboard (Coming Soon)</div>
);
const AgentDashboard = () => (
  <div className="text-2xl font-bold">Agent Dashboard (Coming Soon)</div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin routes */}
          <Route
            path="/admin/*"
            element={
              <DashboardLayout role="admin">
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="agents" element={<div>Agents Management</div>} />
                  <Route path="sales" element={<div>Sales Data</div>} />
                  <Route path="settings" element={<div>Admin Settings</div>} />
                </Routes>
              </DashboardLayout>
            }
          />

          {/* Agent routes */}
          <Route
            path="/agent/*"
            element={
              <DashboardLayout role="agent">
                <Routes>
                  <Route path="dashboard" element={<AgentDashboard />} />
                  <Route path="settings" element={<div>Agent Settings</div>} />
                </Routes>
              </DashboardLayout>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
