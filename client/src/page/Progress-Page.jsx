import React, {Suspense} from 'react';
import MasterLayout from "../component/masterLayout/master-layout.jsx";
import LazyLoading from "../component/loading/LazyLoading.jsx";
import ProgressTask from "../component/Task-List/Progress-Task.jsx";

const ProgressPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoading />}>
        <ProgressTask />
      </Suspense>
    </MasterLayout>
  );
};

export default ProgressPage;