import React from 'react';

const LazyLoading = () => {
  return (
    <div>
      <div className="LoadingOverLay hidden">
        <div className="Line-Progress">
          <div className="indeterminate"></div>
        </div>
      </div>
    </div>
  );
};

export default LazyLoading;