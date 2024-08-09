import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export function Footer() {
  const year = new Date().getFullYear();

  const routes = [
    { name: "C.Unix", path: "" },
    { name: "Sobre nosotros", path: "" },
    { name: "Contacto", path: "" },
    { name: "Licencia", path: "" },
  ];

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; {year}, Hecho{" "}
          {/* <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5 text-red-600" />{" "} */}
          por{" "}
          <a
            href={"#"}
            target="_blank"
            className="transition-colors hover:text-blue-500 font-bold"
          >
            C.Unix
          </a>{" "}
        </Typography>
        <ul className="flex items-center gap-4">
          {routes.map(({ name, path }) => (
            <li key={name}>
              <Typography
                as="a"
                href={path}
                target="_blank"
                variant="small"
                className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
              >
                {name}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
