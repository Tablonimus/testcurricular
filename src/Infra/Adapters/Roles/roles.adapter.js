import { RolesService } from "../../Services/Roles/roles.service";
import { PermissionsAdapter } from "../Permissions/permissions.adapter";

export class RolesAdapter {
  static async getRoles() {
    const response = await RolesService.getRoles();
    return response;
  }

  static async getRoleById(id) {
    const response = await RolesService.getRoleById(id);

    return response;
  }
  static async editRoleById(id, data) {
    const response = await RolesService.editRoleById(id, data);
    return response;
  }
  static async editRoleAndPermissionsView(id) {
    try {
      const permissions = await PermissionsAdapter.get();

      const role = await this.getRoleById(id);

      return { permissions, role };
    } catch (error) {
      console.log(error);
      throw "Ha ocurrido un error al buscar permisos y roles";
    }
  }
  
  static async createOne(data) {
    try {
      const response = await RolesService.createOne(data);
      return response;
    } catch (error) {
      throw error.response.data.errors;//{permissions:["",""]}
    }
  }

  static async deleteOneById(id) {
    try {
      const response = await RolesService.deleteOneById(id);
      return response;
    } catch (error) {
      throw error.response.data.errors;
    }
  }
}
