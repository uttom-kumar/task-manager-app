import React, {Suspense} from 'react';
import MasterLayout from "../component/masterLayout/master-layout.jsx";
import CreateTask from "../component/create-task/Create-Task.jsx";
import LazyLoading from "../component/loading/LazyLoading.jsx";

const CreatePage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoading />}>
        <CreateTask />
      </Suspense>
    </MasterLayout>
  );
};

export default CreatePage;