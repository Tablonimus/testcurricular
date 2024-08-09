import { PermissionsService } from "../../Services/Permissions/permissions.service";

export class PermissionsAdapter {
  static async get() {
    const response = await PermissionsService.get();
    console.log(response);

    return response;
  }

  static async getById(idUser) {
    const response = await PermissionsService.getById(idUser);
    const { id, username, email, roles } = response;

    const user = { id, username, email, roles: roles[0].name };
    return user;
  }
  static async createOne(user) {
    const response = await PermissionsService.createOne(user);
    return response;
  }
  static async editOneById(id, user) {
    console.log(user);
    const userREQ = {
      id,
      username: user.username,
      email: user.email,
      roles_id: user.roles,
      password: user.password,
    };
    const response = await PermissionsService.editOneById(id, userREQ);
    return response;
  }
  static async deleteOneById(id) {
    const response = await PermissionsService.deleteOneById(id);
    return response;
  }
}
