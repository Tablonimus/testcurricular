import { BookOpenIcon, EyeIcon, MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
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
import { ActivitiesAdapter } from "../../../../../Infra/Adapters/Activities/activities.adapter";
import TablePaginator from "../../../../components/Paginators/TablePaginator";

const TABLE_HEAD = [
  {
    displayName: "Código",
    filterName: "code",
  },
  {
    displayName: "Nombre",
    filterName: "name",
  },
  {
    displayName: "Area Temática",
    filterName: "thematic_area",
  },
  {
    displayName: "Tipo",
    filterName: "type",
  },
  {
    displayName: "Fecha Último Ingreso de Versión",
    filterName: "last_version_date",
  },
  {
    displayName: "Acciones",
    filterName: "Acciones",
  },
];

export default function ActivitiesManagment() {
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
    fetchActivities();
  }, [page, pageSize]);

  function fetchActivities() {
    const filter = {
      search_terms: [search, search],
      search_fields: ["name", "code"],
      search_operators: ["icontains", "exact"],
    };
    ActivitiesAdapter.getWithPagination(page, pageSize, filter).then((res) => {
      setTotalPages(Math.ceil(res.total / pageSize));
      setTableRows(res.data);
      setTotalItems(res.total);
    });
  }

  function deleteAction(id) {
    ActivitiesAdapter.deleteOneById(id)
      .then(() => {
        alert("Actividad eliminada correctamente.");
        fetchActivities();
      })
      .catch((error) => alert("Ocurrio un error al eliminar la actividad."));
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
      fetchActivities();
    }
  }
  return (
    <Card className="h-full w-full py-10">
      <CardHeader variant="gradient" className={`p-6 bg-secondary`}>
        <Typography variant="h6" color="white">
          Gestión Actividades
        </Typography>
      </CardHeader>
      <CardHeader
        floated={false}
        shadow={false}
        className="flex  justify-between  items-center h-24 px-6 mb-0"
      >
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center shrink-0 flex-col gap-4 sm:flex-row">
            <Link to={"crear"}>
              <Button
                size="sm"
                className={`flex items-center gap-3 rounded-full normal-case bg-primary`}
              >
                <BookOpenIcon className="w-5 h-5" />
                <span>Crear nueva actividad</span>
              </Button>
            </Link>
          </div>

          <div className="w-full md:w-72 flex flex-end ">
            <Input
              color="deep-orange"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              label="Buscar actividad..."
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
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
                action: viewAction,
                tooltipText: "Ver",
                icon: <EyeIcon className="w-5 h-5" />,
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
