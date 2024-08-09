import {
  BookOpenIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
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
import { ManagmentTable } from "../../../components/Tables/ManagmentTable";
import { ReportsAdapter } from "../../../../Infra/Adapters/Reports/reports.adapter";
import TablePaginator from "../../../components/Paginators/TablePaginator";

const TABLE_HEAD = [
  {
    displayName: "Nombre",
    filterName: "name",
  },
  {
    displayName: "Observaciones",
    filterName: "observations",
  },

  {
    displayName: "Acciones",
    filterName: "Acciones",
  },
];

export default function ReportsManagment() {
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
    fetchReports();
  }, [page]);

  function viewAction(id) {
    navigate(`ver/${id}`);
  }
  function editAction(id) {
    navigate(`editar/${id}`);
  }
  function fetchReports() {
    const filter = {
      search_terms: [search, search],
      search_fields: ["name", "code"],
      search_operators: ["icontains", "exact"],
    };
    ReportsAdapter.getWithPagination(page, pageSize, filter).then((res) => {
      setTotalPages(Math.ceil(res.total / pageSize));
      setTotalItems(res.total);
      setTableRows(res.data);
    });
  }

  function deleteAction(id) {
    ReportsAdapter.deleteOneById(id)
      .then(() => {
        alert("Reporte eliminado correctamente.");
        fetchReports();
      })
      .catch((error) => alert("Ocurrio un error al eliminar el reporte."));
  }
  function viewAction(id) {
    navigate(`ver/${id}`);
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
      fetchReports();
    }
  }
  function handleSearchIcon() {
    getPersonsPaginated();
  }
  return (
    <Card className="h-full w-full py-10">
      <CardHeader variant="gradient" className={`p-6 bg-secondary`}>
        <Typography variant="h6" color="white">
          Reportes
        </Typography>
      </CardHeader>
      <CardHeader floated={false} shadow={false} className=" p-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center shrink-0 flex-col gap-4 sm:flex-row">
            <Link to={"crear"}>
              <Button
                size="sm"
                className={`flex items-center gap-3 rounded-full normal-case bg-primary`}
              >
                <BookOpenIcon className="w-5 h-5" />
                <span>Crear nuevo reporte</span>
              </Button>
            </Link>
          </div>

          <div className="w-full md:w-72 flex flex-end ">
            <Input
              color="deep-orange"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              label="Buscar reporte..."
              icon={
                <MagnifyingGlassIcon
                  onClick={() => handleSearchIcon()}
                  className="h-5 w-5"
                />
              }
            />
          </div>
        </div>
      </CardHeader>

      <CardBody className="overflow-scroll px-0">
        {
          <ManagmentTable
            tableHead={TABLE_HEAD}
            tableRows={tableRows}
            setTableRows={setTableRows}
            viewAction={viewAction}
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
