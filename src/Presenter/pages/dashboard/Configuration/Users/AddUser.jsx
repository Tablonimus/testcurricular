import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

import ModalButton from "../../../../components/Buttons/ModalButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UsersAdapter } from "@/Infra/Adapters/Users/users.adapter";
import { RolesAdapter } from "../../../../../Infra/Adapters/Roles/roles.adapter";

const modalText = {
  title: "¿Está seguro de salir sin guardar los cambios?",
  content: "Esta acción descartará los cambios realizados en el registro.",
  leftButtonText: "Salir",
  rightButtonText: "Volver",
};

export function AddUser() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    roles_id: [],
    password: "GICA2025",
  });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    RolesAdapter.getRoles().then((res) => {
      setRoles(res);
    });
  }, []);

  const handleInput = (e) => {
    e.target.type === "checkbox"
      ? setInput({ ...input, [e.target.name]: e.target.checked })
      : setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelectRole = (e) => {
    setInput({ ...input, ["roles_id"]: [...input.roles_id, e.target.value] });
  };

  const handleSubmit = async () => {
    setError({});
    try {
      if (!input.roles_id.length) {
        throw { ...error, roles_id: ["Debes seleccionar un rol."] };
      }
      await UsersAdapter.createOne(input);
      navigate("/dashboard/configuracion/usuarios");
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <Card className="min-h-[85vh] h-full w-full">
      <CardHeader
        floated={false}
        variant="gradient"
        className="p-6 bg-[--secondary] flex"
      >
        <Typography variant="h6" className="flex items-center gap-3 text-white">
          Nuevo usuario
        </Typography>
      </CardHeader>
      <CardBody className="overflow-scroll px-0 w-full min-h-96">
        <form className="mb-2 w-full  flex flex-col md:flex-row justify-center gap-4">
          <div className="mb-1 w-full flex flex-col gap-6">
            <div className="flex flex-wrap">
              <div className="min-w-56 w-1/3 px-4 ">
                <Typography variant="h6" color="blue-gray" className="">
                  ID de usuario
                </Typography>
                <Input
                  size="lg"
                  placeholder="Nombre de usuario único..."
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="username"
                  onChange={(e) => handleInput(e)}
                  error={error.username}
                />
                {error.username &&
                  error.username.map((error) => (
                    <span className="text-red-500 text-sm ">{error}</span>
                  ))}
              </div>
              <div className="min-w-56 w-1/3 px-4">
                <Typography variant="h6" color="blue-gray" className="">
                  Mail
                </Typography>
                <Input
                  size="lg"
                  placeholder="ejemplo@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="email"
                  onChange={(e) => handleInput(e)}
                  error={error.email}
                />
                {error.email &&
                  error.email.map((error) => (
                    <span className="text-red-500 text-sm ">{error}</span>
                  ))}
              </div>
              <div className="min-w-56 w-1/3 px-4">
                <Typography variant="h6" color="blue-gray" className="">
                  Contraseña (por defecto)
                </Typography>
                <Input
                  type="text"
                  size="lg"
                  placeholder={input.password}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="password"
                  defaultValue={input.password}
                  onChange={(e) => handleInput(e)}
                  error={error.password}
                />
                {error.password &&
                  error.password.map((error) => (
                    <span className="text-red-500 text-sm ">{error}</span>
                  ))}
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="min-w-56 w-1/3 px-4">
                <Typography variant="h6" color="blue-gray" className="">
                  Rol
                </Typography>

                <select
                  onChange={(e) => handleSelectRole(e)}
                  className={
                    "block h-12 border border-gray w-full rounded" +
                    `${error.roles_id ? "border border-red-500" : false}`
                  }
                >
                  <option selected value={""} disabled>
                    Seleccione un rol...
                  </option>
                  {roles.map((role, index) => (
                    <option value={role.id} key={index}>
                      {role.name}
                    </option>
                  ))}
                </select>
                {error.roles_id &&
                  error.roles_id.map((error) => (
                    <span className="text-red-500 text-sm ">{error}</span>
                  ))}
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="flex items-center min-w-56 w-1/3 px-4 gap-2">
                Usuario activo
                {/* <Checkbox color="green" defaultChecked /> */}
                <input
                  type="checkbox"
                  name="is_active"
                  onChange={(e) => handleInput(e)}
                  id="is_active"
                  defaultChecked
                  className="h-4 w-4"
                />
                {error.is_active &&
                  error.is_active.map((error) => (
                    <span className="text-red-500 text-sm ">{error}</span>
                  ))}
              </div>
            </div>
          </div>
        </form>
      </CardBody>
      <CardFooter className="flex items-center justify-end border-t border-blue-gray-50 p-4 gap-6">
        <Button className="bg-[--secondary]" onClick={handleSubmit}>
          GUARDAR
        </Button>
        <ModalButton
          innerButtonText={"Salir"}
          variant={"outlined"}
          severity={"warning"}
          title={modalText.title}
          content={modalText.content}
          openButtonStyles={"border-[--secondary] text-[--secondary]"}
          leftButtonText={modalText.leftButtonText}
          leftButtonStyles={"text-white bg-[--secondary]"}
          rightButtonStyles={
            "text-[--secondary] bg-transparent border border-[--secondary]"
          }
          rightButtonText={modalText.rightButtonText}
          leftButtonAction={(e) => {
            navigate("/dashboard/configuracion/usuarios");
          }}
          // rightButtonAction={}
        />
      </CardFooter>
    </Card>
  );
}
