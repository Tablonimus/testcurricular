import { InstitutionsService } from "../../Services/Institutions/institutions.service";

export class InstitutionsAdapter {
  static async get() {
    const institutionsResponse = await InstitutionsService.get();

    const institutionsFormattedArray = institutionsResponse.map(
      (institution) => {
        return { ...institution, milaft: institution.milaft ? "Si" : "No" };
      }
    );

    return institutionsFormattedArray;
  }

  static async getWithPagination(page, pageSize, filters) {
    const response = await InstitutionsService.getWithPagination(
      page,
      pageSize,
      filters
    );

    const formatInstitutionArray = response.data.map((institution) => {
      return { ...institution, milaft: institution.milaft ? "Si" : "No" };
    });

    const formattedData = {
      institutions: formatInstitutionArray,
      page: response.page,
      page_size: response.page_size,
      total: response.total,
    };

    return formattedData;
  }

  static async getById(idInstitution) {
    const response = await InstitutionsService.getById(idInstitution);
    console.log(response);
    return response;
  }

  static async createOne(institution) {
    try {
      const response = await InstitutionsService.createOne(institution);
      return response;
    } catch (error) {
      console.log(error.response.data.errors);
      throw error.response.data.errors;
    }
  }

  static async editOneById(id, institution) {
    try {
      const institutionREQ = {
        id,
        doc_number: institution.doc_number,
        name: institution.name,
        institution_type: institution.institution_type,
        institution_sector: institution.institution_sector,
        milaft: institution.milaft,
        email: institution.email,
      };
      const response = await InstitutionsService.editById(id, institutionREQ);
      return response;
    } catch (error) {
      throw error.response.data.errors;
    }
  }

  static async deleteOneById(id) {
    const response = await InstitutionsService.deleteOneById(id);
    return response;
  }

  /* HELPER ADAPTER */
  static async getInstitutionsSectors() {
    const institutionsSectorsResponse =
      await InstitutionsService.getInstitutionsSectors();

    return institutionsSectorsResponse;
  }
  static async getInstitutionsTypes() {
    const institutionsTypesResponse =
      await InstitutionsService.getInstitutionsTypes();

    return institutionsTypesResponse;
  }
  static async getInstitutionsMenu() {
    const institutionSectors = await this.getInstitutionsSectors();
    const institutionTypes = await this.getInstitutionsTypes();
    console.log({ institutionSectors, institutionTypes });
    return { institutionSectors, institutionTypes };
  }
}
