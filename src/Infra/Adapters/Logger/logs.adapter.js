import { LogsService } from "../../Services/Logger/logs.service";

export class LogsAdapter {
  static async getBinnacleWithPaginationById(id, page, pageSize, filters) {
    try {
      // console.log(filters);

      // const response = await LogsService.getBinnacleWithPaginationById(
      //   id,
      //   page,
      //   pageSize,
      //   filters
      // );
      // console.log(response);
      let date = new Date();
      let dateString =
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2) +
        "T" +
        ("0" + date.getHours()).slice(-2) +
        "-" +
        ("0" + date.getMinutes()).slice(-2) +
        "-" +
        ("0" + date.getSeconds()).slice(-2);
      const logs = [
        {
          event: "Inicio de actividad",
          description: "Inicio de actividad 1",
          created_at:
            dateString.split("T")[0].split("-").reverse().join("/") +
            " - " +
            dateString.split("T")[1].split("-").join(":").slice(0, 5) +
            " hs",
        },
        {
          event: "Logueo",
          description: "Inicio de sesión",
          created_at:
            dateString.split("T")[0].split("-").reverse().join("/") +
            " - " +
            dateString.split("T")[1].split("-").join(":").slice(0, 5) +
            " hs",
        },
      ];

      return logs;
    } catch (error) {
      console.log(error);
    }
  }
}
