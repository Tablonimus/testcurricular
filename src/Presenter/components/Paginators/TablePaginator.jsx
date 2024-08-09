import React from "react";
import { Typography, Button, Input } from "@material-tailwind/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function TablePaginator({
  page,
  pageSize,
  totalItems,
  totalPages,
  totalItemsDisplayed,
  handleSetPageManual,
  setPageSize,
  handleNextPage,
  handlePreviousPage,
}) {
  return (
    <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
      <div className="flex items-center gap-1  p-1 rounded-lg">
        <span className="font-bold text-sm">Página</span>
        <button
          onClick={() => handlePreviousPage()}
          className="hover:bg-gray-300 rounded-lg p-1"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <input
          type="number"
          onChange={(e) => handleSetPageManual(e)}
          max={totalPages}
          min={1}
          placeholder={page}
          className="w-12 h-5 pl-1  border border-black rounded-lg placeholder-black/50 font-bold text-sm"
        />
        <span className="font-bold text-sm"> / {totalPages}</span>
        <button
          onClick={() => handleNextPage()}
          className="hover:bg-gray-300 rounded-lg p-1"
        >
          {" "}
          <ChevronRightIcon className="w-5 h-5" />
        </button>
        |
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm"> Vistas por página:</span>
          <select
            name="page_size"
            id=""
            onChange={(e) => setPageSize(e.target.value)}
            className="border border-black rounded-lg w-12 h-5 font-bold text-sm"
          >
            <option selected value={5}>
              5
            </option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>{" "}
          |
          <span className="font-bold text-sm">
            Mostrando {pageSize * page - pageSize + 1}-
            {pageSize * page - (pageSize - totalItemsDisplayed)} de {totalItems}{" "}
            resultados{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
