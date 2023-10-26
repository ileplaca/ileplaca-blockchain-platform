import Swal from 'sweetalert2';
import { copy } from './copy';

export const successAlert = ({ title, text }: { title: string; text: string }) => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title,
    text,
    showConfirmButton: false,
    timer: 3000,
  });
};

export const alertCopy = () => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Copied!',
    showConfirmButton: false,
    timer: 600,
    backdrop: false,
    width: '30vw',
  });
};

export const handleCopyAddress = (owner_address: string) => {
  alertCopy();
  copy(owner_address);
};
