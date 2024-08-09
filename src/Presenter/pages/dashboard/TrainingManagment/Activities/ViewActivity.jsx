import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ActivitiesAdapter } from "../../../../../Infra/Adapters/Activities/activities.adapter";

export default function ViewActivity() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activity, setActivity] = useState({});

  useEffect(() => {
    async function fetchActivity() {
      const activityData = await ActivitiesAdapter.getById(id);
      setActivity(activityData);
    }
    fetchActivity();
  }, [id]);

  return (
    <Card className="h-full w-full py-10">
      <CardHeader variant="gradient" className="p-6 bg-secondary flex">
        <Typography
          variant="h6"
          color="white"
          className="flex items-center gap-3"
        >
          Ver Actividad
        </Typography>
      </CardHeader>
      <CardBody className="overflow-scroll px-6 w-full flex flex-col gap-6">
        <section className="flex flex-wrap gap-3">
          <div className="min-w-56">
            <Typography variant="h6" color="blue-gray">
              Código
            </Typography>
            <Typography>{activity.code}</Typography>
          </div>
          <div className="min-w-56 w-2/3">
            <Typography variant="h6" color="blue-gray">
              Nombre de la actividad
            </Typography>
            <Typography>{activity.name}</Typography>
          </div>
          <div className="min-w-56">
            <Typography variant="h6" color="blue-gray">
              Tipo
            </Typography>
            <Typography>{activity.type}</Typography>
          </div>
          <div className="min-w-56 w-1/3">
            <Typography variant="h6" color="blue-gray">
              Area temática(s)
            </Typography>
            <Typography>{activity.thematic_area}</Typography>
          </div>
        </section>
        <section>
          <Typography variant="h6" color="blue-gray">
            Presentación
          </Typography>
          <div className="rounded-lg">
            <ReactQuill
              className="w-full h-full shadow-xl rounded-xl"
              theme="snow"
              value={activity.presentation}
              readOnly={true}
              modules={{ toolbar: false }}
            />
          </div>
        </section>
        <section>
          <Typography variant="h6" color="blue-gray">
            Objetivos
          </Typography>
          <div className="rounded-lg">
            <ReactQuill
              className="w-full h-full shadow-xl rounded-xl"
              theme="snow"
              value={activity.objectives}
              readOnly={true}
              modules={{ toolbar: false }}
            />
          </div>
        </section>
        <section>
          <Typography variant="h6" color="blue-gray">
            Temario
          </Typography>
          <div className="rounded-lg">
            <ReactQuill
              className="w-full h-full shadow-xl rounded-xl"
              theme="snow"
              value={activity.program}
              readOnly={true}
              modules={{ toolbar: false }}
            />
          </div>
        </section>
        <section>
          <Typography variant="h6" color="blue-gray">
            Anexos
          </Typography>
          <div className="shadow-xl rounded-xl p-2 border-gray">
            {/* Assuming activity.attachments is an array of file URLs */}
            {activity.attachments && activity.attachments.map((file, index) => (
              <Typography key={index}>
                <a href={file} target="_blank" rel="noopener noreferrer">
                  {file}
                </a>
              </Typography>
            ))}
          </div>
        </section>
      </CardBody>
    </Card>
  );
}
