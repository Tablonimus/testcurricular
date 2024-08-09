export const ApiConstants = {
  BASE_URL:  "https://api-gica-dev.cunix.net/api",//http://192.168.140.66:8080/api/
  DEV_URL: "https://xjbpzj4l-9000.brs.devtunnels.ms/api",
  STORAGE_NAME: "Gica",
  SECURITY_PROVIDER_NAME: "gica_front_app",
  CLIENT_ID: "uaf_gica",
  CLIENT_SECRET: "6LeJ__wUAAAAAIK8kLmcJ47jq0Y7o5W1czIMdY3b",
  AUTH_GRANT_TYPE: "password",
  TENANT_ID: "uaf_gica", //🚨🚨🚨
};

export const ApiPaths = {
  AUTH: `${ApiConstants.BASE_URL}/auth`,
  USERS: `${ApiConstants.BASE_URL}/users`,
  GET_ROLES: `${ApiConstants.BASE_URL}/permissions/roles`,
  REPORTS: `${ApiConstants.BASE_URL}/reports`,
  PERMISSIONS_MENU: `${ApiConstants.BASE_URL}/permissions/menu`,
  ACTIVITIES: `${ApiConstants.BASE_URL}/activities`,
  PERSONS: `${ApiConstants.BASE_URL}/persons`,
  PERSONS_BY_EXCEL: `${ApiConstants.BASE_URL}/persons/create_many`,
  INSTITUTIONS: `${ApiConstants.BASE_URL}/institutions`,
  INSTITUTIONS_SECTORS: `${ApiConstants.BASE_URL}/institutions_sectors`,
  INSTITUTIONS_TYPES: `${ApiConstants.BASE_URL}/institutions_types`,
  VERSIONS: `${ApiConstants.BASE_URL}/versions`,
  PERSONS_BY_VERSION: `${ApiConstants.BASE_URL}/persons_by_version`,
  PERSON_VERSION_DETAIL: `${ApiConstants.BASE_URL}/persons_by_version/by_person`,
  COMMON_STYLES: `${ApiConstants.BASE_URL}/common/styles`,
  COMMON_LOGS: `${ApiConstants.BASE_URL}/common/logs`,
};
