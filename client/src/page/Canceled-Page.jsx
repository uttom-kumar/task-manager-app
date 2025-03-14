import React, {Suspense} from 'react';
import MasterLayout from "../component/masterLayout/master-layout.jsx";
import LazyLoading from "../component/loading/LazyLoading.jsx";
import CanceledTask from "../component/Task-List/Canceled-Task.jsx";

const CanceledPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoading />}>
        <CanceledTask />
      </Suspense>
    </MasterLayout>
  );
};

export default CanceledPage;