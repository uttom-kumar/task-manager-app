import React, {useEffect} from 'react';
import {SummaryRequest} from "../../Api Fetch/AllAPIRequest.js";
import {useSelector} from "react-redux";

const Dashboard = () => {
  const SummaryList = useSelector((state) => state.summary.value)

  useEffect(() => {
    (async () => {
      await SummaryRequest()
    })()
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-3">
        {
          SummaryList?.map((item,i) => {
            return (
              <div key={i}>
                <div className="bg-white p-5 rounded shadow-md cursor-pointer">
                  <div>
                    <h5 className="text-[1.5rem] font-semibold">Total {item?._id}</h5>
                    <h6>{item?.sum}</h6>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Dashboard;