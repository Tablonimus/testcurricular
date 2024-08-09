import { ApiConstants } from "../../../Common/constants/api/api.constants";

export class AuthResDTO {
  constructor() {
    this.access_token = "";
    this.refresh_token = "";
    this.grant_type = ApiConstants.AUTH_GRANT_TYPE;
    this.client_secret = ApiConstants.CLIENT_SECRET;
    this.security_provider = ApiConstants.SECURITY_PROVIDER_NAME;
    this.client_id = ApiConstants.CLIENT_ID;
  }
}

export class AuthRes extends AuthResDTO {
  constructor(username, password) {
    super();
    this.username = username;
    this.password = password;
  }

}
