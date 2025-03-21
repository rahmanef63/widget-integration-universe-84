
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { UserPreferencesProvider } from "@/shared/store/user-preferences.context";
import { ROUTES } from "@/core/constants/routes";

// Lazy load pages for better performance
import React from "react";
const Home = React.lazy(() => import("@/slices/home/pages/Home"));
const Documentation = React.lazy(() => import("@/slices/documentation/pages/Documentation"));
const Ecosystem = React.lazy(() => import("@/slices/ecosystem/pages/Ecosystem"));
const NotFound = React.lazy(() => import("@/slices/error/pages/NotFound"));

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
                <Route path="/index" element={<Navigate to={ROUTES.HOME} replace />} />
                <Route path="index" element={<Navigate to={ROUTES.HOME} replace />} />
                <Route path={ROUTES.DOCUMENTATION} element={<Documentation />} />
                <Route path={ROUTES.ECOSYSTEM} element={<Ecosystem />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
                <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
              </Routes>
            </AnimatePresence>
          </React.Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </UserPreferencesProvider>
  </QueryClientProvider>
);

export default App;
