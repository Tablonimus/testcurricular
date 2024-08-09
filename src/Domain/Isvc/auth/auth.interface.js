import { ApiPaths } from "@/Common/constants/api/api.constants";
import { AuthReqDTO, AuthReq } from "../../DTO/auth/AuthReqDTO";
import { validateInterface } from "../interfaceValidator";

export class AuthInterface {
  static signInREQ(username, password) {

    const payload = new AuthReq(username, password);
    const authDTO = new AuthReqDTO();

    validateInterface(payload, authDTO); //????????????

    const requestConfig = {
      method: "POST",
      url: ApiPaths.AUTH,
      data: payload,
    };

    return requestConfig;
  }

  static signInRES(apiResponse) {
    const { status, data } = apiResponse; //destructuring, preg marce

    return {
      status,
      data,
    };
  }
}
