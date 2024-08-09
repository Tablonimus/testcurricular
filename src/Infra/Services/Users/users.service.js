import axios from "axios";
import { ApiPaths } from "../../../Common/constants/api/api.constants";

export class UsersService {
  static async createOne(data) {
    const axiosResponse = await axios.post(`${ApiPaths.USERS}`, data);
    return axiosResponse;
  }

  static async get() {
    //.search() x .get() 🚨🛑
    const axiosResponse = await axios.get(`${ApiPaths.USERS}`);
    return axiosResponse.data.data.items;
  }

  static async getById(id) {
    const axiosResponse = await axios.get(`${ApiPaths.USERS}/${id}`);
    const user = axiosResponse.data.data;
    return user;
  }

  static async editOneById(id, data) {
    const axiosResponse = await axios.put(`${ApiPaths.USERS}/${id}`, data);
    return axiosResponse;
  }

  static async deleteOneById(id) {
    const axiosResponse = await axios.delete(`${ApiPaths.USERS}/${id}`);
    return axiosResponse;
  }
}
