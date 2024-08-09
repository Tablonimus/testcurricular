import axios from "axios";
import { ApiPaths } from "../../../Common/constants/api/api.constants";

export class PermissionsService {
  static async createOne(data) {
    const axiosResponse = await axios.post(
      `${ApiPaths.PERMISSIONS_MENU}`,
      data
    );
    console.log(axiosResponse);
    return axiosResponse;
  }

  static async get() {
    //.search() x .get() 🚨🛑
    const axiosResponse = await axios.get(`${ApiPaths.PERMISSIONS_MENU}`);
    console.log(axiosResponse.data.data.items);
    return axiosResponse.data.data.items;
  }

  static async getById(id) {
    console.log(id);
    const axiosResponse = await axios.get(`${ApiPaths.PERMISSIONS_MENU}/${id}`);

    const user = axiosResponse.data.data;
    return user;
  }

  static async editOneById(id, data) {
    const axiosResponse = await axios.put(
      `${ApiPaths.PERMISSIONS_MENU}/${id}`,
      data
    );
    console.log(axiosResponse);
    return axiosResponse;
  }

  static async deleteOneById(id) {
    const axiosResponse = await axios.delete(
      `${ApiPaths.PERMISSIONS_MENU}/${id}`
    );
    return axiosResponse;
  }
}
