import {configureStore} from "@reduxjs/toolkit";
import settingsReducer from "../state-slice/settings-slice.js";
import taskReducer from "../state-slice/task-slice.js";
import summaryReducer from "../state-slice/summary-slice.js";
import ProfileReducer from "../state-slice/profile-slice.js";


export default configureStore({
  reducer: {
    settings : settingsReducer,
    task: taskReducer,
    summary : summaryReducer,
    profile: ProfileReducer,
  }
})

