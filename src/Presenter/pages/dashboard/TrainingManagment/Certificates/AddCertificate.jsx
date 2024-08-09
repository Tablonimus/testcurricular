import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { InstitutionsAdapter } from "../../../../../Infra/Adapters/Institutions/institutions.adapter";
import ModalButton from "../../../../components/Buttons/ModalButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const modalText = {
  title: "¿Está seguro de salir sin guardar los cambios?",
  content: "Esta acción descartará los cambios realizados en el registro.",
  leftButtonText: "Salir",
  rightButtonText: "Volver",
};

export default function AddCertificate() {
  const navigate = useNavigate();
  const [input, setInput] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {

  }, []);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError({});

    try {
      await InstitutionsAdapter.createOne(input);
      navigate("/dashboard/gestion/instituciones");
    } catch (errorsObject) {
      setError({ ...errorsObject });
    }
  };

  return (
    <Card className="min-h-[85vh] h-full w-full">
      <CardHeader
        floated={false}
        variant="gradient"
        className="p-6 bg-[--secondary] flex"
      >
        <Typography variant="h6" className="flex items-center gap-3 text-white">
        Nuevo certificado
        </Typography>
      </CardHeader>
      <CardBody className="overflow-scroll px-0 w-full min-h-96"> 

        
      </CardBody>
      <CardFooter className="flex items-center justify-end border-t border-blue-gray-50 p-4 gap-6">
        <Button className="bg-[--secondary]" onClick={handleSubmit}>
          GUARDAR
        </Button>
        <ModalButton
          innerButtonText={"Salir"}
          variant={"outlined"}
          severity={"warning"}
          title={modalText.title}
          content={modalText.content}
          openButtonStyles={"border-[--secondary] text-[--secondary]"}
          leftButtonText={modalText.leftButtonText}
          leftButtonStyles={"text-white bg-[--secondary]"}
          rightButtonStyles={
            "text-[--secondary] bg-transparent border border-[--secondary]"
          }
          rightButtonText={modalText.rightButtonText}
          leftButtonAction={(e) => {
            navigate("/dashboard/gestion/certificados");
          }}
          // rightButtonAction={}
        />
      </CardFooter>
    </Card>
  );
}
