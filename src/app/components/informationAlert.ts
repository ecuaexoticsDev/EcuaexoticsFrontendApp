import Swal from 'sweetalert2';

export const SolicitarConfirmacion = (titleMessage: String) => {
  /**
   * Muestra pop up para pedir confirmación acerca de una opción por realizar
   * @param titleMessage titulo del mensaje
   * @returns confirmacion o negacion
   */

  return Swal.fire({
    title: titleMessage,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
  }).then(async (result) => {
    return result.isConfirmed;
  });
};
