import axios from "axios";
import { ApiPaths } from "../../../Common/constants/api/api.constants";

export class ActivitiesService {
  static async get() {
    const axiosResponse = await axios.get(`${ApiPaths.ACTIVITIES}`);

    const activities = axiosResponse.data.data.items

    return activities;
  }
  static async getWithPagination(page, pageSize, filters) {
    const axiosResponse = await axios.post(`${ApiPaths.ACTIVITIES}/paginated?page=${page}&page_size=${pageSize}`, filters);

    const activities = axiosResponse.data.data

    return activities;
  }
  static async getById(id) {
    const axiosResponse = await axios.get(`${ApiPaths.ACTIVITIES}/${id}`);
    const activity = axiosResponse.data.data;
    return activity;
  }

  static async editById(id, data) {
    const axiosResponse = await axios.put(`${ApiPaths.ACTIVITIES}/${id}`, data);
    const activity = axiosResponse.data;
    return activity;
  }
  
  static async createOne(data) {
    const axiosResponse = await axios.post(`${ApiPaths.ACTIVITIES}`, data);
    const newActivity = axiosResponse.data;
    return newActivity;
  }

  static async deleteOneById(id) {
    const axiosResponse = await axios.delete(`${ApiPaths.ACTIVITIES}/${id}`);

    const deltedActivity = axiosResponse.data;
    return deltedActivity;
  }
}
