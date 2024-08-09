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
import { RolesAdapter } from "@/Infra/Adapters/Roles/roles.adapter";
import { useEffect, useState } from "react";
import { PermissionsAccordion } from "../../../../components/Accordions/PermissionsAccordion";
import { PermissionsAdapter } from "../../../../../Infra/Adapters/Permissions/permissions.adapter";
import { useMaterialTailwindController } from "@/context/index.jsx";
import permissionsDomainConstants from "@/Domain/Isvc/permissions/permissions.js";

const modalText = {
  title: "¿Está seguro de salir sin guardar los cambios?",
  content: "Esta acción descartará los cambios realizados en el registro.",
  leftButtonText: "Salir",
  rightButtonText: "Volver",
};

export default function AddRole() {
  const navigate = useNavigate();
  const [input, setInput] = useState({ permissions: {} });
  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState({});
  const [controller, dispatch] = useMaterialTailwindController();
  const loggedUserPermissions = controller.permissions;

  if (loggedUserPermissions.roles !== permissionsDomainConstants.write)
    window.location.replace("/auth/sign-in");

  useEffect(() => {
    PermissionsAdapter.get().then((res) => setPermissions(res));
  }, []);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError({});
    try {
      await RolesAdapter.createOne(input);
      navigate("/dashboard/configuracion/roles");
    } catch (error) {
      setError(error);
    }
  };

  /* RADIO CONTROLLER */
  const handlePermissionCheckbox = (e, permissionId) => {
    setInput({
      ...input,
      permissions: {
        ...input.permissions,
        [permissionId]: Number(e.target.value),
      },
    });
  };

  const handleDeletePermissionsRadio = (e, permissionId) => {
    e.preventDefault();
    let newInput = { ...input };
    delete newInput.permissions[e.target.id];
    setInput(newInput);
    // setDefaultRadio({});
    document.querySelectorAll(`input[type=radio]`).forEach((input) => {
      input.name === e.target.id ? (input.checked = false) : false;
    });
  };

  return (
    <Card className="h-full w-full overflow-y-auto">
      <CardHeader
        floated={false}
        variant="gradient"
        className="p-6 bg-[--secondary] flex"
      >
        <Typography
          variant="h6"
          color="white"
          className="flex items-center gap-3"
        >
          Nuevo Rol
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col overflow-hidden px-6 w-full h-full overflow-y-auto ">
        <form className="mb-2 w-full  flex flex-col justify-start gap-4">
          <div className="flex flex-col justify-center w-1/3">
            <Typography variant="h6" className="mb-1">
              Nombre del rol
            </Typography>
            <Input
              size="lg"
              placeholder=""
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="name"
              onChange={(e) => handleInput(e)}
              error={error?.name}
            />
            {error.name &&
              error.name.map((error) => (
                <span className="text-red-500 text-sm ">{error}</span>
              ))}
          </div>
          <div className="flex flex-col justify-center w-1/3">
            <Typography variant="h6" className="mb-1">
              Desripción del rol
            </Typography>
            <Input
              size="lg"
              placeholder=""
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="description"
              onChange={(e) => handleInput(e)}
              error={error?.description}
            />
            {error.description &&
              error.description.map((error) => (
                <span className="text-red-500 text-sm ">{error}</span>
              ))}
          </div>
          <div className="flex flex-col justify-center h-full ">
            <Typography variant="h6" className="mb-1">
              Permisos del rol
            </Typography>

            <PermissionsAccordion
              menu={permissions}
              handleDeletePermissionsRadio={handleDeletePermissionsRadio}
              handlePermissionCheckbox={handlePermissionCheckbox}
            />
          </div>
          {error.permissions &&
            error.permissions.map((error) => (
              <span className="text-red-500 text-sm ">{error}</span>
            ))}
        </form>
      </CardBody>
      <CardFooter className="flex items-center justify-end border-t border-blue-gray-50 p-4 gap-6">
        <Button className="bg-secondary" onClick={handleSubmit}>
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
            navigate("/dashboard/configuracion/roles");
          }}
        />
      </CardFooter>
    </Card>
  );
}
