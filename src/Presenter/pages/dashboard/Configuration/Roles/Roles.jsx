import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RolesAdapter } from "@/Infra/Adapters/Roles/roles.adapter";
import RoleRow from "../../../../components/Tables/TableRows/Roles/RoleRow";
import { useMaterialTailwindController } from "@/context/index.jsx";
import permissionsConstants from "@/Domain/Isvc/permissions/permissions.js";

const TABLE_HEAD = [
  {
    displayName: "Rol",
    filterName: "Role",
  },
  {
    displayName: "Descripción",
    filterName: "name",
  },

  {
    displayName: "Acciones",
    filterName: "Acciones",
  },
];

export function Roles() {
  const [tableHead, setTableHead] = useState(TABLE_HEAD);

  const [tableRows, setTableRows] = useState([]);
  const [sortedState, setSortedState] = useState(false);
  const [controller, dispatch] = useMaterialTailwindController();
  const permissions = controller.permissions;

  useEffect(() => {
    RolesAdapter.getRoles().then((res) => setTableRows(res));
  }, []);

  const handleSortRoles = (e) => {
    let sorted = [...tableRows];
    let field = e.target.id;

    sorted = sorted.sort((a, b) => {
      if (field === "id") {
        return sortedState
          ? Number(a[field]) - Number(b[field])
          : Number(b[field]) - Number(a[field]); // Sort by id using localeCompare
      } else {
        // Existing logic for other fields (assuming they are strings)
        return sortedState
          ? b[field].localeCompare(a[field])
          : a[field].localeCompare(b[field]);
      }
    });
    setTableRows(sorted);
    setSortedState(!sortedState);
  };

  return (
    <Card className="h-full w-full py-4">
      <CardHeader variant="gradient" className="mt-0 p-6 bg-[--secondary]">
        <Typography variant="h6" color="white">
          Roles
        </Typography>
      </CardHeader>
      <CardHeader floated={false} shadow={false} className="px-6 pt-1">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {permissions?.roles === permissionsConstants.write && (
              <Link to={"nuevo"}>
                <Button
                  size="sm"
                  className={`flex items-center gap-3 rounded-full normal-case bg-[--primary]`}
                >
                  <PlusCircleIcon strokeWidth={2} className="h-4 w-4" />
                  Crear nuevo Rol
                </Button>
              </Link>
            )}
          </div>
          <div className="w-full md:w-72 flex flex-end ">
            <Input
              color="deep-orange"
              label="Buscar rol"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll py-4 px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHead?.map((head, index) => (
                <th
                  key={head.displayName}
                  className=" cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  id={head.filterName}
                  onClick={(e) => handleSortRoles(e)}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    id={head.filterName}
                    onClick={(e) => handleSortRoles(e)}
                  >
                    {head.displayName}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon
                        strokeWidth={2}
                        className="h-4 w-4"
                        id={head.filterName}
                        onClick={(e) => handleSortRoles(e)}
                      ></ChevronUpDownIcon>
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows?.map((role, index) => {
              const isLast = index === tableRows.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <RoleRow
                  key={index}
                  role={role}
                  index={index}
                  classes={classes}
                />
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Página 1 de 1
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Anterior
          </Button>
          <Button variant="outlined" size="sm">
            Siguiente
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
