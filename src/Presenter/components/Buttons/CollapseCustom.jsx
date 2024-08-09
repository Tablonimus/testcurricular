import React, { useState } from "react";
import {
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";

export default function CollapseCustom() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((cur) => !cur);

  return (
    <div className="border border-primary border-b">
      <div className=" flex gap-1 items-center p-2" onClick={toggleOpen}>
        <Typography>Gestión curricular</Typography>
      </div>
      <Collapse open={open}>
        <Card className="">
          <CardBody>
            <section>
              <ul>
                <li className="flex justify-between">
                  <div>Actividades</div>
                  <div className="flex gap-4">
                    <div className="flex gap-1">
                      <input type="checkbox" name="" id="" />
                      <label htmlFor="">Editor</label>
                    </div>
                    <div className="flex gap-1">
                      <input type="checkbox" name="" id="" />
                      <label htmlFor="">Visor</label>
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}
