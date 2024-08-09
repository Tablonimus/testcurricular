import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
  Card,
  CardBody,
  Radio,
} from "@material-tailwind/react";
import permissions from "../../../Domain/Isvc/permissions/permissions";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function IconRadio() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-full w-full scale-105"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function PermissionsAccordionEdit({
  menu,
  handleDeletePermissionsRadio,
  handlePermissionCheckbox,
  selectedPermissions,
}) {
  const [open, setOpen] = useState(null);

  const handleOpen = (value) => setOpen(open === value ? null : value);

  console.log(menu);
  console.log(selectedPermissions);

  return (
    <div className="w-2/3">
      {menu?.map(
        (permissionCategory, index) =>
          permissionCategory.parent_id === null && (
            <Accordion
              key={index}
              open={open === index}
              icon={<Icon id={index} open={open} />}
            >
              <AccordionHeader
                className="flex justify-end flex-row-reverse gap-3"
                onClick={() => handleOpen(index)}
              >
                <Typography>
                  {permissionCategory.name[0].toUpperCase() +
                    permissionCategory.name.slice(1)}
                </Typography>
              </AccordionHeader>
              <AccordionBody>
                <Card>
                  <CardBody className=" py-2 m-0">
                    <ul className="flex  flex-col gap-4">
                      {menu?.map(
                        (permissionSubcategory, index) =>
                          permissionSubcategory.parent_id !== null &&
                          permissionCategory?.id ===
                            permissionSubcategory.parent_id && (
                            <li
                              key={index}
                              className="flex justify-between items-center"
                            >
                              <h3>
                                {permissionSubcategory.name[0].toUpperCase() +
                                  permissionSubcategory.name.slice(1)}
                              </h3>

                              <div className="flex gap-4 items-center">
                                <Radio
                                  name={permissionSubcategory?.id}
                                  ripple={false}
                                  icon={<IconRadio />}
                                  className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                                  label={<span>Editor</span>}
                                  onChange={(e) =>
                                    handlePermissionCheckbox(
                                      e,
                                      permissionSubcategory?.id
                                    )
                                  }
                                  value={permissions.write}
                                  defaultChecked={
                                    selectedPermissions[
                                      permissionSubcategory?.id
                                    ] === permissions?.write
                                  }
                                />
                                <Radio
                                  name={permissionSubcategory?.id}
                                  ripple={false}
                                  icon={<IconRadio />}
                                  className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                                  label={<span>Visor</span>}
                                  onChange={(e) =>
                                    handlePermissionCheckbox(
                                      e,
                                      permissionSubcategory?.id
                                    )
                                  }
                                  value={permissions.read}
                                  defaultChecked={
                                    selectedPermissions[
                                      permissionSubcategory?.id
                                    ] === permissions?.read
                                  }
                                />
                                {console.log(
                                  "aca esta 2-----------------------------------"
                                )}
                                <span>|</span>
                                <button
                                  className="hover:underline"
                                  id={permissionSubcategory?.id}
                                  onClick={(e) =>
                                    handleDeletePermissionsRadio(e)
                                  }
                                >
                                  Quitar permiso
                                </button>
                              </div>
                            </li>
                          )
                      )}
                    </ul>
                  </CardBody>
                </Card>
              </AccordionBody>
            </Accordion>
          )
      )}
    </div>
  );
}
