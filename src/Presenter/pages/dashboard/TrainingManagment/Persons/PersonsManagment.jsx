import {
  MagnifyingGlassIcon,
  TableCellsIcon,
  PencilSquareIcon,
  TrashIcon,
  NewspaperIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
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
import { ManagmentTable } from "../../../../components/Tables/ManagmentTable";
import { PersonsAdapter } from "../../../../../Infra/Adapters/Persons/persons.adapter";
import ExcelToJsonConverter from "../../../../components/FileConverters/ExcelToJsonConverter";
import TablePaginator from "../../../../components/Paginators/TablePaginator";
import JsonToExcelConverter from "../../../../components/FileConverters/JsonToExcelConverter";
import showToast from "../../../../../Infra/Services/themeInterceptor/toast.service";

const TABLE_HEAD = [
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
    displayName: "RUN",
    filterName: "run",
  },
  {
    displayName: "Correo",
    filterName: "email",
  },
  {
    displayName: "Entidad/Institución",
    filterName: "institution.name",
  },
  {
    displayName: "RUT",
    filterName: "entity_rut",
  },
  {
    displayName: "Tipo Institución",
    filterName: "institution_type",
  },
  {
    displayName: "Perfil usuario invitado",
    filterName: "profile",
  },
  {
    displayName: "Acciones",
    filterName: "Acciones",
  },
];

export default function PeopleManagment() {
  const navigate = useNavigate();
  const [tableRows, setTableRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");

  const getPersonsPaginated = async () => {
    const filter = {
      search_terms: [search, search],
      search_fields: ["name", "code"],
      search_operators: ["icontains", "exact"],
    };

    PersonsAdapter.getWithPagination(page, pageSize, filter).then((res) => {
      setTotalPages(Math.ceil(res.total / pageSize));
      setTotalItems(res.total);
      setTableRows(res.persons);
    });
  };

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    getPersonsPaginated();
  }, [page, pageSize]);

  function deleteAction(id) {
    PersonsAdapter.deleteOneById(id)
      .then(async () => {
        alert("Persona eliminada correctamente.");
        await getPersonsPaginated();
      })
      .catch((error) => alert("Ocurrio un error al eliminar la persona."));
  }
  function academicHistoryViewAction(id) {
    navigate(`historial/${id}`);
  }
  function binnacleViewAction(id) {
    navigate(`bitacora/${id}`);
  }
  function editAction(id) {
    navigate(`editar/${id}`);
  }

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

  function handleSearch(event) {
    if (event.key === "Enter") {
      getPersonsPaginated();
    }
  }
  function handleSearchIcon() {
    getPersonsPaginated();
  }

  async function handleCreatePersonsByExcel(personsArray) {
    try {
      await PersonsAdapter.createByExcel(personsArray).then(async () => {
        await getPersonsPaginated();
        showToast("Personas cargadas correctamente", "success");
      });
    } catch (error) {
      showToast(error.message, "danger");
    }
  }

  return (
    <Card className="h-full w-full pt-4 flex flex-col justify-between">
      <CardHeader variant="gradient" className="mt-0 p-6 bg-[--secondary]">
        <Typography variant="h6" color="white">
          Gestión Personas
        </Typography>
      </CardHeader>
      <CardHeader
        floated={false}
        shadow={false}
        className="flex  justify-between  items-center h-24 px-6 mb-0"
      >
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center shrink-0 flex-col gap-4 sm:flex-row">
            <Tooltip content="Agregar persona">
              <Link to={"crear"}>
                <Button
                  size="sm"
                  className="flex items-center gap-3 text-white border rounded-xl  bg-[--primary] "
                >
                  <UserPlusIcon className="h-5 w-5" />
                  <span>Nueva persona</span>
                </Button>
              </Link>
            </Tooltip>

            <div className="flex text-[12px] gap-1">
              {/* UPLOAD PERSONS */}
              <JsonToExcelConverter
                text={<TableCellsIcon className="h-5 w-5" />}
                tooltipText="Descargar modelo de excel."
                icon={""}
                action={PersonsAdapter.createDefaultPersonsUploadExcel}
              />
              <ExcelToJsonConverter
                text="Cargar grupo"
                tooltipText="Cargar excel de personas."
                icon={<ArrowUpTrayIcon className="h-5 w-5" />}
                action={handleCreatePersonsByExcel}
              />
            </div>

            {/* DOWNLOAD PERSONS */}

            <JsonToExcelConverter
              text={"Descargar Grupo"}
              tooltipText="Descargar grupo de personas."
              icon={<ArrowDownTrayIcon className="h-5 w-5" />}
              action={PersonsAdapter.createExcel}
            />
          </div>
        </div>
        {/* INPUT SEARCH */}
        <div className="w-full md:w-72 flex flex-end ">
          <Input
            color="deep-orange"
            label="Buscar persona..."
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            icon={
              <MagnifyingGlassIcon
                // style={{ cursor: "pointer" }}
                onClick={() => handleSearchIcon()}
                className="h-5 w-5 cursor-pointer hover:bg-gray-300 rounded-lg"
              />
            }
          />
        </div>
      </CardHeader>

      <CardBody className="overflow-scroll h-full px-0">
        <ManagmentTable
          tableHead={TABLE_HEAD}
          tableRows={tableRows}
          setTableRows={setTableRows}
          tableActions={[
            {
              action: academicHistoryViewAction,
              tooltipText: "Historial",
              icon: <AcademicCapIcon className="w-5 h-5" />,
            },
            {
              action: binnacleViewAction,
              tooltipText: "Bitácora",
              icon: <NewspaperIcon className="w-5 h-5" />,
            },
            {
              action: editAction,
              tooltipText: "Editar",
              icon: <PencilSquareIcon className="w-5 h-5" />,
            },
            {
              action: deleteAction,
              tooltipText: "Eliminar",
              icon: <TrashIcon className="w-5 h-5" />,
            },
          ]}
        />
      </CardBody>

      <CardFooter>
        <TablePaginator
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          totalItems={totalItems}
          totalItemsDisplayed={tableRows.length}
          handleSetPageManual={handleSetPageManual}
          setPageSize={setPageSize}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </CardFooter>
    </Card>
  );
}
