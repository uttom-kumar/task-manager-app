import React, {Suspense} from 'react';
import CreatePassword from "../component/Account-Recover/Create-Password.jsx";
import LazyLoading from "../component/loading/LazyLoading.jsx";

const ResetPasswordPage = () => {
  return (
    <div>
      <Suspense fallback={<LazyLoading />}>
        <CreatePassword />
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;