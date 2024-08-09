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
import { useNavigate, useParams } from "react-router-dom";
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

export default function EditReport() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el ID del reporte desde los parámetros de la URL

  const [report, setReport] = useState(null);
  const [nameValue, setNameValue] = useState("");
  const [obsValue, setObsValue] = useState("");
  const [sqlValue, setSqlValue] = useState("");
  const [filterItems, setFilterItems] = useState({
    names: [],
    data_types: [],
    search_fields: [],
    search_operators: [],
  });
  const [filterNameValue, setFilterNameValue] = useState("");
  const [filterDataTypeValue, setFilterDataTypeValue] = useState("");
  const [filterSearchFieldValue, setFilterSearchFieldValue] = useState("");
  const [filterOperatorValue, setFilterOperatorValue] = useState("");

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await ReportsAdapter.getById(id); // Obtener el reporte usando el adaptador
        setReport(response); // Ajusta según la estructura de la respuesta
        setNameValue(response.name);
        setObsValue(response.observations);
        setSqlValue(response.query);

        setFilterItems(response.filters || {
          names: [],
          data_types: [],
          search_fields: [],
          search_operators: [],
        });

      } catch (error) {
        alert("Error al cargar el reporte");
      }
    }

    fetchReport();
  }, [id]);

  function handleFilterAdd() {
    const newFilters = { ...filterItems };
    newFilters.names.push(filterNameValue);
    newFilters.data_types.push(filterDataTypeValue);
    newFilters.search_fields.push(filterSearchFieldValue);
    newFilters.search_operators.push(filterOperatorValue);
    setFilterItems(newFilters);

    setFilterNameValue("");
    setFilterDataTypeValue("");
    setFilterSearchFieldValue("");
    setFilterOperatorValue("");
  }

  function deleteAction(index) {
    const newFilters = { ...filterItems };
    newFilters.names.splice(index, 1);
    newFilters.data_types.splice(index, 1);
    newFilters.search_fields.splice(index, 1);
    newFilters.search_operators.splice(index, 1);
    setFilterItems(newFilters);
  }

  function handleSubmit() {
    const updatedReport = {
      name: nameValue,
      observations: obsValue,
      query: sqlValue,
      filters: filterItems,
    };

    ReportsAdapter.editOneById(id, updatedReport)
      .then(() => {
        alert("Reporte actualizado correctamente");
        navigate("/dashboard/reportes/reportes");
      })
      .catch(() => {
        alert("Ocurrió un error al actualizar el reporte");
      });
  }

  if (!report) {
    return (
      <Card className="h-full w-full py-10 flex flex-col">
        <CardHeader variant="gradient" className="p-6 bg-secondary flex">
          <Typography
            variant="h6"
            color="white"
            className="flex items-center gap-3"
          >
            Cargando reporte...
          </Typography>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="h-full w-full py-10 flex flex-col">
      <CardHeader variant="gradient" className="p-6 bg-secondary flex">
        <Typography
          variant="h6"
          color="white"
          className="flex items-center gap-3"
        >
          Editar Reporte
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
                  value={nameValue}
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
                  value={obsValue}
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
                Modificación de tipo de dato
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
                            value={filterNameValue}
                            onChange={(e) => setFilterNameValue(e.target.value)}
                            label="Nombre"
                            className="w-full text-sm"
                          />
                        </ListItem>
                        <ListItem>
                          <Input
                            value={filterDataTypeValue}
                            onChange={(e) =>
                              setFilterDataTypeValue(e.target.value)
                            }
                            label="Tipo de dato"
                            className="w-full text-sm"
                          />
                        </ListItem>
                        <ListItem>
                          <Input
                            value={filterSearchFieldValue}
                            onChange={(e) =>
                              setFilterSearchFieldValue(e.target.value)
                            }
                            label="Campo de búsqueda"
                            className="w-full text-sm"
                          />
                        </ListItem>
                        <ListItem>
                          <Input
                            value={filterOperatorValue}
                            onChange={(e) =>
                              setFilterOperatorValue(e.target.value)
                            }
                            label="Operador"
                            className="w-full text-sm"
                          />
                        </ListItem>
                      </List>
                    </Card>
                  </div>
                  <div className="flex items-center justify-center">
                    <Button
                      onClick={() => handleFilterAdd()}
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
                        {filterItems.names.map((name, index) => (
                          <ListItem
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <Typography variant="h6" className="flex-1 truncate">
                              {name}
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
                value={sqlValue}
                onChange={(e) => setSqlValue(e.target.value)}
                className="w-full h-full p-2 rounded-xl border border-gray-300 resize-none text-sm"
              ></textarea>
            </div>
          </section>
        </section>
      </CardBody>

      <CardFooter className="flex items-center justify-end border-t border-blue-gray-50 p-4 gap-6">
        <Button onClick={handleSubmit} className="bg-primary">
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
          leftButtonAction={() => navigate("/dashboard/reportes/reportes")}
        />
      </CardFooter>
    </Card>
  );
}
