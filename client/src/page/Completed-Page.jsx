import React, {Suspense} from 'react';
import MasterLayout from "../component/masterLayout/master-layout.jsx";
import LazyLoading from "../component/loading/LazyLoading.jsx";
import CompletedTask from "../component/Task-List/Completed-Task.jsx";

const CompletedPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoading />}>
        <CompletedTask />
      </Suspense>
    </MasterLayout>
  );
};

export default CompletedPage;