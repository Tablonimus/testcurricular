import React from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import {
  Typography,
  Button,
  Chip,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { UsersAdapter } from "@/Infra/Adapters/Users/users.adapter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMaterialTailwindController } from "@/context/index.jsx";
import permissionsConstants from "@/Domain/Isvc/permissions/permissions.js";

export default function UserRow({ user, index, classes }) {
  const {
    id,
    exampleID,
    username,
    Name,
    LastName,
    email,
    Role,
    Identificador,
    Status,
  } = user;

  const [controller, dispatch] = useMaterialTailwindController();
  const permissions = controller.permissions;

  const navigate = useNavigate();

  /* CRUD HANDLERS */
  const [deleteModal, handleOpenDeleteModal] = useState(false);

  const handleDeleteUser = async (id) => {
    try {
      await UsersAdapter.deleteOneById(id); //PREGUNTAR QUE ES MEJOR=> reload o devolver la peticion con algo
    } catch (error) {
      alert("Ha ocurrido un error al eliminar el usuario");
    } finally {
      window.location.reload();
    }
  };

  const handleEditUser = (id) => {
    navigate("editar/" + id);
  };

  return (
    <tr key={id}>
      <td className={classes}>
        <div className="flex flex-col">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {exampleID.toString().slice(0, 3)}
          </Typography>
        </div>
      </td>

      <td className={classes}>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {username}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {email}
            </Typography>
          </div>
        </div>
      </td>

      <td className={classes}>
        <div className="w-max">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {Name + " " + LastName}
          </Typography>
        </div>
      </td>

      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {Role}
        </Typography>
      </td>

      <td className={classes}>
        <Chip
          size="sm"
          value={Status}
          className={Status !== "Retirado" ? "bg-green-500" : "bg-gray-500"}
        />
      </td>

      {permissions.usuarios === permissionsConstants.write ? (
        <td className={classes}>
          <div className="flex gap-1 items-center">
            <Tooltip content="Editar">
              <button>
                <PencilIcon
                  onClick={(e) => handleEditUser(id)}
                  className="w-5 h-5"
                />
              </button>
            </Tooltip>
            <div className="border h-6 border-gray-300" />
            <Tooltip content="Eliminar">
              <button>
                <TrashIcon
                  onClick={() => handleOpenDeleteModal(!deleteModal)}
                  className="w-5 h-5"
                />
              </button>
            </Tooltip>
            <Dialog open={deleteModal} handler={handleOpenDeleteModal}>
              <DialogHeader>Eliminar usuario {username}</DialogHeader>
              <DialogBody>
                ¿Estas a punto de eliminar el usuario
                <span className="font-bold"> {username}</span>?. Esta acción es
                irreversible.
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={(e) => handleDeleteUser(id)}
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
