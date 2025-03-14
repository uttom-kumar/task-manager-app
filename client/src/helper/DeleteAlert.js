import Swal from "sweetalert2";
import {TaskDeleteRequest} from "../Api Fetch/AllAPIRequest.js";

export function DeleteAlert(id) {
  return Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      return TaskDeleteRequest(id).then((deleteResult) => {
        return deleteResult;
      })
    }
  })
}