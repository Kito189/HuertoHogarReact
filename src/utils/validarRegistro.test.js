import { describe, it, expect } from "vitest";
import { validarRegistro } from "./validarRegistro";

describe("Pruebas para validarRegistro", () => {

  it("Debe validar correctamente el nombre", () => {
    const result = validarRegistro("", "a@b.com", "1234");
    expect(result.nombre).toBe("El nombre debe tener al menos 2 caracteres");
  });

  it("Debe validar el correo", () => {
    const result = validarRegistro("Juan", "correo.com", "1234");
    expect(result.correo).toBe("El correo no es válido");
  });

  it("Debe validar la contraseña", () => {
    const result = validarRegistro("Juan", "a@b.com", "12");
    expect(result.contrasena).toBe("La contraseña debe tener mínimo 4 caracteres");
  });

  it("Debe devolver objeto vacío si todo es válido", () => {
    const result = validarRegistro("Juan", "a@b.com", "1234");
    expect(result).toEqual({});
  });

});
