import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const base = Swal.mixin({
  confirmButtonColor: '#2563eb',
  cancelButtonColor: '#94a3b8',
  reverseButtons: true,
});

export const swal = {
  error: (message, title = 'Erro') =>
    base.fire({ icon: 'error', title, text: message }),

  success: (message, title = 'Sucesso!') =>
    base.fire({ icon: 'success', title, text: message }),

  successToast: (message) =>
    base.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    }),

  errorToast: (message) =>
    base.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
    }),

  confirm: (title, text = '', { confirmText = 'Confirmar', danger = false } = {}) =>
    base.fire({
      icon: 'warning',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: danger ? '#dc2626' : '#2563eb',
    }),
};
