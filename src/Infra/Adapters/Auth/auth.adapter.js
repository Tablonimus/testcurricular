import { AuthService } from "../../Services/Auth/auth.service";

export class AuthAdapter {
  static async authenticate(user, password) {
    try {
      const response = await AuthService.login(user, password);
      return response;
    } catch (error) {
      throw (
        [
          error.response?.data?.message === "Invalid username or password" &&
            "Credenciales incorrectas.",
        ] || ["Error no manejado, contactese con soporte."]
      );
    }
  }
}
