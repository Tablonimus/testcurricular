import { VersionsService } from "../../Services/Versions/versions.service";

export class VersionsAdapter {
  static async get() {
    const institutionsResponse = await VersionsService.get();

    const institutionsFormattedArray = institutionsResponse.map(
      (institution) => {
        return { ...institution, milaft: institution.milaft ? "Si" : "No" };
      }
    );

    return institutionsFormattedArray;
  }

  static async getWithPagination(page, pageSize, filters) {
    const response = await VersionsService.getWithPagination(
      page,
      pageSize,
      filters
    );
    return response;
  }

  static async getById(idInstitution) {
    const response = await VersionsService.getById(idInstitution);
    return response;
  }

  static async getPersonByVersionDetail(idPerson) {
    const versionsResponse =
      await VersionsService.getPersonByVersionDetail(idPerson);

    const formattedVersions = versionsResponse.map((version) => {
      return {
        activity_code: version.version.activity.code,
        activity_name: version.version.activity.name,
        activity_thematic_area: version.version.activity.thematic_area,
        person: version.person,
        in_wait_list: version.in_wait_list ? "En espera" : "En proceso",
        qualification: version.qualification || 10,
        attendance: version.attendance || "20%",
        course_start_date: version.version.course_start_date
          .split("T")[0]
          .split("-")
          .reverse()
          .join("/"),
        course_end_date: version.version.course_end_date
          .split("T")[0]
          .split("-")
          .reverse()
          .join("/"),
      };
    });

    return formattedVersions;
  }

  static async createOne(institution) {
    try {
      const response = await VersionsService.createOne(institution);
      return response;
    } catch (error) {
      console.log(error.response.data.errors);
      throw error.response.data.errors;
    }
  }

  static async editOneById(id, institution) {
    const institutionREQ = {
      id,
      code: institution.code,
      name: institution.name,
      type: institution.type,
      thematic_area: institution.thematic_area,
      presentation: institution.presentation,
      objectives: institution.objectives,
      program: institution.program,
    };
    const response = await VersionsService.editById(id, institutionREQ);
    return response;
  }

  static async deleteOneById(id) {
    const response = await VersionsService.deleteOneById(id);
    return response;
  }
}
