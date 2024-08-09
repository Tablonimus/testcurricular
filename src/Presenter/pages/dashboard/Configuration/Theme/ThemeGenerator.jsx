import React, { useEffect, useState } from "react";
import { theme } from "../../../../../Infra/Services/themeInterceptor/interceptor.service";
import {
  Button,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";

export default function ThemeGenerator() {
  const navigate = useNavigate();
  const [dbColors, setDbColors] = useState([]);
  const [dbImages, setDbImages] = useState([]);
  const [colorInput, setColorInput] = useState({});
  const [imageInput, setImageInput] = useState({});
  const [open, setOpen] = useState(false);

  const handleOpen = (value) => {
    value === open ? setOpen(false) : setOpen(value);
  };

  useEffect(() => {
    theme.searchColors().then((res) => setDbColors(res));
    theme.searchImages().then((res) => setDbImages(res));
  }, []);

  const editColor = async () => {
    try {
      await theme.editColor(colorInput);
      return window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  const editImage = async () => {
    try {
      await theme.editImage(imageInput);
      return window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleColor = (e) => {
    e.target.type === "submit"
      ? editColor(colorInput)
      : setColorInput({
          id: e.target.id,
          name: e.target.name,
          hex: e.target.value,
        });
  };
  const handleImage = (e) => {
    e.target.type === "submit"
      ? editImage(imageInput)
      : setImageInput({
          id: e.target.id,
          name: e.target.name,
          imageURL: e.target.value,
        });
  };

  return (
    <div className="flex flex-col justify-start min-h-[75vh]">
      {/*---------------------IMAGENES--------------- */}
      <Accordion
        open={open === 0}
        className="mb-2 rounded-lg border border-blue-gray-100 px-4"
      >
        <AccordionHeader
          onClick={() => handleOpen(0)}
          className={`border-b-0 transition-colors ${
            open === 0 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          Imágenes
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
          {dbImages.map((image, index) => (
            <div
              key={image._id}
              className="flex flex-col gap-2 w-1/2 border border-gray  p-2"
            >
              <label htmlFor="">{image.display_name || image.name}</label>
              <Input
                id={image._id}
                name={image.name}
                type="text"
                defaultValue={image?.imageURL}
                onChange={(e) => handleImage(e)}
              />
              <img
                src={image.imageURL}
                alt=""
                className="w-32 h-14 object-contain border"
              />
              <Button
                id={image._id}
                name={image.name}
                type="submit"
                onClick={(e) => handleImage(e)}
                className="w-1/3 bg-primary"
              >
                Guardar
              </Button>
            </div>
          ))}
        </AccordionBody>
      </Accordion>
      {/* ---------------COLORES----------------------- */}
      {dbColors
        ?.map((color) => color?.category)
        .filter(
          (category, index, categoriesArray) =>
            categoriesArray.indexOf(category) === index
        ) //[ 'Sin categoría', 'General', 'Sidebar' ]
        .map((category, index, categoriesArray) => (
          <section key={category}>
            {/* <div>{category || "Sin categoría"}</div> */}

            <Accordion
              open={open === index + 1}
              className="mb-2 rounded-lg border border-blue-gray-100 px-4"
            >
              <AccordionHeader
                onClick={() => handleOpen(index + 1)}
                className={`border-b-0 transition-colors ${
                  open === index ? "text-blue-500 hover:!text-blue-700" : ""
                }`}
              >
                {category || "Sin categoría"}
              </AccordionHeader>
              <AccordionBody className="pt-0 text-base font-normal">
                {dbColors
                  .filter((color) => color.category === category)
                  .map((color) => (
                    <div
                      key={color._id}
                      className="flex flex-col w-1/2 border border-gray  p-2"
                    >
                      <label htmlFor="">
                        {color.display_name || color.name}
                      </label>
                      <input
                        id={color._id}
                        name={color.name}
                        type="color"
                        defaultValue={color.hex}
                        onChange={(e) => handleColor(e)}
                      />
                      <Button
                        id={color._id}
                        name={color.name}
                        type="submit"
                        onClick={(e) => handleColor(e)}
                        className="w-1/3 bg-primary"
                      >
                        Guardar
                      </Button>
                    </div>
                  ))}
              </AccordionBody>
            </Accordion>
          </section>
        ))}
    </div>
  );
}
