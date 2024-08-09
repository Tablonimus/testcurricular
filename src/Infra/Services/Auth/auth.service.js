import axios from "axios";
import {
  ApiConstants,
  ApiPaths,
} from "../../../Common/constants/api/api.constants";
import { AuthInterface } from "../../../Domain/Isvc/auth/auth.interface";

export class AuthService {
  static async login(username, password) {
    const config = AuthInterface.signInREQ(username, password);

    const apiResponse = await axios(config);

    const authResponse = AuthInterface.signInRES(apiResponse);

    if (authResponse.status === 200) {
      localStorage.setItem(
        ApiConstants.STORAGE_NAME,
        JSON.stringify({
          token: authResponse.data.token,
          refresh_token: authResponse.data.refresh_token,
        })
      );
      return authResponse;
    }
  }

  static async logout() {
    localStorage.removeItem(ApiConstants.STORAGE_NAME);
    // let response = await axios.post(`${ApiPaths.LOGIN_URL}`);
    console.log(response);
  }
}
