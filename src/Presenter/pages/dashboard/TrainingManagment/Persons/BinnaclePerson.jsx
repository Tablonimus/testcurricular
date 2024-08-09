import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ManagmentTable } from "../../../../components/Tables/ManagmentTable";
import { PersonsAdapter } from "../../../../../Infra/Adapters/Persons/persons.adapter";
import { VersionsAdapter } from "../../../../../Infra/Adapters/Versions/versions.adapter";
import { LogsAdapter } from "../../../../../Infra/Adapters/Logger/logs.adapter";
import { BuildingLibraryIcon } from "@heroicons/react/24/outline";
import TablePaginator from "../../../../components/Paginators/TablePaginator";

const TABLE_HEAD_PERSON = [
  {
    displayName: "ID",
    filterName: "id",
  },
  {
    displayName: "Nombre",
    filterName: "name",
  },
  {
    displayName: "Apellido",
    filterName: "last_name",
  },
  {
    displayName: "Correo",
    filterName: "email",
  },
];
const TABLE_HEAD_BINNACLE = [
  {
    displayName: "Evento",
    filterName: "event",
  },
  {
    displayName: "Descripción",
    filterName: "description",
  },
  {
    displayName: "Fecha",
    filterName: "created_at",
  },
];

export default function BinnaclePerson() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [person, setPerson] = useState([]);
  const [tableBinnacleRows, setTableBinnacleRows] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const filter = {
    search_terms: [search, search],
    search_fields: ["name", "code", "Person", "person"],
    search_operators: ["icontains", "exact"],
  };

  const getBinnacle = () => {
    LogsAdapter.getBinnacleWithPaginationById(id, page, pageSize, filter).then(
      (res) => {
        setTableBinnacleRows(res);
        setTotalItems(res.length);
      }
    );
  };

  useEffect(() => {
    PersonsAdapter.getById(id).then((res) => setPerson(res));
    getBinnacle();
  }, []);

  function handleNextPage() {
    if (page < totalPages) setPage(page + 1);
  }
  function handlePreviousPage() {
    if (page > 1) setPage(page - 1);
  }

  function handleSetPageManual(e) {
    if (Number(e.target.value) > totalPages || Number(e.target.value) <= 0) {
      setPage(1);
    } else {
      setPage(Number(e.target.value));
    }
  }

  return (
    <Card className="h-full w-full pt-4">
      <CardHeader variant="gradient" className="mt-0 p-6 bg-[--secondary]">
        <Typography variant="h6" color="white">
          Bitácora Personal
        </Typography>
      </CardHeader>
      <CardHeader
        floated={false}
        shadow={false}
        className="flex  justify-between  items-center px-4 mb-0"
      >
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center shrink-0 flex-col gap-4 sm:flex-row">
            <Tooltip content="Agregar evento">
              <Link to={"crear"}>
                <Button
                  size="sm"
                  className="flex items-center gap-3 text-white border rounded-xl  bg-[--primary] "
                >
                  <BuildingLibraryIcon className="h-5 w-5" />
                  <span>Crear nuevo evento</span>
                </Button>
              </Link>
            </Tooltip>
          </div>
          |
          <div className="flex items-center shrink-0 flex-col gap-4 sm:flex-row">
            <Typography variant="h6">
              Nombre del participante:{" "}
              <span className="font-normal">{`${person.name} ${person.last_name}`}</span>
            </Typography>
          </div>
          |
          <div className="flex items-center shrink-0 flex-col gap-4 sm:flex-row">
            <Typography variant="h6">
              Correo: <span className="font-normal">{`${person.email}`}</span>
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="flex flex-col gap-4 overflow-scroll px-0">
        <div>
          <Typography variant="h6" className="px-8">
            Acciones Vinculadas
          </Typography>

          <ManagmentTable
            tableHead={TABLE_HEAD_BINNACLE}
            tableRows={tableBinnacleRows}
            setTableRows={setTableBinnacleRows}
          />
        </div>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <TablePaginator
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          totalItems={totalItems}
          totalItemsDisplayed={tableBinnacleRows.length}
          handleSetPageManual={handleSetPageManual}
          setPageSize={setPageSize}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </CardFooter>
    </Card>
  );
}
