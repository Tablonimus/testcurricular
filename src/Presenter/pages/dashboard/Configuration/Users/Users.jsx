import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { UsersAdapter } from "@/Infra/Adapters/Users/users.adapter";
import { Link } from "react-router-dom";
import UserRow from "../../../../components/Tables/TableRows/Users/UserRow";
import { useMaterialTailwindController } from "@/context/index.jsx";
import permissionsConstants from "@/Domain/Isvc/permissions/permissions.js";

export function Users() {
  const TABLE_HEAD = [
    {
      displayName: "ID",
      filterName: "id",
    },
    {
      displayName: "USUARIO",
      filterName: "username",
    },
    {
      displayName: "Nombre",
      filterName: "Name",
    },
    {
      displayName: "Rol",
      filterName: "Role",
    },
    {
      displayName: "Estado",
      filterName: "Status",
    },
    {
      displayName: "Acciones",
      filterName: "Acciones",
    },
  ];

  const [tableHead, setTableHead] = useState(TABLE_HEAD);
  const [tableRows, setTableRows] = useState([]);
  const [sortedState, setSortedState] = useState(false);
  const [controller, dispatch] = useMaterialTailwindController();
  const permissions = controller.permissions;

  useEffect(() => {
    UsersAdapter.get().then((res) => setTableRows(res));
  }, []);

  const handleSortUsers = (e) => {
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
    <Card className="h-full w-full pt-4 ">
      <CardHeader variant="gradient" className="mt-0  p-6 bg-[--secondary]">
        <Typography variant="h6" color="white">
          Usuarios
        </Typography>
      </CardHeader>
      <CardHeader
        floated={false}
        shadow={false}
        className="px-6 pb-4 h-16 flex flex-col items-center justify-between  md:flex-row"
      >
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          {permissions.usuarios === permissionsConstants.write && (
            <Link to={"nuevo"}>
              <Button
                size="sm"
                className={`flex items-center gap-3 rounded-lg normal-case bg-[--primary]`}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                Crear nuevo usuario
              </Button>
            </Link>
          )}
        </div>
        <div className="w-full md:w-72 flex flex-end ">
          <Input
            color="deep-orange"
            label="Buscar"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </CardHeader>

      <CardBody className="overflow-scroll p-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHead.map((head, index) => (
                <th
                  key={head.displayName}
                  className=" cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  id={head.filterName}
                  onClick={(e) => handleSortUsers(e)}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    id={head.filterName}
                    onClick={(e) => handleSortUsers(e)}
                  >
                    {head.displayName}
                    {index !== tableHead.length - 1 && (
                      <ChevronUpDownIcon
                        strokeWidth={2}
                        className="h-4 w-4"
                        id={head.filterName}
                        onClick={(e) => handleSortUsers(e)}
                      />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows?.map((user, index) => {
              const isLast = index === tableRows.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <UserRow
                  key={index}
                  user={user}
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
