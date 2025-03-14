import React, {Suspense} from 'react';
import MasterLayout from "../component/masterLayout/master-layout.jsx";
import LazyLoading from "../component/loading/LazyLoading.jsx";
import Dashboard from "../component/dashboard/dashboard.jsx";

const DashboardPage = () => {
  return (
    <MasterLayout>
        <Suspense fallback={<LazyLoading />}>
          <Dashboard />
        </Suspense>
    </MasterLayout>
  );
};

export default DashboardPage;