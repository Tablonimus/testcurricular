import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
  Button,
  Input,
} from "@material-tailwind/react";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReportsAdapter } from "../../../../Infra/Adapters/Reports/reports.adapter";
import { ManagmentTable } from "../../../components/Tables/ManagmentTable";
import TablePaginator from "../../../components/Paginators/TablePaginator";

const modalText = {
  title: "¿Está seguro de salir sin guardar los cambios?",
  content: "Esta acción descartará los cambios realizados en el registro.",
  leftButtonText: "Salir",
  rightButtonText: "Volver",
};

export default function ViewReport() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [report, setReport] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [pageAmount, setPageAmount] = useState(1);
  const [inputValues, setInputValues] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    fetchReport();
  }, [id]);

  useEffect(() => {
    if (filters.names) {
      setInputValues(new Array(filters.names.length).fill(""));
    }
  }, [filters.names]);

  async function fetchReport() {
    try {
      const request = {
        report_id: id,
        search_terms: inputValues.map(value => value.trim())
      };

      const response = await ReportsAdapter.executeReport(page, pageSize, request);
      const columns = [];
      setReport(response);
      setFilters(response.filters);
      setTableRows(response.rows);
      response.columns.forEach((element) => {
        columns.push({ displayName: element, filterName: element });
      });
      setTableColumns(columns);
      setPageAmount(Math.ceil(response.total / pageSize));
    } catch (error) {
      alert("Error al cargar el reporte");
    }
  }

  const handleInputChange = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
  };
  function handleNextPage() {
    if (page < pageAmount) setPage(page + 1);
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
  function handleExcelDownload(){
    const request = {
      report_id: id,
      search_terms: inputValues.map(value => value.trim())
    };
    const response =  ReportsAdapter.createExcel(request);

  }
  return (
    <Card className="h-full w-full py-10">
      <CardHeader variant="gradient" className={`p-6 bg-secondary`}>
        <Typography variant="h6" color="white">
          {report.name}
        </Typography>
      </CardHeader>

      <CardBody className="overflow-scroll px-0">
        <div className="dynamic-inputs flex flex-wrap gap-4 px-6">
          {filters.names &&
            filters.data_types &&
            filters.names.map((name, index) => (
              <div key={index} className="input-group flex-grow mb-6">
                <Input
                  type={filters.data_types[index]}
                  id={name}
                  name={name}
                  label={name}
                  value={inputValues[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="input-field w-full border border-gray-300 p-2 rounded"
                />
              </div>
            ))}
          <Button
            className="h-10 border-2 border-[--secondary] text-[--secondary]"
            variant="outlined"
            color="primary"
            onClick={fetchReport} // Removed unnecessary parameter
          >
            GENERAR
          </Button>
        </div>
        <ManagmentTable
          tableHead={tableColumns}
          tableRows={tableRows}
          setTableRows={setTableRows}
          isReport={true}
        />
      </CardBody>

      <CardFooter>
        <TablePaginator
          page={page}
          pageSize={pageSize}
          totalPages={pageAmount}
          handleSetPageManual={handleSetPageManual}
          setPageSize={setPageSize}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </CardFooter>
      <Button
        className="w-[120px] bg-[--secondary] h-10 p-0 border-2 border-[--secondary] text-[white] m-5 ml-auto"
        variant="outlined"
        color="primary"
        onClick={()=>handleExcelDownload()}
      >
        DESCARGAR
      </Button>
    </Card>
  );
}
