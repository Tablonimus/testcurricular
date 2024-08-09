import {
  AcademicCapIcon,
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

export default function CertificatesManagment() {
  const navigate = useNavigate();
  const [tableRows, setTableRows] = useState([]);
  const [page, setPage] = useState(1);
  const page_size = 5;
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    getInstitutions();
  }, [page]);

  function getInstitutions() {
    const filter = {
      search_terms: [search, search],
      search_fields: ["name", "code"],
      search_operators: ["icontains", "exact"],
    };
    InstitutionsAdapter.get().then((res) => {
      setTableRows(res);
    });
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
  function handleSearch(event) {
    if (event.key === "Enter") {
      getInstitutions();
    }
  }
  return (
    <Card className="h-full w-full pt-4">
      <CardHeader variant="gradient" className="mt-0 p-6 bg-[--secondary]">
        <Typography variant="h6" color="white">
          Certificados
        </Typography>
      </CardHeader>
      <CardHeader
        floated={false}
        shadow={false}
        className="flex  justify-between  items-center h-14  px-6"
      >
        <div className="w-full flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center shrink-0 flex-col gap-4 sm:flex-row">
            <Link to={"crear"}>
              <Button
                size="sm"
                className={`flex items-center gap-3 rounded-full normal-case bg-primary`}
              >
                <AcademicCapIcon className="w-5 h-5" />
                <span>Crear nuevo certificado</span>
              </Button>
            </Link>
          </div>

          <div className="w-full md:w-72 flex flex-end ">
            <Input
              color="deep-orange"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              label="Buscar certificado..."
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>

      <CardBody className="overflow-scroll px-0"></CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Página 1 de {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button
            onClick={() => handlePreviousPage()}
            variant="outlined"
            size="sm"
          >
            Anterior
          </Button>
          <Button onClick={() => handleNextPage()} variant="outlined" size="sm">
            Siguiente
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
