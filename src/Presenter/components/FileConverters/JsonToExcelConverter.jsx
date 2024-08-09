import React from "react";

import { PersonsAdapter } from "../../../Infra/Adapters/Persons/persons.adapter";
import { Tooltip } from "@material-tailwind/react";

export default function JsonToExcelConverter({
  text,
  icon,
  action,
  tooltipText,
}) {
  /* the component state is an array of personsidents */
  //   const [persons, setPersons] = useState([]);

  //   /* Fetch and update the state once */
  //   useEffect(() => {
  //     PersonsAdapter.get().then((persons) => setPersons(persons));
  //   }, []);

  /* get state data and export to XLSX */
  const exportFile = async () => {
    await action();
  };

  return (
    <Tooltip content={tooltipText}>
      <button
        className={`align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] flex items-center text-[--primary] gap-3 border-2 border-[--primary]`}
        onClick={exportFile}
      >
        {icon}
        {text}
      </button>
    </Tooltip>
  );
}
