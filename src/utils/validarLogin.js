export function validarLogin(correo, contrasena) {
  const errores = {};

  if (!correo || !correo.includes("@")) {
    errores.correo = "El correo no es válido";
  }

  if (!contrasena || contrasena.length < 4) {
    errores.contrasena = "La contraseña debe tener mínimo 4 caracteres";
  }

  return errores;
}
