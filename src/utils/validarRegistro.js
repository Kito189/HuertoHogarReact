export function validarRegistro(nombre, correo, contrasena) {
  const errores = {};

  if (!nombre || nombre.length < 2) {
    errores.nombre = "El nombre debe tener al menos 2 caracteres";
  }

  if (!correo || !correo.includes("@")) {
    errores.correo = "El correo no es válido";
  }

  if (!contrasena || contrasena.length < 4) {
    errores.contrasena = "La contraseña debe tener mínimo 4 caracteres";
  }

  return errores;
}
