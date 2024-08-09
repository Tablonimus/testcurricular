import axios from "axios";
import { ApiConstants } from "../../../Common/constants/api/api.constants.js";
import showToast from "../themeInterceptor/toast.service.js";


const AxiosInterseptor = () => {
  console.log("Intercepting axios service...");
  // axios.interceptors.request.use(
  //   (req) => {
  //     if (req.url?.includes("auth") || req.url?.includes("refresh")) {
  //       setHeaderNotSecure(req);
  //     } else {
  //       setHeader(req);
  //     }
  //     return req;
  //   },
  //   (error) => Promise.reject(error)
  // );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      /* Si se desea ver el error sin enmascarar, descomenta la siguiente linea */
      /* console.log(error) */
      // const axiosErr = error; //as AxiosError;
      /* ------------------------------------------------ */
      const customError = getError(error);
      console.log("ERROR CONTRA EL SERVIDOR => ", customError);

      /* CASO PARA REDIRIGIR AL LOGIN SI NO EXISTEN CREDENCIALES. */
      // if ([401, 403, 405].includes(customError.status)) {
      //   if (!window.location.href.includes("/auth/sign-in")) {
      //     window.location.href = "/auth/sign-in";
      //   }
      // }
      /* -------------------------------------------------------- */

      // if ([400, 401].includes(customError.status)) {
      //   // alert(customError.message);
      //   showToast(customError.message, "danger", 5000);
      // }

      if ([500].includes(customError.status)) {
        // alert(customError.message);
        showToast(customError.message, "danger", 5000);
      }

      // return Promise.reject(customError);
      // return error;
      throw error;
    }
  );
};

const setHeaderNotSecure = (req) => {
  req.headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, Content-Type, Authorization, X-Auth-Token",
    security_provider: ApiConstants.SECURITY_PROVIDER_NAME,
  };
};

const setHeader = (req) => {
  const currentLogin = JSON.parse(
    localStorage.getItem(ApiConstants.STORAGE_NAME)
  ); //📛MAKE A STORAGE HANDLER

  if (currentLogin) {
    req.headers = {
      Authorization: `Bearer ${currentLogin.access_token}`, //
      "Content-Type": "application/json",
      security_provider: ApiConstants.SECURITY_PROVIDER_NAME,
    };
  }
};

const getError = (err) => {
  const status = err.request.status;
  const customError = {
    status: status || 501, // Default to InternalServerError
    severity: "error",
    message: getErrorMessage(err, status || 501) /* --📛 new param */,
    originalErrorState: err,
  };
  return customError;
};

const getErrorMessage = (err, status) => {
  let message = "";
  // console.log(err); //DEBUG
  // console.log(status); //DEBUG
  if (!status) {
    message =
      "Se produjo un erro no manejado por favor comuníquese con el administrador. - UNHANDLED REJECT.";
    return message;
  }

  switch (status) {
    case 500:
      message = "Error en el servidor";
      break;
    case 503:
      message =
        "El servidor de recursos se encuentra temporalmente ocupado. Vuelva a intentarlo mas tarde";
      break;
    case 401:
      message =
        "No está autorizado para realizar esta acción. Intente iniciar sesion nuevamente, si el problema persiste, por favor comuníquese con el administrador";
      break;
    case 501:
      message = "Error 501 : Network Error";
      break;
    // ... Add more cases for other error codes
    default:
      message = err.message || "Ha ocurrido un error.";
  }

  if (err.response && err.response.data?.Error) {
    message += `\n ${err.response.data.Error?.Message}`;
  }

  return message;
};

export default AxiosInterseptor;
