import axios from "axios";
import { ApiPaths } from "../../../Common/constants/api/api.constants";

export class InstitutionsService {
  static async get() {
    const axiosResponse = await axios.get(`${ApiPaths.INSTITUTIONS}`);
    const institutions = axiosResponse.data.data.items;
    return institutions;
  }

  static async getWithPagination(page, pageSize, filters) {
    const axiosResponse = await axios.post(
      `${ApiPaths.INSTITUTIONS}/paginated?page=${page}&page_size=${pageSize}`,
      filters
    );

    const institutions = axiosResponse.data.data;
    return institutions;
  }

  static async getById(id) {
    const axiosResponse = await axios.get(`${ApiPaths.INSTITUTIONS}/${id}`);
    const institution = axiosResponse.data.data;
    return institution;
  }

  static async editById(id, data) {
    const axiosResponse = await axios.put(
      `${ApiPaths.INSTITUTIONS}/${id}`,
      data
    );
    const institution = axiosResponse.data;
    return institution;
  }

  static async createOne(data) {
    const axiosResponse = await axios.post(`${ApiPaths.INSTITUTIONS}`, data);
    const newInstitution = axiosResponse.data;
    return newInstitution;
  }

  static async deleteOneById(id) {
    const axiosResponse = await axios.delete(`${ApiPaths.INSTITUTIONS}/${id}`);
    const deltedInstitution = axiosResponse.data;
    return deltedInstitution;
  }

  /* HELPER SERVICE */

  static async getInstitutionsSectors() {
    const axiosResponse = await axios.get(`${ApiPaths.INSTITUTIONS_SECTORS}`);
    const institutionsSectors = axiosResponse.data.data.items;
    return institutionsSectors;
  }

  static async getInstitutionsTypes() {
    const axiosResponse = await axios.get(`${ApiPaths.INSTITUTIONS_TYPES}`);
    const institutionsTypes = axiosResponse.data.data.items;
    return institutionsTypes;
  }
}
