import axios from "axios";
import { ApiPaths } from "../../../Common/constants/api/api.constants";

export class LogsService {
  static async getBinnacleWithPaginationById(id, page, pageSize, filters) {
    const axiosResponse = await axios.get(
      `${ApiPaths.COMMON_LOGS}`
    );
    

    const logs = axiosResponse.data.data;
  
    return logs;
  }
}
