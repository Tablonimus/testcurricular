import { UsersService } from "../../Services/Users/users.service";

export class UsersAdapter {
  static async get() {
    const response = await UsersService.get();

    const users = response.map((user, index) => {
      const { id, username, email, roles } = user;
      return {
        id,
        exampleID: index + 1,
        username,
        email,
        Name: user.Name || "Nombre",
        LastName: user.LastName || "Ejemplo " + (index + 1),
        Role: roles[0]?.name || "Sin rol", //[1,2] <=> []
        Identificador: user.Identificador || "Identificador",
        Status: user.is_active ? "Activo" : "Inactivo", //is_Active?
      };
    });

    return users;
  }

  static async getById(idUser) {
    const response = await UsersService.getById(idUser);
    const { id, username, email, roles } = response;

    const user = { id, username, email, roles: roles[0]?.name };
    return user;
  }
  static async createOne(user) {
    try {
      const response = await UsersService.createOne(user);
      return response;
    } catch (error) {
      throw error.response.data.errors;
    }
  }

  static async editOneById(id, user) {
    try {
      const userREQ = {
        id,
        username: user.username,
        email: user.email,
        roles_id: user.roles,
        password: user.password,
      };
      const response = await UsersService.editOneById(id, userREQ);
      return response;
    } catch (error) {
      throw error.response.data.errors;
    }
  }
  static async deleteOneById(id) {
    const response = await UsersService.deleteOneById(id);
    return response;
  }
}
