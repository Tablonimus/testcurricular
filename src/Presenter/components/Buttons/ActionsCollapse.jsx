import React, { useState } from "react";
import { Bars4Icon } from "@heroicons/react/24/outline";
import { Collapse, Tooltip } from "@material-tailwind/react";

export default function ActionsCollapse({
  tableActions,
  item,
  selectedCollapse,
  handleCollapse,
}) {
  return (
    <>
      {tableActions?.length > 3 ? (
        <div className=" cursor-pointer   rounded-lg w-fit p-1 relative">
          <Tooltip content="Accciones">
            <div
              className="w-5 h-5 hover:bg-gray-300 rounded-lg "
              onClick={(e) => handleCollapse(item)}
            >
              <Bars4Icon />
            </div>
          </Tooltip>
          <Collapse
            open={selectedCollapse === item.id}
            className="absolute right-4 top-4 w-24  z-[9999]"
          >
            <div className="bg-white border boreder-gray-800 flex flex-col rounded-lg">
              {tableActions?.map((action, index) => (
                <button
                  key={index}
                  onClick={() => action.action(item["id"])}
                  className="flex items-center p-2 gap-1 hover:bg-gray-300 "
                >
                  {action.icon}
                  <span className="text-sm">{action.tooltipText}</span>
                </button>
              ))}
            </div>
          </Collapse>
        </div>
      ) : (
        <div className=" flex">
          {tableActions?.map((action, index) => (
            <Tooltip content={action.tooltipText}>
              <button
                key={index}
                onClick={() => action.action(item["id"])}
                className="flex items-center p-2  rounded-lg gap-1 hover:bg-gray-300 "
              >
                {action.icon}
              </button>
            </Tooltip>
          ))}
        </div>
      )}
    </>
  );
}
