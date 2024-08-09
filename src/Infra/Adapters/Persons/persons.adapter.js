import { PersonsService } from "../../Services/Persons/persons.service";
import { utils, writeFileXLSX } from "xlsx";
import showToast from "../../Services/themeInterceptor/toast.service";

function formatPersonArrayForExcelFile(personsArray) {
  const formattedPersonsArray = personsArray.map((personObject) => {
    return {
      ID: personObject.id,
      NOMBRE: personObject.name,
      APELLIDO: personObject.last_name,
      "APELLIDO MATERNO": personObject.mother_last_name,
      SECTOR: personObject.sector,
      CORREO: personObject.email,
      CARGO: personObject.charge,
      INSTITUCION: personObject.institution_name,
      "TIPO INSTITUCION": personObject.institution_type,
      TELEFONO: personObject.phone_number,
      RUN: personObject.run,
    };
  });

  return formattedPersonsArray;
}

function formatPersonArray(personsArray) {
  const formattedPersonsArray = personsArray.map((personObject) =>
    formatPersonObject(personObject)
  );
  return formattedPersonsArray;
}

function formatPersonObject(personObject) {
  const formattedPersonObject = {
    id: personObject?.id,
    name: personObject?.name,
    last_name: personObject?.last_name,
    sector: personObject?.institution?.institution_sector_name,
    email: personObject?.email,
    charge: personObject?.charge,
    institution: personObject?.institution?.id,
    "institution.name": personObject?.institution?.name,
    institution_name: personObject?.institution?.name,
    institution_type: personObject?.institution?.institution_type_name,
    phone_number: personObject?.phone_number,
    ...personObject.dynamic_fields,
  };

  return formattedPersonObject;
}

export class PersonsAdapter {
  static async get() {
    const response = await PersonsService.get();
    const personsArray = formatPersonArray(response);
    return personsArray;
  }
  static async getWithPagination(page, pageSize, filters) {
    const response = await PersonsService.getWithPagination(
      page,
      pageSize,
      filters
    );

    const formattedData = {
      persons: formatPersonArray(response.data),
      page: response.page,
      page_size: response.page_size,
      total: response.total,
    };

    return formattedData;
  }

  static async getById(idPerson) {
    const personResponse = await PersonsService.getById(idPerson);
    const formattedPerson = formatPersonObject(personResponse);
    return formattedPerson;
  }

  static async createOne(person) {
    try {
      const personREQ = {
        name: person.name,
        last_name: person.last_name,
        email: person.email,
        charge: person.charge,
        institution: person.institution,
        phone_number: person.phone_number,
        sector: person.sector,
        dynamic_fields: {
          run: person.run,
          profile: person.profile,
          mother_last_name: person.mother_last_name,
        },
      };

      const response = await PersonsService.createOne(personREQ);
      return response;
    } catch (error) {
      console.log(error.response.data.errors);
      throw error.response.data.errors;
    }
  }

  static async createByExcel(personsArray) {
    console.log(personsArray);
    if (!personsArray.length)
      throw new Error("Archivo vacío o mal configurado");
    if (personsArray.length > 1000)
      throw new Error("El archivo no puede contener mas de 1.000 entradas");

    Object.keys(personsArray[0]).forEach((propery) => {
      if (
        ![
          "NOMBRE",
          "APELLIDO",
          "CORREO",
          "TELEFONO",
          "RUN",
          "APELLIDO MATERNO",
        ].includes(propery)
      ) {
        throw new Error(
          `Los encabezados del archivo no son correctos. El encabezado debe contener: "NOMBRE", "APELLIDO", "CORREO", "TELEFONO", "RUN", "APELLIDO MATERNO"`
        );
      }
    });

    try {
      const personsArrayREQ = personsArray.map((person) => {
        const personREQ = {
          name: person.NOMBRE || "-",
          last_name: person.APELLIDO || "-",
          email: person.CORREO || "-",
          phone_number: person.TELEFONO || "-",
          institution: null,
          charge: null,
          sector: null,
          dynamic_fields: {
            run: person.RUN,
            mother_last_name: person["APELLIDO MATERNO"],
            profile: "Invitado",
          },
        };

        return personREQ;
      });

      const response = await PersonsService.createByExcel(personsArrayREQ);

      return response;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.errors);
      throw error.response.data.errors;
    }
  }

  static async editOneById(id, person) {
    console.log(person);
    const personREQ = {
      name: person.name,
      last_name: person.last_name,
      email: person.email,
      charge: person.charge,
      institution: person.institution,
      phone_number: person.phone_number,
      sector: person.sector,
      dynamic_fields: {
        entity_rut: person.entity_rut,
        run: person.run,
        institution_type: person.institution_type,
        profile: person.profile,
      },
    };
    const response = await PersonsService.editById(id, personREQ);
    return response;
  }

  static async deleteOneById(id) {
    const response = await PersonsService.deleteOneById(id);
    return response;
  }

  static async createExcel() {
    const response = await this.get();
    const persons = formatPersonArrayForExcelFile(response);
    const ws = utils.json_to_sheet(persons);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "Listado de personas.xlsx");
  }
  static async createDefaultPersonsUploadExcel() {
    const defaultHeaders = [
      {
        NOMBRE: "-",
        APELLIDO: "-",
        "APELLIDO MATERNO": "-",
        CORREO: "-",
        TELEFONO: "-",
        RUN: "-",
      },
    ];

    const ws = utils.json_to_sheet(defaultHeaders);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "Modelo de lista.xlsx");
  }
}
