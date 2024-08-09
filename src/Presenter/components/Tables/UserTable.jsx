import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { UsersAdapter } from "@/Infra/Adapters/Users/users.adapter";
/*   id,
                    username,
                    Name,
                    LastName,
                    Email,
                    Role,
                    Identificador,
                    Status, */
const TABLE_HEAD = [
  {
    displayName: "Usuario",
    filterName: "username",
  },
  {
    displayName: "Identificador",
    filterName: "id",
  },
  {
    displayName: "Nombres",
    filterName: "Name",
  },
  {
    displayName: "Correo",
    filterName: "email",
  },
  {
    displayName: "Roles",
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

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: false,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    online: false,
    date: "19/09/17",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: true,
    date: "24/12/08",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    job: "Manager",
    org: "Executive",
    online: false,
    date: "04/10/21",
  },
];

export function Users() {
  const [tableHead, setTableHead] = useState(null);

  const [tableRows, setTableRows] = useState([]);
  const [sortedState, setSortedState] = useState(false);

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
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Usuarios
            </Typography>
            {/* <Typography color="gray" className="mt-1 font-normal">
                See information about all members
              </Typography> */}
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {/* <Button variant="outlined" size="sm">
                view all
              </Button> */}
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Agregar
              usuario
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {/* <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              /> */}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Buscar"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
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
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon
                        strokeWidth={2}
                        className="h-4 w-4"
                        id={head.filterName}
                        onClick={(e) => handleSortUsers(e)}
                      ></ChevronUpDownIcon>
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows?.map(
              (
                {
                  id,
                  username,
                  Name,
                  LastName,
                  email,
                  Role,
                  Identificador,
                  Status,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
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
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {id}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {Name + " " + LastName}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Role}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Status}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Tooltip content="Editar usuario">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
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
