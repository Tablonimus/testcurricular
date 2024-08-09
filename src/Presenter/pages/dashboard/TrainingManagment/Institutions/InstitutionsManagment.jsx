import {
  BookOpenIcon,
  BuildingOffice2Icon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
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
import { Link, useNavigate } from "react-router-dom";
import { ManagmentTable } from "../../../../components/Tables/ManagmentTable";
import { InstitutionsAdapter } from "../../../../../Infra/Adapters/Institutions/institutions.adapter";
import TablePaginator from "../../../../components/Paginators/TablePaginator";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = [
  {
    displayName: "Nombre de institución",
    filterName: "name",
  },
  {
    displayName: "Tipo de entidad",
    filterName: "institution_type_name",
  },
  {
    displayName: "RUT Institución",
    filterName: "doc_number",
  },
  {
    displayName: "Sector",
    filterName: "institution_sector_name",
  },
  {
    displayName: "Miembro MILAFT",
    filterName: "milaft",
  },
  {
    displayName: "Acciones",
    filterName: "Acciones",
  },
];

export default function InstitutionsManagment() {
  const navigate = useNavigate();
  const [tableRows, setTableRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    getInstitutions();
  }, [page, pageSize]);

  function getInstitutions() {
    const filter = {
      search_terms: [search, search],
      search_fields: ["name", "code"],
      search_operators: ["icontains", "exact"],
    };
    InstitutionsAdapter.getWithPagination(page, pageSize, filter).then(
      (res) => {
        setTotalPages(Math.ceil(res.total / pageSize));
        setTotalItems(res.total);
        setTableRows(res.institutions);
      }
    );
  }
  function deleteAction(id) {
    InstitutionsAdapter.deleteOneById(id)
      .then(() => {
        alert("Institución eliminada correctamente.");
        getInstitutions();
      })
      .catch((error) => alert("Ocurrio un error al eliminar la institución."));
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
      getInstitutions();
    }
  }
  function handleSearchIcon() {
    getInstitutions();
  }

  return (
    <Card className="h-full w-full pt-4">
      <CardHeader variant="gradient" className="mt-0 p-6 bg-[--secondary]">
        <Typography variant="h6" color="white">
          Instituciones/Entidades
        </Typography>
      </CardHeader>
      <CardHeader
        floated={false}
        shadow={false}
        className="flex justify-between items-center h-24 px-6 mb-0"
      >
        <div className="w-full flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center shrink-0 flex-col gap-4 sm:flex-row">
            <Link to={"crear"}>
              <Button
                size="sm"
                className={`flex items-center gap-3 rounded-full normal-case bg-primary`}
              >
                <BuildingOffice2Icon className="w-5 h-5" />
                <span>Crear nueva institución / entidad</span>
              </Button>
            </Link>
          </div>

          <div className="w-full md:w-72 flex flex-end ">
            <Input
              color="deep-orange"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              label="Buscar institución..."
              icon={
                <MagnifyingGlassIcon
                  className="h-5 w-5 cursor-pointer hover:bg-gray-300 rounded-lg"
                  onClick={() => handleSearchIcon()}
                />
              }
            />
          </div>
        </div>
      </CardHeader>

      <CardBody className="overflow-scroll h-full px-0">
        {
          <ManagmentTable
            tableHead={TABLE_HEAD}
            tableRows={tableRows}
            setTableRows={setTableRows}
            tableActions={[
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
        }
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
