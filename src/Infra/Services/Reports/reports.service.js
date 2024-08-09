import axios from "axios";
import { ApiPaths } from "../../../Common/constants/api/api.constants";

export class ReportsService {
  static async get() {
    const axiosResponse = await axios.get(`${ApiPaths.REPORTS}`);

    const reports = axiosResponse.data.data.items

    return reports;
  }
  static async getWithPagination(page, pageSize, filters) {
    const axiosResponse = await axios.post(`${ApiPaths.REPORTS}/paginated?page=${page}&page_size=${pageSize}`, filters);

    const reports = axiosResponse.data.data

    return reports;
  }

  static async executeReport(page, pageSize, filters) {
    console.log(filters)
    const axiosResponse = await axios.post(`${ApiPaths.REPORTS}/execute?page=${page}&page_size=${pageSize}`, filters);
    const reports = axiosResponse.data.data
    return reports;
  }
  static async getById(id) {
    const axiosResponse = await axios.get(`${ApiPaths.REPORTS}/${id}`);
    const report = axiosResponse.data.data;
    return report;
  }

  static async editById(id, data) {
    const axiosResponse = await axios.put(`${ApiPaths.REPORTS}/${id}`, data);
    const report = axiosResponse.data;
    return report;
  }
  
  static async createOne(data) {
    const axiosResponse = await axios.post(`${ApiPaths.REPORTS}`, data);
    const newActivity = axiosResponse.data;
    return newActivity;
  }

  static async deleteOneById(id) {
    const axiosResponse = await axios.delete(`${ApiPaths.REPORTS}/${id}`);

    const deltedActivity = axiosResponse.data;
    return deltedActivity;
  }
}
