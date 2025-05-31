import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import DashboardOverview from "pages/dashboard-overview";
import TaskGroupsManagement from "pages/task-groups-management";
import TaskDetailView from "pages/task-detail-view";
import SearchAndFilterInterface from "pages/search-and-filter-interface";
import SettingsAndPreferences from "pages/settings-and-preferences";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/dashboard-overview" element={<DashboardOverview />} />
          <Route path="/task-groups-management" element={<TaskGroupsManagement />} />
          <Route path="/task-detail-view" element={<TaskDetailView />} />
          <Route path="/search-and-filter-interface" element={<SearchAndFilterInterface />} />
          <Route path="/settings-and-preferences" element={<SettingsAndPreferences />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;