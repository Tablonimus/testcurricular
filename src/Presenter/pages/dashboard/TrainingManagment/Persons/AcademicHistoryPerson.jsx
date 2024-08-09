import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Tooltip,
  CardFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ManagmentTable } from "../../../../components/Tables/ManagmentTable";
import { PersonsAdapter } from "../../../../../Infra/Adapters/Persons/persons.adapter";
import { VersionsAdapter } from "../../../../../Infra/Adapters/Versions/versions.adapter";

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
const TABLE_HEAD_ACTIVITY = [
  {
    displayName: "Actividad",
    filterName: "activity_thematic_area",
  },
  {
    displayName: "Capacitación",
    filterName: "activity_name",
  },
  {
    displayName: "Nota",
    filterName: "qualification",
  },
  {
    displayName: "Asistencia",
    filterName: "attendance",
  },
  {
    displayName: "Estado",
    filterName: "in_wait_list",
  },
  {
    displayName: "Fecha Inicio",
    filterName: "course_start_date",
  },
  {
    displayName: "Fecha Finalización",
    filterName: "course_end_date",
  },
];

export default function AcademicHistoryPerson() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [person, setPerson] = useState([]);
  const [tableActivitiesRows, setTableActivitiesRows] = useState([]);

  useEffect(() => {
    PersonsAdapter.getById(id).then((res) => setPerson(res));
    VersionsAdapter.getPersonByVersionDetail(id).then((res) =>
      setTableActivitiesRows(res)
    );
  }, []);

  return (
    <Card className="h-full w-full pt-4">
      <CardHeader variant="gradient" className="mt-0 p-6 bg-[--secondary]">
        <Typography variant="h6" color="white">
          Historial académico
        </Typography>
      </CardHeader>
      <CardHeader
        floated={false}
        shadow={false}
        className="flex  justify-between  items-center px-4 mb-0"
      >
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
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
            Actividades vinculadas
          </Typography>

          <ManagmentTable
            tableHead={TABLE_HEAD_ACTIVITY}
            tableRows={tableActivitiesRows}
            setTableRows={setTableActivitiesRows}
          />
        </div>
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
