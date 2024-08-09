import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import dinamicImages from "../../../data/dinamic-images-victorious";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginInputValidator } from "../../../Common/Helpers/Validators/input.validators";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import { AuthAdapter } from "../../../Infra/Adapters/Auth/auth.adapter";
import { jwtDecode } from "jwt-decode";

export function SignIn() {
  const navigate = useNavigate();
  const [isCheckedTyC, setIsCheckedTyC] = useState(true);
  const [input, setInput] = useState(defaultInputValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ message: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResults = loginInputValidator(
      input.user,
      input.password,
      isCheckedTyC
    );

    setError(validationResults.error);
    let isValidated = validationResults.isValidated;
    if (isValidated) {
      try {
        setIsLoading(true);
        const authResponse = await AuthAdapter.authenticate(
          input.user,
          input.password
        );

        if (authResponse) {
          const token = authResponse?.data?.data?.token;
          const decoded = jwtDecode(token);
          localStorage.setItem("loggedUser", JSON.stringify(decoded));
          navigate("/dashboard/inicio");
        } else {
          setError({
            ...error,
            message: ["Usuario y/o contraseña incorrectos."],
          });
        }
        setIsLoading(false);
      } catch (errorResponse) {
        // /* enviar el error al handler */
        console.log("ERROR RESPONSE DEL SIGNIN.JSX=> ", errorResponse);
        setError({ ...error, message: errorResponse });
        setIsLoading(false);
      }
    }
  };



  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <section className="h-screen flex  flex-col gap-4 justify-between bg-[#dedede]">
      {isLoading && <SpinnerLoader />}
      <header className="flex justify-center bg-white py-4">
        <img
          src={dinamicImages.loginHeader.img}
          style={dinamicImages.loginHeader.styles.size}
          alt=""
        />
      </header>
      <section className="flex justify-center ">
        <Card shadow={true} className={"flex flex-col p-4"}>
          <form className=" mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <div className="flex flex-col ">
                <Typography variant="h6" color="blue-gray" className="mb-1">
                  Nombre de usuario
                </Typography>
                <Input
                  error={!!error?.user}
                  onChange={(e) => handleInput(e)}
                  name="user"
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {error?.user && (
                  <span className="text-[0.8rem] text-red-500">
                    {error.user}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <Typography variant="h6" color="blue-gray" className="mb-1">
                  Contraseña
                </Typography>
                <Input
                  error={!!error?.password}
                  onChange={(e) => handleInput(e)}
                  name="password"
                  type="password"
                  size="lg"
                  placeholder="********"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {error?.password && (
                  <span className="text-[0.8rem] text-red-500">
                    {error.password}
                  </span>
                )}

                {error?.message && error?.message?.length
                  ? error?.message?.map((err, index) => (
                      <span key={index} className="text-[0.8rem] text-red-500">
                        {err}
                      </span>
                    ))
                  : false}
              </div>
            </div>
            <Checkbox
              checked={isCheckedTyC}
              onChange={(e) => setIsCheckedTyC(!isCheckedTyC)}
              label={
                <Typography
                  variant="small"
                  className={`flex items-center font-normal `}
                >
                  Estoy de acuerdo con los
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900 underline"
                  >
                    &nbsp;Términos y Condiciones.
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            {error?.isCheckedTyC && (
              <span className="text-[0.8rem] text-red-500">
                {error.isCheckedTyC}
              </span>
            )}

            <Button
              onClick={(e) => handleSubmit(e)}
              className={`bg-[--primary]`}
              fullWidth
            >
              INGRESAR
            </Button>
            <Typography className="mt-4 text-center font-normal hover:underline">
              <a href="#">¿Olvidó su nombre de usuario o contraseña?</a>
            </Typography>
          </form>
        </Card>
      </section>
      <footer className="flex justify-center bg-white py-4">
        <img
          src={dinamicImages.loginFooter.img}
          style={dinamicImages.loginFooter.styles.size}
          alt=""
        />
      </footer>
    </section>
  );
}

const defaultInputValue = {
  user: "",
  password: "",
};

export default SignIn;
