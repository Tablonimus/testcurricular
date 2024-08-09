import { ActivitiesService } from "../../Services/Activities/activities.service";

export class ActivitiesAdapter {
  static async get() {
    const response = await ActivitiesService.get();
    return response;
  }

  static async getWithPagination(page, pageSize, filters) {
    const response = await ActivitiesService.getWithPagination(page, pageSize, filters);
    return response;
  }


  static async getById(idActivity) {
    const response = await ActivitiesService.getById(idActivity);
    return response;
  }
  static async createOne(activity) {
    const response = await ActivitiesService.createOne(activity);
    return response;
  }
  static async editOneById(id, activity) {
    const activityREQ = {
      id,
      code: activity.code,
      name: activity.name,
      type: activity.type,
      thematic_area: activity.thematic_area,
      presentation: activity.presentation,
      objectives: activity.objectives,
      program: activity.program
    };
    const response = await ActivitiesService.editById(id, activityREQ);
    return response;
  }
  static async deleteOneById(id) {
    const response = await ActivitiesService.deleteOneById(id);
    return response;
  }
}
