import React, { useState } from "react";
import * as XLSX from "xlsx";
import showToast from "../../../Infra/Services/themeInterceptor/toast.service";
import { Tooltip } from "@material-tailwind/react";

export default function ExcelToJsonConverter({
  text,
  icon,
  action,
  tooltipText,
}) {
  // const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState("");

  const handleConvert = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setJsonData(JSON.stringify(json, null, 2));

        action(json);
      };
      reader.readAsArrayBuffer(file);
    } else showToast("Formato de archivo no soportado", "error");

    const inputFile = document.getElementById("file-converter");
    inputFile.value = "";
  };

  return (
    <Tooltip content={tooltipText}>
      <div>
        <label
          className={`align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] flex items-center text-[--primary] gap-3 border-2 border-[--primary]`}
        >
          {icon}
          <span className="">{text}</span>
          <input
            id="file-converter"
            className="hidden"
            type="file"
            accept=".xls,.xlsx"
            onChange={(e) => handleConvert(e)}
          />
        </label>
      </div>
    </Tooltip>
  );
}
