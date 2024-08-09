import React, { useState } from "react";
import {
  Typography,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { RolesAdapter } from "@/Infra/Adapters/Roles/roles.adapter";
import { useMaterialTailwindController } from "@/context/index.jsx";
import permissionsConstants from "@/Domain/Isvc/permissions/permissions.js";

export default function RoleRow({ role, index, classes }) {
  const { id, name, description } = role;
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialTailwindController();
  const permissions = controller.permissions;
  /* CRUD HANDLERS */
  const [deleteModal, handleOpenDeleteModal] = useState(false);

  const handleDeleteRole = async (id) => {
    try {
      await RolesAdapter.deleteOneById(id); //PREGUNTAR POR QUE ES MEJOR=> reload que devolver la peticion con algo
    } catch (error) {
      console.log(error);
      alert("Ha ocurrido un error al eliminar el usuario.");
    } finally {
      window.location.reload();
    }
  };

  const handleEditRole = (e, id) => {
    navigate("editar/" + id);
  };

  return (
    <tr key={index}>
      <td className={classes}>
        <div className="w-max">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {name}
          </Typography>
        </div>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {description}
        </Typography>
      </td>

      {permissions.roles === permissionsConstants.write ? (
        <td className={classes}>
          <div className="flex gap-1 items-center">
            <Tooltip content="Editar">
              <button>
                <PencilIcon
                  onClick={(e) => handleEditRole(e, id)}
                  className="w-5 h-5"
                />
              </button>
            </Tooltip>
            <div className="border h-6 border-gray-300" />
            <Tooltip content="Eliminar">
              <button>
                <TrashIcon
                  onClick={(e) => handleOpenDeleteModal(!deleteModal)}
                  className="w-5 h-5"
                />
              </button>
            </Tooltip>
            <Dialog open={deleteModal} handler={handleOpenDeleteModal}>
              <DialogHeader>Eliminar rol {name}</DialogHeader>
              <DialogBody>
                ¿Estas a punto de eliminar el rol
                <span className="font-bold"> {name}</span>?. Esta acción es
                irreversible.
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={(e) => handleDeleteRole(id)}
                  className="mr-1"
                >
                  <span>Eliminar</span>
                </Button>
                <Button
                  variant="filled"
                  className="bg-[--secondary]"
                  onClick={(e) => handleOpenDeleteModal(!deleteModal)}
                >
                  <span>Salir</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </td>
      ) : (
        <td className={classes}>
          <div className="flex gap-1 items-center cursor-not-allowed">
            <PencilIcon className="w-5 h-5" />

            <div className="border h-6 border-gray-300" />

            <TrashIcon className="w-5 h-5" />
          </div>
        </td>
      )}
    </tr>
  );
}
