import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CommissionCalculator from "@/pages/commission-calculator";

function Router() {
  return (
    <Switch>
      <Route path="/" component={CommissionCalculator} />
      <Route path="/calculator" component={CommissionCalculator} />
      <Route component={CommissionCalculator} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
