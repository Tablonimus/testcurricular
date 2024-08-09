import { UserPlusIcon, PencilIcon } from "@heroicons/react/24/solid";
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

export default function AddInstitution() {
  const navigate = useNavigate();
  const [input, setInput] = useState({});
  const [institutionsSectorsState, setInstitutionsSectorsState] = useState([]);
  const [institutionsTypesState, setInstitutionsTypesState] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    InstitutionsAdapter.getInstitutionsMenu().then((res) => {
      setInstitutionsSectorsState(res.institutionSectors);
      setInstitutionsTypesState(res.institutionTypes);
    });
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
          Crear nueva institución / entidad no registrada
        </Typography>
      </CardHeader>
      <CardBody className="overflow-scroll px-0 w-full min-h-96">
        <form className="mb-2 w-full  flex flex-col md:flex-row justify-center gap-4">
          <div className="mb-1 w-full flex flex-col gap-6">
            <div className="flex flex-wrap">
              <div className="min-w-56 w-1/6 px-4 pb-1">
                <Typography variant="h6" color="blue-gray" className="">
                  RUT
                </Typography>
                <Input
                  name="doc_number"
                  size="lg"
                  placeholder="RUT"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(e) => handleInput(e)}
                  error={error.doc_number}
                />
                {error.doc_number &&
                  error.doc_number.map((error) => (
                    <span className="text-red-500 text-sm ">{error}</span>
                  ))}
              </div>
              <div className="min-w-56 w-1/4 px-4 pb-1">
                <Typography variant="h6" color="blue-gray" className="">
                  Nombre de institución
                </Typography>
                <Input
                  name="name"
                  size="lg"
                  placeholder="Ingrese el nombre de la institución..."
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(e) => handleInput(e)}
                  error={error.name}
                />
                {error.name &&
                  error.name.map((error) => (
                    <span className="text-red-500 text-sm ">{error}</span>
                  ))}
              </div>
              <div className="min-w-56 w-1/4 px-4 pb-1">
                <Typography variant="h6" color="blue-gray" className="">
                  Correo electrónico
                </Typography>
                <Input
                  name="email"
                  size="lg"
                  placeholder="correo@ejemplo.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(e) => handleInput(e)}
                  error={error.email}
                />
                {error.email &&
                  error.email.map((error) => (
                    <span className="text-red-500 text-sm ">{error}</span>
                  ))}
              </div>
              <div className="min-w-56 w-1/4 px-4 pb-1">
                <Typography variant="h6" color="blue-gray" className="">
                  Tipo de institución
                </Typography>
                <select
                  onChange={(e) => handleInput(e)}
                  name="institution_type"
                  className={
                    "block h-12 border border-gray w-full rounded" +
                    `${error.institution_type ? "border border-red-500" : false}`
                  }
                >
                  <option selected value={""} disabled>
                    Reportantes / No Reportantes
                  </option>

                  {institutionsTypesState?.map((type, index) => (
                    <option value={type.id} key={index}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {error.institution_type &&
                  error.institution_type.map((error) => (
                    <span className="text-red-500 text-sm ">{error}</span>
                  ))}
              </div>
              <div className="min-w-56 w-1/4 px-4 pb-1">
                <Typography variant="h6" color="blue-gray" className="">
                  Sector al que pertenece
                </Typography>
                <select
                  onChange={(e) => handleInput(e)}
                  name="institution_sector"
                  className={
                    "block h-12 border border-gray w-full rounded" +
                    `${error.institution_sector ? "border border-red-500" : false}`
                  }
                >
                  <option selected value={""} disabled>
                    Seleccione un sector...{" "}
                  </option>
                  {institutionsSectorsState?.map((sector, index) => (
                    <option value={sector.id} key={index}>
                      {sector.name}
                    </option>
                  ))}
                </select>
                {error.institution_sector &&
                  error.institution_sector.map((error) => (
                    <span className="text-red-500 text-sm ">{error}</span>
                  ))}
              </div>
              <div className="min-w-56 w-1/4 px-4 pb-1">
                <Typography variant="h6" color="blue-gray" className="">
                  MILAFT
                </Typography>
                <select
                  onChange={(e) => handleInput(e)}
                  name="milaft"
                  className={
                    "block h-12 border border-gray w-full rounded" +
                    `${error.milaft ? "border border-red-500" : false}`
                  }
                >
                  <option selected value={""} disabled>
                    SI / NO
                  </option>
                  <option value={true}>SI</option>
                  <option value={false}>NO</option>
                  {/* {roles.map((role, index) => (
                    <option value={role.id} key={index}>
                      {role.name}
                    </option>
                  ))} */}
                </select>
                {error.milaft &&
                  error.milaft.map((error) => (
                    <span className="text-red-500 text-sm ">{error}</span>
                  ))}
              </div>
            </div>
          </div>
        </form>
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
            navigate("/dashboard/gestion/instituciones");
          }}
          // rightButtonAction={}
        />
      </CardFooter>
    </Card>
  );
}
