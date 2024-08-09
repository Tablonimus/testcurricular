import { ApiConstants } from "../../../Common/constants/api/api.constants";

export class AuthReqDTO {
  constructor() {
    this.username = "-";
    this.password = "-";
    this.grant_type = ApiConstants.AUTH_GRANT_TYPE;
    this.client_secret = ApiConstants.CLIENT_SECRET;
    this.security_provider = ApiConstants.SECURITY_PROVIDER_NAME;
    this.client_id = ApiConstants.CLIENT_ID;
  }
}

export class AuthReq extends AuthReqDTO {
  constructor(username, password) {
    super();
    this.username = username;
    this.password = password;
  }

}

