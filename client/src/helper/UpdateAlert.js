import Swal from 'sweetalert2'
import {TaskUpdateStatusRequest} from "../Api Fetch/AllAPIRequest.js";

export function UpdateStatusAlert (id , status) {
  return Swal.fire({
    title: 'Change Status',
    input: "select",
    inputOptions: {New: "New", Completed: "Completed", Progress: "Progress", Canceled: "Canceled"},
    inputValue: status,
  }).then((result) => {
    return TaskUpdateStatusRequest(id, result.value).then((res) => {
      return res;
    })
  })
}