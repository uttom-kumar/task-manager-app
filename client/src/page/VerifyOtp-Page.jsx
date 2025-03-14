import React, {Suspense} from 'react';
import LazyLoading from "../component/loading/LazyLoading.jsx";
import VerifyOtp from "../component/Account-Recover/Verify-OTP.jsx";

const VerifyOtpPage = () => {
  return (
    <div>
      <Suspense fallback={<LazyLoading />}>
        <VerifyOtp />
      </Suspense>
    </div>
  );
};

export default VerifyOtpPage;