import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Checkbox,
} from "@material-tailwind/react";

import ModalButton from "../../../../components/Buttons/ModalButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UsersAdapter } from "../../../../../Infra/Adapters/Users/users.adapter";
import { RolesAdapter } from "../../../../../Infra/Adapters/Roles/roles.adapter";

const modalText = {
  title: "¿Está seguro de salir sin guardar los cambios?",
  content: "Esta acción descartará los cambios realizados en el registro.",
  leftButtonText: "Salir",
  rightButtonText: "Volver",
};

export function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [input, setInput] = useState({});
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    RolesAdapter.getRoles().then((res) => {
      setRoles(res);
      const defaultRole = res.find((res) => res.name === user.roles);
      defaultRole && setInput({ ...input, roles: [defaultRole.id] });
    });
  }, [user]);

  useEffect(() => {
    UsersAdapter.getById(id).then((res) => {
      setUser(res);
      setInput({ ...input, ...res });
    });
  }, []);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelectRole = (e) => {
    setInput({ ...input, ["roles"]: [e.target.value] });
  };

  const handleSubmit = async () => {
    setError({});
    try {
      await UsersAdapter.editOneById(id, input);
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
        className=" p-6 bg-[--secondary] flex"
      >
        <Typography
          variant="h6"
          color="white"
          className="flex items-center gap-3"
        >
          Editar Usuario
        </Typography>
      </CardHeader>
      <CardBody className="overflow-scroll px-0 w-full">
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
                  defaultValue={user?.username}
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
                  defaultValue={user?.email}
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
                  placeholder="Indique una nueva contraseña..."
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  defaultValue={user?.password || "*****"}
                  name="password"
                  onChange={(e) => handleInput(e)}
                  error={error.password}
                />
                {error.password &&
                  error.password.map((error) => (
                    <span className="text-red-500 text-sm ">{error}</span>
                  ))}
                <Checkbox
                  color="blue-gray"
                  label="Usuario debe cambiarlo en el nuevo login."
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              {/* <div className="min-w-56 w-1/3 px-4">
                <Typography variant="h6" color="blue-gray" className="">
                  Nombre
                </Typography>
                <Input
                  type="text"
                  size="lg"
                  placeholder="Nombre y apellido / identificador"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  defaultValue={user?.username}
                  name="name"
                  onChange={(e) => handleInput(e)}
                />
              </div> */}
              <div className="min-w-56 w-1/3 px-4">
                <Typography variant="h6" color="blue-gray" className="">
                  Rol
                </Typography>

                <select
                  label="Seleccione un rol.."
                  onChange={(e) => handleSelectRole(e)}
                  className={
                    "block h-12 border border-gray w-full rounded" +
                    `${error.roles_id ? "border border-red-500" : false}`
                  }
                >
                  {roles.map(
                    (role, index) =>
                      user.roles === role.name && (
                        <option selected value={role.id} key={index}>
                          {role.name}
                        </option>
                      )
                  )}
                  {roles.map(
                    (role, index) =>
                      user.roles !== role.name && (
                        <option value={role.id} key={index}>
                          {role.name}
                        </option>
                      )
                  )}
                </select>
                {error.roles_id &&
                  error.roles_id.map((error) => (
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
