import React, {Suspense} from 'react';
import LazyLoading from "../component/loading/LazyLoading.jsx";
import SendOtp from "../component/Account-Recover/Send-OTP.jsx";

const ForgetPassPage = () => {
  return (
    <div>
      <Suspense fallback={<LazyLoading />}>
        <SendOtp />
      </Suspense>
    </div>
  );
};

export default ForgetPassPage;