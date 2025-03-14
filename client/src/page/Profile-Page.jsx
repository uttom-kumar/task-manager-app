import React, {Suspense} from 'react';
import LazyLoading from "../component/loading/LazyLoading.jsx";
import MasterLayout from "../component/masterLayout/master-layout.jsx";
import ProfileDetails from "../component/profile/Profile-details.jsx";

const ProfilePage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoading />}>
          <ProfileDetails />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ProfilePage;