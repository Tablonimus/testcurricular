import {
  Bars4Icon,
  ChevronUpDownIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Typography,
  Tooltip,
  Button,
  Chip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Collapse,
} from "@material-tailwind/react";
import { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import ActionsCollapse from "../Buttons/ActionsCollapse";

export function ManagmentTable({
  tableRows,
  setTableRows,
  tableHead,
  editAction,
  viewAction,
  deleteAction,

  tableActions,
  isReport = false,
}) {
  // const handleSortUsers = (headerFilterName) => {
  //   let sorted = [...tableRows];
  //   let field = headerFilterName;}

  const [sortedState, setSortedState] = useState(false);

  const handleSortUsers = (field, index) => {
    let sorted = [...tableRows];
    sorted = sorted.sort((a, b) => {
      let aValue = isReport ? a[index] : a[field];
      let bValue = isReport ? b[index] : b[field];

      if (typeof aValue === "number") {
        return sortedState ? aValue - bValue : bValue - aValue;
      } else {
        return sortedState
          ? bValue?.localeCompare(aValue || "")
          : aValue?.localeCompare(bValue || "");
      }
    });

    setTableRows(sorted);
    setSortedState(!sortedState);
  };
  const [actionsCollapse, setActionsCollapse] = useState(false);
  const [selectedCollapse, setSelectedCollapse] = useState(false);

  /* CRUD HANDLERS */
  const [deleteModal, handleOpenDeleteModal] = useState(false);
  const [modalId, setModalId] = useState("");

  const deleteModalShowAction = (id) => {
    handleOpenDeleteModal(true);
    setModalId(id);
  };
  const handleDeleteItem = () => {
    deleteAction(modalId);
    handleOpenDeleteModal(false);
    setModalId("");
  };
  const handleCollapse = (item) => {
    if (selectedCollapse === item.id) {
      setSelectedCollapse(false);
      return;
    }
    setActionsCollapse(item.id);
    setSelectedCollapse(item.id);
  };

  return (
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {tableHead.map((head, index) => (
            <th
              key={head.filterName}
              className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
              onClick={() => handleSortUsers(head.filterName, index)}
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
              >
                {head.displayName || "N/A"}

                {head.displayName !== "Acciones" && (
                  <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                )}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRows?.map((item, rowIndex) => {
          const isLast = rowIndex === tableRows.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={item.id || rowIndex}>
              {tableHead.map((head, index) => {
                if (head.displayName === "Acciones") {
                  return null;
                }
                return (
                  <td
                    key={head.filterName}
                    className={classes}
                    id={index}
                    onClick={(e) => handleCollapse(e.target)}
                  >
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {!isReport
                          ? item[head.filterName] || "N/A"
                          : item[index] || "N/A"}
                      </Typography>
                    </div>
                  </td>
                );
              })}

              {tableHead.find((head) => head.displayName === "Acciones") && (
                <td key="acciones" className={classes}>
                  <ActionsCollapse
                    tableActions={tableActions}
                    item={item}
                    selectedCollapse={selectedCollapse}
                    actionsCollapse={actionsCollapse}
                    handleCollapse={handleCollapse}
                  />
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
      {/* DELETE MODAL */}
      <Dialog open={deleteModal} handler={handleOpenDeleteModal}>
        <DialogHeader>Eliminar</DialogHeader>
        <DialogBody>
          ¿Estas a punto de eliminar el item con id
          <span className="font-bold"> {modalId}</span>?. Esta acción es
          irreversible.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={(e) => handleDeleteItem()}
            className="mr-1"
          >
            <span>Eliminar</span>
          </Button>
          <Button
            variant="filled"
            className="bg-[--secondary]"
            onClick={(e) => handleOpenDeleteModal(!deleteModal)}
          >
            <span>Salir</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </table>
  );
}
