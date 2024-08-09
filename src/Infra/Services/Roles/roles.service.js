import axios from "axios";
import { ApiPaths } from "../../../Common/constants/api/api.constants";

export class RolesService {
  static async getRoles() {
    const axiosResponse = await axios.get(`${ApiPaths.GET_ROLES}`);

    const roles = axiosResponse.data.data.items.map((role) => {
      const { id, name, description } = role;
      return {
        id,
        name,
        description,
      };
    });

    return roles;
  }

  static async getRoleById(id) {
    const axiosResponse = await axios.get(`${ApiPaths.GET_ROLES}/${id}`);
    const role = axiosResponse.data.data;
    return role;
  }

  static async editRoleById(id, data) {
    const axiosResponse = await axios.put(`${ApiPaths.GET_ROLES}/${id}`, data);
    const role = axiosResponse.data;
    return role;
  }
  
  static async createOne(data) {
    const axiosResponse = await axios.post(`${ApiPaths.GET_ROLES}`, data);
    const newRole = axiosResponse.data;
    return newRole;
  }

  static async deleteOneById(id) {
    const axiosResponse = await axios.delete(`${ApiPaths.GET_ROLES}/${id}`);

    const deltedRole = axiosResponse.data;
    return deltedRole;
  }
}
