import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  ListItem,
  List,
  Tooltip,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalButton from "../../../components/Buttons/ModalButton";
import { ReportsAdapter } from "../../../../Infra/Adapters/Reports/reports.adapter";
import ArrowIcon from "../../../components/Icons/ArrowButtonIcon";
import { TrashIcon } from "@heroicons/react/24/solid";

const modalText = {
  title: "¿Está seguro de salir sin guardar los cambios?",
  content: "Esta acción descartará los cambios realizados en el registro.",
  leftButtonText: "Salir",
  rightButtonText: "Volver",
};

export default function AddReport() {
  const navigate = useNavigate();
  const [nameValue, setNameValue] = useState("");
  const [obsValue, setObsValue] = useState("");
  const [sqlValue, setSqlValue] = useState("");
  const [filterItems, setFilterItems] = useState([]);
  const [filterNameValue, setFilterNameValue] = useState("");
  const [filterDataTypeValue, setFilterDataTypeValue] = useState("");
  const [filterOrderValue, setFilterOrderValue] = useState("");
  const [filterVariableValue, setFilterVariableValue] = useState("");
  const [filterOperatorValue, setFilterOperatorValue] = useState("");

  function handleFilterAdd() {
    const filter = {
      name: filterNameValue,
      dataType: filterDataTypeValue,
      order: filterOrderValue,
      variable: filterVariableValue,
      operator: filterOperatorValue,
    };
    const filterArray = [...filterItems];
    filterArray.push(filter);
    setFilterNameValue("");
    setFilterDataTypeValue("");
    setFilterOrderValue("");
    setFilterVariableValue("");
    setFilterOperatorValue("");
    setFilterItems(filterArray);
  }

  function deleteAction(index) {
    let filters = [...filterItems];
    filters = filters.filter((e, i) => i != index);
    setFilterItems(filters);
  }
  function handleSubmit() {
    const filters = buildFilters();
    const report = {
      name: nameValue,
      observations: obsValue,
      query: sqlValue,
      filters: filters ,
    };
    ReportsAdapter.createOne(report)
      .then((response) => {
        alert("Reporte creado correctamente");
        navigate("/dashboard/reportes/reportes");
      })
      .catch((error) => {
        alert("Ocurrió un error al crear el reporte");
      });
  }
  function buildFilters(){
    const variables = [];
    const data_types = [];
    const search_fields = [];
    const search_operators = [];
    const items = filterItems.sort((a, b) => a.order - b.order);
    items.forEach((item)=>{
      variables.push(item.name);
      data_types.push(item.dataType);
      search_fields.push(item.variable);
      search_operators.push(item.operator)
    })
    return {names: variables, data_types: data_types, search_fields: search_fields, search_operators: search_operators}
  }
  return (
    <Card className="h-full w-full py-10 flex flex-col">
      <CardHeader variant="gradient" className="p-6 bg-secondary flex">
        <Typography
          variant="h6"
          color="white"
          className="flex items-center gap-3"
        >
          Crear nuevo reporte
        </Typography>
      </CardHeader>
      <CardBody className="overflow-scroll px-6 w-full flex flex-col gap-6 flex-1">
        <section
          id="general-container"
          className="flex flex-col md:flex-row h-full gap-6"
        >
          <section className="w-full md:w-1/2 flex flex-col gap-6">
            <section id="name-container">
              <div>
                <Typography variant="h6" color="blue-gray">
                  Nombre de Reporte
                </Typography>
                <Input
                  onChange={(e) => setNameValue(e.target.value)}
                  type="text"
                  size="md"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 rounded-xl"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            </section>
            <section id="obs-container">
              <div>
                <Typography variant="h6" color="blue-gray">
                  Observaciones
                </Typography>
                <Input
                  onChange={(e) => setObsValue(e.target.value)}
                  type="text"
                  size="md"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 rounded-xl"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            </section>
            <section>
              <Typography variant="h6" className="flex items-center gap-3">
                Creación de tipo de dato
              </Typography>
              <section
  id="filter-create-container"
  className="flex flex-col md:flex-row items-center gap-4"
>
  <div className="w-full flex flex-col gap-2 md:flex-row md:items-center">
    <div className="w-full md:w-1/2 flex flex-col gap-4">
      <Card
        style={{
          maxWidth: "450px",
          border: "1px solid #92989C",
          boxShadow: "none",
        }}
        className="w-full text-xs"
      >
        <List>
          <ListItem>
            <Input
              onChange={(e) => setFilterNameValue(e.target.value)}
              value={filterNameValue}
              size="xs"
              label="Nombre"
              className="w-full text-sm"
            />
          </ListItem>
          <ListItem>
            <Input
              onChange={(e) => setFilterDataTypeValue(e.target.value)}
              value={filterDataTypeValue}
              size="xs"
              label="Tipo de dato"
              className="w-full text-sm"
            />
          </ListItem>
          <ListItem>
            <Input
              type="number"
              onChange={(e) => setFilterOrderValue(e.target.value)}
              value={filterOrderValue}
              size="xs"
              label="Orden"
              className="w-full text-sm"
            />
          </ListItem>
          <ListItem>
            <Input
              onChange={(e) => setFilterVariableValue(e.target.value)}
              value={filterVariableValue}
              size="xs"
              label="Variable"
              className="w-full text-sm"
            />
          </ListItem>
          <ListItem>
            <Input
              onChange={(e) => setFilterOperatorValue(e.target.value)}
              value={filterOperatorValue}
              size="xs"
              label="Operador"
              className="w-full text-sm"
            />
          </ListItem>
        </List>
      </Card>
    </div>
    <div className="flex items-center justify-center">
      <Button
        onClick={(e) => handleFilterAdd()}
        style={{
          background: "#92989C",
          width: "30px",
          height: "30px",
          padding: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ArrowIcon />
      </Button>
    </div>
    <div className="w-full md:w-1/3 flex flex-col gap-4">
      <Card
        style={{
          border: "1px solid #92989C",
          boxShadow: "none",
          height: "350px",
        }}
        className="text-xs overflow-y-auto"
      >
        <List className="space-y-0">
          {filterItems.map((item, index) => (
            <ListItem key={index}>
              <Typography
                variant="h6"
                className="flex items-center gap-3 w-full"
              >
                {item.name}
              </Typography>
              <Tooltip content="Eliminar">
                <button onClick={() => deleteAction(index)}>
                  <TrashIcon className="w-5 h-5" />
                </button>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  </div>
</section>

            </section>
          </section>
          <section
            id="sql-container"
            className="w-full md:w-1/2 h-full flex flex-col gap-4"
          >
            <div className="flex flex-col h-full gap-4">
              <Typography variant="h6" color="blue-gray">
                SQL
              </Typography>
              <textarea
                className="w-full h-full p-2 rounded-xl border border-gray-300 resize-none text-sm"
                onChange={(e) => setSqlValue(e.target.value)}
              ></textarea>
            </div>
          </section>
        </section>
      </CardBody>

      <CardFooter className="flex items-center justify-end border-t border-blue-gray-50 p-4 gap-6">
        <Button onClick={(e)=>handleSubmit()} className="bg-primary">
          GUARDAR
        </Button>
        <ModalButton
          innerButtonText={"Salir"}
          color={"bg-primary"}
          variant={"outlined"}
          severity={"warning"}
          title={modalText.title}
          content={modalText.content}
          leftButtonText={modalText.leftButtonText}
          rightButtonText={modalText.rightButtonText}
          leftButtonAction={() => navigate("/dashboard/gestion/reportes")}
          // rightButtonAction={}
        />
      </CardFooter>
    </Card>
  );
}
