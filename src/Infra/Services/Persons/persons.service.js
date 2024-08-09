import axios from "axios";
import { ApiPaths } from "../../../Common/constants/api/api.constants";

export class PersonsService {
  static async get() {
    const axiosResponse = await axios.get(`${ApiPaths.PERSONS}`);
    const personsArray = axiosResponse.data.data.items;
    return personsArray;
  }

  static async getWithPagination(page, pageSize, filters) {
    const axiosResponse = await axios.post(
      `${ApiPaths.PERSONS}/paginated?page=${page}&page_size=${pageSize}`,
      filters
    );
    const personsArray = axiosResponse.data.data;
    return personsArray;
  }
  static async getBinnacleWithPaginationById(page, pageSize, filters) {
    const axiosResponse = await axios.post(
      `${ApiPaths.COMMON_LOGS}/paginated?page=${page}&page_size=${pageSize}`,
      filters
    );
    const personsArray = axiosResponse.data.data;
    return personsArray;
  }

  static async getById(id) {
    const axiosResponse = await axios.get(`${ApiPaths.PERSONS}/${id}`);
    const person = axiosResponse.data.data;
    return person;
  }

  static async editById(id, data) {
    const axiosResponse = await axios.put(`${ApiPaths.PERSONS}/${id}`, data);
    const person = axiosResponse.data;
    return person;
  }

  static async createOne(data) {
    const axiosResponse = await axios.post(`${ApiPaths.PERSONS}`, data);
    const newPerson = axiosResponse.data;
    return newPerson;
  }
  static async createByExcel(data) {
    const axiosResponse = await axios.post(
      `${ApiPaths.PERSONS_BY_EXCEL}`,
      data
    );
    const newPersonsResponse = axiosResponse.data;
    return newPersonsResponse;
  }

  static async deleteOneById(id) {
    const axiosResponse = await axios.delete(`${ApiPaths.PERSONS}/${id}`);
    const deltedPerson = axiosResponse.data;
    return deltedPerson;
  }
}
