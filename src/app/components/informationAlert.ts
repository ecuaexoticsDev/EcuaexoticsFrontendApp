import Swal from "sweetalert2";

/**
 * Muestra pop up para pedir confirmación acerca de una opción por realizar con un título personalizado
 * @param {String} titleMessage - El título del mensaje del cuadro del pop up.
 * @returns {Promise<Boolean>} - Una promesa que se resuelve en `true` si el usuario confirma, o en `false` si el usuario cancela.
 */
export const SolicitarConfirmacion = (titleMessage: String) => {
  return Swal.fire({
    title: titleMessage,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then(async (result) => {
    return result.isConfirmed;
  });
};
