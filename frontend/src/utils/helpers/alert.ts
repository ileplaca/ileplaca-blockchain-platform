import Swal from "sweetalert2"

export const successAlert = ({title, text}: { title: string, text: string }) => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title,
    text,
    showConfirmButton: false,
    timer: 3000,
  })
}