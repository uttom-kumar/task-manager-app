import React, {Suspense} from 'react';
import MasterLayout from "../component/masterLayout/master-layout.jsx";
import LazyLoading from "../component/loading/LazyLoading.jsx";
import NewTask from "../component/Task-List/New-Task.jsx";

const NewPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoading />}>
        <NewTask />
      </Suspense>
    </MasterLayout>
  );
};

export default NewPage;