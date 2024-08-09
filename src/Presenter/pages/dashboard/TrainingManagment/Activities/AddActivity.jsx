import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

import ModalButton from "../../../../components/Buttons/ModalButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ActivitiesAdapter } from "../../../../../Infra/Adapters/Activities/activities.adapter";

const modalText = {
  title: "¿Está seguro de salir sin guardar los cambios?",
  content: "Esta acción descartará los cambios realizados en el registro.",
  leftButtonText: "Salir",
  rightButtonText: "Volver",
};

export default function AddActivity() {
  const navigate = useNavigate();
  const [themesValue, setThemesValue] = useState("");
  const [presentationValue, setPresentationValue] = useState("");
  const [objectivesValue, setObjectivesValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [thematicAreaValue, setThematicAreaValue] = useState("");
  function handleSubmit(){
    const activity = {
      code: codeValue, 
      name: nameValue, 
      type: typeValue, 
      thematic_area: thematicAreaValue, 
      presentation: presentationValue, 
      objectives: objectivesValue, 
      program: themesValue
    }
    ActivitiesAdapter.createOne(activity).then((response)=>{
      alert('Actividad creada correctamente');
      navigate('/dashboard/gestion/actividades')
    }).catch((error)=>{
      alert('Ocurrio un error al crear la actividad');
    })
  }
  return (
    <Card className="h-full w-full py-10">
      <CardHeader variant="gradient" className=" p-6 bg-secondary flex">
        <Typography
          variant="h6"
          color="white"
          className="flex items-center gap-3 "
        >
          Nueva Actividad
        </Typography>
      </CardHeader>
      <CardBody className="overflow-scroll px-6 w-full flex flex-col gap-6">
        <section className="flex flex-wrap gap-3">
          <div className="min-w-56">
            <Typography variant="h6" color="blue-gray" className="">
              Código
            </Typography>
            <Input
              type="text"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-xl"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e)=>setCodeValue(e.target.value)}
            />
          </div>
          <div className="min-w-56 w-2/3">
            <Typography variant="h6" color="blue-gray" className="">
              Nombre de la actividad
            </Typography>
            <Input
              type="text"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-xl"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e)=>setNameValue(e.target.value)}
            />
          </div>
          <div className="min-w-56">
            <Typography variant="h6" color="blue-gray" className="">
              Tipo
            </Typography>
            <Input
              type="number"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-xl"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e)=>setTypeValue(e.target.value)}
            />
          </div>
          <div className="min-w-56 w-1/3">
            <Typography variant="h6" color="blue-gray" className="">
              Area temática(s)
            </Typography>
            <Input
              type="text"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 rounded-xl"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e)=>setThematicAreaValue(e.target.value)}
            />
          </div>
        </section>
        <section>
          <Typography variant="h6" color="blue-gray" className="">
            Presentación
          </Typography>
          <div className="rounded-lg">
            <ReactQuill
              className=" w-full h-full shadow-xl rounded-xl"
              theme="snow"
              name="content"
              value={presentationValue}
              onChange={setPresentationValue}
            />
          </div>
        </section>
        <section>
          <Typography variant="h6" color="blue-gray" className="">
            Objetivos
          </Typography>
          <div className="rounded-lg">
            <ReactQuill
              className=" w-full h-full shadow-xl rounded-xl"
              theme="snow"
              name="content"
              value={objectivesValue}
              onChange={setObjectivesValue}
            />
          </div>
        </section>
        <section>
          <Typography variant="h6" color="blue-gray" className="">
            Temario
          </Typography>
          <div className="rounded-lg">
            <ReactQuill
              className=" w-full h-full shadow-xl rounded-xl"
              theme="snow"
              name="content"
              value={themesValue}
              onChange={setThemesValue}
            />
          </div>
        </section>
        <section>
          <Typography variant="h6" color="blue-gray" className="">
            Anexos
          </Typography>
          <div className="shadow-xl rounded-xl p-2 border-gray">
            <input type="file" className="" />
          </div>
        </section>
      </CardBody>

      <CardFooter className="flex items-center justify-end border-t border-blue-gray-50 p-4 gap-6">
        <Button onClick={handleSubmit} className="bg-primary">GUARDAR</Button>

        <ModalButton
          innerButtonText={"Salir"}
          color={"bg-primary"}
          variant={"outlined"}
          severity={"warning"}
          title={modalText.title}
          content={modalText.content}
          leftButtonText={modalText.leftButtonText}
          rightButtonText={modalText.rightButtonText}
          leftButtonAction={(e) => {
            navigate("/dashboard/gestion/actividades");
          }}
          // rightButtonAction={}
        />
      </CardFooter>
    </Card>
  );
}
