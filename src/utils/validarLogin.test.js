import { describe, it, expect } from "vitest";
import { validarLogin } from "./validarLogin";

describe("Pruebas para validarLogin", () => {

  it("Debe devolver error si el correo está vacío", () => {
    const result = validarLogin("", "1234");
    expect(result.correo).toBe("El correo no es válido");
  });

  it("Debe devolver error si el correo no tiene @", () => {
    const result = validarLogin("correo.com", "1234");
    expect(result.correo).toBe("El correo no es válido");
  });

  it("Debe devolver error si la contraseña es muy corta", () => {
    const result = validarLogin("test@mail.com", "12");
    expect(result.contrasena).toBe("La contraseña debe tener mínimo 4 caracteres");
  });

  it("Debe devolver un objeto vacío si todo es válido", () => {
    const result = validarLogin("test@mail.com", "1234");
    expect(result).toEqual({});
  });

});
