
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { UserPreferencesProvider } from "@/shared/store/user-preferences.context";
import { DashboardProvider } from "@/slices/dashboard/contexts/dashboard.context";
import { ROUTES } from "@/core/constants/routes";

// Lazy load pages for better performance
import React from "react";
const Home = React.lazy(() => import("@/slices/home/pages/Home"));
const Documentation = React.lazy(() => import("@/slices/documentation/pages/Documentation"));
const Ecosystem = React.lazy(() => import("@/slices/ecosystem/pages/Ecosystem"));
const NotFound = React.lazy(() => import("@/slices/error/pages/NotFound"));
const Dashboard = React.lazy(() => import("@/slices/dashboard/pages/Dashboard"));
const DevTools = React.lazy(() => import("@/slices/devtools/pages/DevTools"));
const Analytics = React.lazy(() => import("@/slices/analytics/pages/Analytics"));
const MyWidgets = React.lazy(() => import("@/slices/widgets/pages/MyWidgets"));
const WidgetStore = React.lazy(() => import("@/slices/store/pages/WidgetStore"));
const Integrations = React.lazy(() => import("@/slices/integrations/pages/Integrations"));
const Profile = React.lazy(() => import("@/slices/profile/pages/Profile"));
const Preferences = React.lazy(() => import("@/slices/preferences/pages/Preferences"));
const Support = React.lazy(() => import("@/slices/support/pages/Support"));
const WorkshopList = React.lazy(() => import("@/slices/workshops/pages/WorkshopList"));
const WorkshopDetail = React.lazy(() => import("@/slices/workshops/pages/WorkshopDetail"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserPreferencesProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <React.Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.DOCUMENTATION} element={<Documentation />} />
                <Route path={ROUTES.ECOSYSTEM} element={<Ecosystem />} />
                
                {/* Wrap all dashboard routes with DashboardProvider */}
                <Route path="/dashboard/*" element={
                  <DashboardProvider>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="analytics" element={<Analytics />} />
                      <Route path="widgets" element={<MyWidgets />} />
                      <Route path="store" element={<WidgetStore />} />
                      <Route path="integrations" element={<Integrations />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="preferences" element={<Preferences />} />
                      <Route path="support" element={<Support />} />
                      <Route path="devtools" element={<DevTools />} />
                    </Routes>
                  </DashboardProvider>
                } />
                
                {/* Workshop routes */}
                <Route path="/workshop" element={
                  <DashboardProvider>
                    <Routes>
                      <Route path="/" element={<WorkshopList />} />
                      <Route path=":id" element={<WorkshopDetail />} />
                    </Routes>
                  </DashboardProvider>
                } />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
                <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
              </Routes>
            </AnimatePresence>
          </React.Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </UserPreferencesProvider>
  </QueryClientProvider>
);

export default App;
