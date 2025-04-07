import React, {Suspense} from 'react';
import LazyLoading from "../component/loading/LazyLoading.jsx";
import EmailVerify from "../component/user-form/EmailVerify.jsx";

const VerifyEmailPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoading />}>
                <EmailVerify />
            </Suspense>
        </div>
    );
};

export default VerifyEmailPage;