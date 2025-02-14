
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Users,
  FileSpreadsheet,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "admin" | "agent";
}

interface NavItem {
  label: string;
  icon: React.ComponentType;
  href: string;
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const adminNavItems: NavItem[] = [
    { label: "Dashboard", icon: BarChart3, href: "/admin/dashboard" },
    { label: "Agents", icon: Users, href: "/admin/agents" },
    { label: "Sales Data", icon: FileSpreadsheet, href: "/admin/sales" },
    { label: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  const agentNavItems: NavItem[] = [
    { label: "Dashboard", icon: BarChart3, href: "/agent/dashboard" },
    { label: "Settings", icon: Settings, href: "/agent/settings" },
  ];

  const navItems = role === "admin" ? adminNavItems : agentNavItems;

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-dashboard-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-dashboard-text-primary">
              Sales Dashboard
            </h2>
          </div>
          <ScrollArea className="flex-1 py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center px-3 py-2 text-sm rounded-md text-dashboard-text-secondary hover:bg-gray-100 hover:text-dashboard-text-primary transition-colors"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </ScrollArea>
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-dashboard-text-secondary hover:text-dashboard-text-primary"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div
        className={cn(
          "min-h-screen transition-all duration-200 ease-in-out",
          isSidebarOpen ? "pl-64" : "pl-0"
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-40 h-16 bg-white border-b">
          <div className="h-full flex items-center px-4">
            <Button
              variant="ghost"
              size="icon"
              className="mr-4"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <h1 className="text-lg font-semibold text-dashboard-text-primary">
              {role === "admin" ? "Admin Dashboard" : "Agent Dashboard"}
            </h1>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
