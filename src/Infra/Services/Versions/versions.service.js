import axios from "axios";
import { ApiPaths } from "../../../Common/constants/api/api.constants";

export class VersionsService {
  static async get() {
    const axiosResponse = await axios.get(`${ApiPaths.VERSIONS}`);
    const versions = axiosResponse.data.data.items;
    return versions;
  }

  static async getWithPagination(page, pageSize, filters) {
    const axiosResponse = await axios.post(
      `${ApiPaths.VERSIONS}/paginated?page=${page}&page_size=${pageSize}`,
      filters
    );
    const versions = axiosResponse.data.data;
    return versions;
  }

  static async getPersonByVersionDetail(id) {
    const axiosResponse = await axios.get(
      `${ApiPaths.PERSON_VERSION_DETAIL}/${id}`
    );
    const version = axiosResponse.data.data.items;
    return version;
  }

  static async editById(id, data) {
    const axiosResponse = await axios.put(`${ApiPaths.VERSIONS}/${id}`, data);
    const version = axiosResponse.data;
    return version;
  }

  static async createOne(data) {
    const axiosResponse = await axios.post(`${ApiPaths.VERSIONS}`, data);
    const newVersion = axiosResponse.data;
    return newVersion;
  }

  static async deleteOneById(id) {
    const axiosResponse = await axios.delete(`${ApiPaths.VERSIONS}/${id}`);
    const deltedVersion = axiosResponse.data;
    return deltedVersion;
  }

  /*  */
}
