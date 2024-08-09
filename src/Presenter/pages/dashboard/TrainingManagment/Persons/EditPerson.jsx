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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PersonsAdapter } from "../../../../../Infra/Adapters/Persons/persons.adapter";
import { InstitutionsAdapter } from "../../../../../Infra/Adapters/Institutions/institutions.adapter";

const modalText = {
  title: "¿Está seguro de salir sin guardar los cambios?",
  content: "Esta acción descartará los cambios realizados en el registro.",
  leftButtonText: "Salir",
  rightButtonText: "Volver",
};

export default function EditPerson() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [input, setInput] = useState({});
  const [personState, setPersonState] = useState({});
  const [institutionsState, setInstitutionsState] = useState([]);

  const [error, setError] = useState({});

  useEffect(() => {
    PersonsAdapter.getById(id).then((res) => {
      setInput(res);
      setPersonState(res);
      console.log(res)
    });
    InstitutionsAdapter.get().then((res) => setInstitutionsState(res));

  }, []);


  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelectProfile = (e) => {
    setInput({ ...input, ["profile"]: e.target.value });
  };
  const handleSelectSector = (e) => {
    setInput({ ...input, ["sector"]: e.target.value });
  };
  const handleSelectCharge = (e) => {
    setInput({ ...input, ["charge"]: e.target.value });
  };
  const handleSelectInstitution = (e) => {
    console.log(e.target.value)
    setInput({ ...input, ["institution"]: e.target.value });
  };

  const handleSubmit = async () => {
    setError({});
    try {
      await PersonsAdapter.editOneById(id, input);
      navigate("/dashboard/gestion/personas");
    } catch (errorsObject) {
      console.log(errorsObject);
      setError({ ...error, ...errorsObject });
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
          Editar persona
        </Typography>
      </CardHeader>
      <CardBody className="overflow-scroll px-0 w-full min-h-96">
        <form className="mb-2 w-full  flex flex-col md:flex-row justify-center gap-4">
          <div className="mb-1 w-full flex flex-col gap-6">
            <div className="flex flex-wrap">
              <div className="min-w-56 w-1/3 px-4 ">
                <Typography variant="h6" color="blue-gray" className="">
                  Tipo de persona
                </Typography>
                <select
                  onChange={(e) => handleSelectProfile(e)}
                  className={
                    "block h-12 border border-gray w-full rounded" +
                    `${error.profile ? "border border-red-500" : false}`
                  }
                >
              
                  <option
                    selected={personState.profile === 1}
                    value={1}
                  >
                    Invitada
                  </option>
                  <option
                    selected={personState.profile === 2}
                    value={2}
                  >
                    Entidad Reportante
                  </option>
                </select>
                {error.profile &&
                  error.profile.map((error, index) => (
                    <span key={index} className="text-red-500 text-sm ">
                      {error}
                    </span>
                  ))}
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="min-w-56 w-1/5 px-4 pb-1">
                <Typography variant="h6" color="blue-gray" className="">
                  RUN
                </Typography>
                <Input
                  size="lg"
                  placeholder=""
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  defaultValue={input?.run}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="run"
                  onChange={(e) => handleInput(e)}
                  error={error.run}
                />
                {error.run &&
                  error.run.map((error, index) => (
                    <span key={index} className="text-red-500 text-sm ">
                      {error}
                    </span>
                  ))}
              </div>
              <div className="min-w-56 w-1/5 px-4 pb-1">
                <Typography variant="h6" color="blue-gray" className="">
                  Nombre
                </Typography>
                <Input
                  size="lg"
                  placeholder="Inserte un nombre..."
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  defaultValue={input?.name}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="name"
                  onChange={(e) => handleInput(e)}
                  error={error.name}
                />
                {error.name &&
                  error.name.map((error, index) => (
                    <span key={index} className="text-red-500 text-sm ">
                      {error}
                    </span>
                  ))}
              </div>
              <div className="min-w-56 w-1/5 px-4 pb-1">
                <Typography variant="h6" color="blue-gray" className="">
                  Apellido paterno
                </Typography>
                <Input
                  size="lg"
                  placeholder="last_name"
                  defaultValue={input?.last_name}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="last_name"
                  onChange={(e) => handleInput(e)}
                  error={error.last_name}
                />
                {error.last_name &&
                  error.last_name.map((error, index) => (
                    <span key={index} className="text-red-500 text-sm ">
                      {error}
                    </span>
                  ))}
              </div>
              <div className="min-w-56 w-1/5 px-4 pb-1">
                <Typography variant="h6" color="blue-gray" className="">
                  Apellido materno
                </Typography>
                <Input
                  size="lg"
                  placeholder="mother_last_name"
                  defaultValue={input?.mother_last_name}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="mother_last_name"
                  onChange={(e) => handleInput(e)}
                  error={error.mother_last_name}
                />
                {error.mother_last_name &&
                  error.mother_last_name.map((error, index) => (
                    <span key={index} className="text-red-500 text-sm ">
                      {error}
                    </span>
                  ))}
              </div>
              <div className="min-w-56 w-1/5 px-4 pb-1">
                <Typography variant="h6" color="blue-gray" className="">
                  Correo
                </Typography>
                <Input
                  size="lg"
                  placeholder="email"
                  defaultValue={input?.email}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="email"
                  onChange={(e) => handleInput(e)}
                  error={error.email}
                />
                {error.email &&
                  error.email.map((error, index) => (
                    <span key={index} className="text-red-500 text-sm ">
                      {error}
                    </span>
                  ))}
              </div>
              <div className="min-w-56 w-1/5 px-4 pb-1">
                <Typography variant="h6" color="blue-gray" className="">
                  Teléfono
                </Typography>
                <Input
                  size="lg"
                  placeholder="phone_number"
                  defaultValue={input?.phone_number}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="phone_number"
                  onChange={(e) => handleInput(e)}
                  error={error.phone_number}
                />
                {error.phone_number &&
                  error.phone_number.map((error, index) => (
                    <span key={index} className="text-red-500 text-sm ">
                      {error}
                    </span>
                  ))}
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="min-w-56 w-1/5 px-4 pb-1">
                <Typography variant="h6" color="blue-gray" className="">
                  Sector
                </Typography>
                <select
                  onChange={(e) => handleSelectSector(e)}
                  className={
                    "block h-12 border border-gray w-full rounded" +
                    `${error.sector ? "border border-red-500" : false}`
                  }
                >
                  <option
                    selected={personState.sector === 1}
                    value={1}
                  >
                    Sector 1
                  </option>
                  <option
                    selected={personState.sector === 2}
                    value={2}
                  >
                    Sector 2
                  </option>
                </select>
                {error.sector &&
                  error.sector.map((error, index) => (
                    <span key={index} className="text-red-500 text-sm ">
                      {error}
                    </span>
                  ))}
              </div>
              <div className="min-w-56 w-1/4 px-4 pb-1">
                <Typography variant="h6" color="blue-gray" className="">
                  Intitución / Entidad a la que pertenece
                </Typography>
                <select
                  onChange={(e) => handleSelectInstitution(e)}
                  className={
                    "block h-12 border border-gray w-full rounded" +
                    `${error.institution ? "border border-red-500" : false}`
                  }
                  value={personState.institution}
                >
                  {institutionsState.map((element)=>(
                  <option value={element.id}>{element.name}</option>
                  ))}
                </select>
                {error.institution &&
                  error.institution.map((error, index) => (
                    <span key={index} className="text-red-500 text-sm ">
                      {error}
                    </span>
                  ))}
              </div>

              <div className="min-w-56 w-1/5 px-4 pb-1">
                <Typography variant="h6" color="blue-gray" className="">
                  RUT Entidad
                </Typography>
                <Input
                  size="lg"
                  placeholder="entity_rut"
                  defaultValue={input?.entity_rut || input?.rut}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="entity_rut"
                  onChange={(e) => handleInput(e)}
                  error={error.entity_rut || error.rut}
                />
                {error.entity_rut &&
                  error.entity_rut.map((error, index) => (
                    <span key={index} className="text-red-500 text-sm ">
                      {error}
                    </span>
                  ))}
              </div>

              <div className="min-w-56 w-1/4 px-4 pb-1">
                <Typography variant="h6" color="blue-gray" className="">
                  Cargo
                </Typography>
                <select
                  onChange={(e) => handleSelectCharge(e)}
                  className={
                    "block h-12 border border-gray w-full rounded" +
                    `${error.charge ? "border border-red-500" : false}`
                  }
                >
               
                  <option
                    selected={personState.charge === 1}
                    value={1}
                  >
                    Cargo 1
                  </option>
                  <option
                    selected={personState.charge === 2}
                    value={2}
                  >
                    Cargo 2
                  </option>
                </select>
                {error.charge &&
                  error.charge.map((error, index) => (
                    <span key={index} className="text-red-500 text-sm ">
                      {error}
                    </span>
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
            navigate("/dashboard/gestion/personas");
          }}
          // rightButtonAction={}
        />
      </CardFooter>
    </Card>
  );
}
