import {
  UserCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Profile, Users, Roles } from "@/Presenter/pages/dashboard";
import { SignIn, SignUp } from "@/Presenter/pages/auth";
import { AddUser } from "./Presenter/pages/dashboard/Configuration/Users/AddUser";
import AddRole from "./Presenter/pages/dashboard/Configuration/Roles/AddRole";
import PersonsManagment from "./Presenter/pages/dashboard/TrainingManagment/Persons/PersonsManagment";
import AddPerson from "@/Presenter/pages/dashboard/TrainingManagment/Persons/AddPerson";
import EditPerson from "@/Presenter/pages/dashboard/TrainingManagment/Persons/EditPerson";
import ConfigMain from "./Presenter/pages/dashboard/Configuration/ConfigMain";
import ReportsMain from "./Presenter/pages/dashboard/Reports/ReportsMain";
import ComunicationsMain from "./Presenter/pages/dashboard/Comunications/ComunicationsMain";
import TrainingMain from "./Presenter/pages/dashboard/TrainingManagment/TrainingMain";
import {
  AdjustmentsVerticalIcon,
  ChatBubbleBottomCenterTextIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import ActivitiesManagment from "./Presenter/pages/dashboard/TrainingManagment/Activities/ActivitiesManagment";
import InstitutionsManagment from "./Presenter/pages/dashboard/TrainingManagment/Institutions/InstitutionsManagment";
import AddInstitution from "./Presenter/pages/dashboard/TrainingManagment/Institutions/AddInstitution";
import EditInstitution from "./Presenter/pages/dashboard/TrainingManagment/Institutions/EditInstitution";
import AddActivity from "./Presenter/pages/dashboard/TrainingManagment/Activities/AddActivity";
import EditRole from "./Presenter/pages/dashboard/Configuration/Roles/EditRole";
import { EditUser } from "./Presenter/pages/dashboard/Configuration/Users/EditUser";
import ThemeGenerator from "./Presenter/pages/dashboard/Configuration/Theme/ThemeGenerator";
import ViewActivity from "./Presenter/pages/dashboard/TrainingManagment/Activities/ViewActivity";
import EditActivity from "./Presenter/pages/dashboard/TrainingManagment/Activities/EditActivity";
import AcademicHistoryPerson from "./Presenter/pages/dashboard/TrainingManagment/Persons/AcademicHistoryPerson";
import BinnaclePerson from "./Presenter/pages/dashboard/TrainingManagment/Persons/BinnaclePerson";
import CertificatesManagment from "./Presenter/pages/dashboard/TrainingManagment/Certificates/CertificatesManagment";
import AddCertificate from "./Presenter/pages/dashboard/TrainingManagment/Certificates/AddCertificate";
import ReportsManagment from "./Presenter/pages/dashboard/Reports/ReportsManagment";
import AddReport from "./Presenter/pages/dashboard/Reports/AddReport";
import ViewReport from "./Presenter/pages/dashboard/Reports/ViewReport";
import EditReport from "./Presenter/pages/dashboard/Reports/EditReport";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const authRoutes = [
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        show: true,
        icon: <ServerStackIcon {...icon} id="" />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        show: true,
        icon: <RectangleStackIcon {...icon} id="" />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export function getAllowedRoutes(permissionsObject) {
  const permissionsDecoded = Object.keys(permissionsObject);

  const dashboardRoutes = [
    {
      layout: "dashboard",
      pages: [
        /* TRAINING MANAGMENT */
        {
          show: permissionsDecoded.find(
            (permission) =>
              permission.includes("personas") ||
              permission.includes("actividades") ||
              permission.includes("instituciones")
          ),
          icon: <UserGroupIcon {...icon} id="Gestión Capacitaciones" />,
          name: "Gestión Capacitaciones",

          path: "/gestion",
          element: <TrainingMain user />,

          subPages: [
            {
              show: permissionsDecoded.find((permission) =>
                permission.includes("actividades")
              ),
              icon: <UserCircleIcon {...icon} id="Actividades" />,
              name: "Actividades",
              path: "/gestion/actividades",
              element: <ActivitiesManagment />,
            },
            {
              show: false,
              icon: <UserCircleIcon {...icon} id="Actividades" />,
              name: "Actividades",
              path: "/gestion/actividades/crear",
              element: <AddActivity />,
            },
            {
              show: false,
              icon: <UserCircleIcon {...icon} id="Actividades" />,
              name: "Actividades",
              path: "/gestion/actividades/ver/:id",
              element: <ViewActivity />,
            },
            {
              show: false,
              icon: <UserCircleIcon {...icon} id="Actividades" />,
              name: "Actividades",
              path: "/gestion/actividades/editar/:id",
              element: <EditActivity />,
            },
            {
              show: permissionsDecoded.find((permission) =>
                permission.includes("instituciones")
              ),
              icon: <UserCircleIcon {...icon} id="Instituciones" />,
              name: "Instituciones",
              path: "/gestion/instituciones",
              element: <InstitutionsManagment />,
            },
            {
              show: false,
              icon: <UserCircleIcon {...icon} id="Instituciones" />,
              name: "Instituciones",
              path: "/gestion/instituciones/crear",
              element: <AddInstitution />,
            },
            {
              show: false,
              icon: <UserCircleIcon {...icon} id="Instituciones" />,
              name: "Instituciones",
              path: "/gestion/instituciones/editar/:id",
              element: <EditInstitution />,
            },
            {
              show: permissionsDecoded.find((permission) =>
                permission.includes("personas")
              ),
              icon: <UserCircleIcon {...icon} id="Personas" />,
              name: "Personas",
              path: "/gestion/personas",
              element: <PersonsManagment />,
            },
            {
              show: false,
              icon: <UserCircleIcon {...icon} id="Crear Persona" />,
              name: "Personas",
              path: "/gestion/personas/crear",
              element: <AddPerson />,
            },
            {
              show: false,
              icon: <UserCircleIcon {...icon} id="Crear Persona" />,
              name: "Personas",
              path: "/gestion/personas/editar/:id",
              element: <EditPerson />,
            },
            {
              show: false,
              icon: <UserCircleIcon {...icon} id="Crear Persona" />,
              name: "Personas",
              path: "/gestion/personas/historial/:id",
              element: <AcademicHistoryPerson />,
            },
            {
              show: false,
              icon: <UserCircleIcon {...icon} id="Crear Persona" />,
              name: "Personas",
              path: "/gestion/personas/bitacora/:id",
              element: <BinnaclePerson />,
            },
            {
              show: permissionsDecoded.find((permission) =>
                permission.includes("certificados")
              ),
              icon: <UserCircleIcon {...icon} id="Certificados" />,
              name: "Certificados",
              path: "/gestion/certificados",
              element: <CertificatesManagment />,
            },
            {
              show: false,
              icon: <UserCircleIcon {...icon} id="Certificados" />,
              name: "Certificados",
              path: "/gestion/certificados/crear",
              element: <AddCertificate />,
            },
          ],
        },
        /* COMUNICATIONS */
        {
          show: permissionsDecoded.find(
            (permission) =>
              permission.includes("plantillas de comunicaciones") ||
              permission.includes("campañas de envío")
          ),
          icon: (
            <ChatBubbleBottomCenterTextIcon {...icon} id="Comunicaciones" />
          ),
          name: "Comunicaciones",
          path: "/comunicaciones",
          element: <ComunicationsMain />,
          subPages: [
            {
              show: permissionsDecoded.find((permission) =>
                permission.includes("plantillas de comunicaciones")
              ),
              icon: (
                <UserCircleIcon {...icon} id="Plantillas de comunicaciones" />
              ),
              name: "Plantillas de comunicaciones",
              path: "/comunicaciones/plantillas",
              element: <Profile />,
            },
            {
              show: permissionsDecoded.find((permission) =>
                permission.includes("campañas de envío")
              ),
              icon: <UserCircleIcon {...icon} id="Campañas de envío" />,
              name: "Campañas de envío",
              path: "/comunicaciones/Campañas",
              element: <Profile />,
            },
          ],
        },
        /* REPORTS & INFO */
        {
          show: permissionsDecoded.find(
            (permission) =>
              permission.includes("bitácora") || permission.includes("reportes")
          ),
          icon: (
            <ClipboardDocumentListIcon {...icon} id="Reportes e informes" />
          ),
          name: "Reportes e informes",
          path: "/reportes",
          element: <ReportsMain />,
          subPages: [
            {
              show: permissionsDecoded.find((permission) =>
                permission.includes("bitácora")
              ),
              icon: <UserCircleIcon {...icon} id="Bitácora general" />,
              name: "Bitácora general",
              path: "/reportes/bitacora",
              element: <Profile />,
            },
            {
              show: permissionsDecoded.find((permission) =>
                permission.includes("reportes")
              ),
              icon: <UserCircleIcon {...icon} id="Reportes" />,
              name: "Reportes",
              path: "/reportes/reportes",
              element: <ReportsManagment />,
            },
            {
              show: false,
              icon: <UserCircleIcon {...icon} id="Reportes" />,
              name: "Reportes",
              path: "/reportes/reportes/crear",
              element: <AddReport />,
            },
            {
              show: false,
              icon: <UserCircleIcon {...icon} id="Reportes" />,
              name: "Reportes",
              path: "/reportes/reportes/ver/:id",
              element: <ViewReport />,
            },
            {
              show: false,
              icon: <UserCircleIcon {...icon} id="Reportes" />,
              name: "Reportes",
              path: "/reportes/reportes/editar/:id",
              element: <EditReport />,
            },
          ],
        },
        /* CONFIG */
        {
          show: permissionsDecoded.find(
            (permission) =>
              permission.includes("usuarios") || permission.includes("roles")
          ),
          icon: <AdjustmentsVerticalIcon {...icon} id="Configuración" />,
          name: "Configuración",
          path: "/configuracion",
          element: <ConfigMain />,
          subPages: [
            {
              show: false,
              icon: <UserCircleIcon {...icon} id="Tema" />,
              name: "Tema",
              path: "/configuracion/tema",
              element: <ThemeGenerator />,
            },
            {
              show: permissionsDecoded.find((permission) =>
                permission.includes("usuarios")
              ),
              icon: <UserCircleIcon {...icon} id="Usuarios" />,
              name: "Usuarios",
              path: "/configuracion/usuarios",
              element: <Users />,
            },
            {
              show: false,
              icon: <UserCircleIcon {...icon} id="" />,
              name: "Nuevo Usuario",
              path: "/configuracion/usuarios/nuevo",
              element: <AddUser />,
            },
            {
              show: false,
              icon: <UserCircleIcon {...icon} id="" />,
              name: "Editar Usuario",
              path: "/configuracion/usuarios/editar/:id",
              element: <EditUser />,
            },
            {
              show: permissionsDecoded.find((permission) =>
                permission.includes("roles")
              ),
              icon: <RectangleStackIcon {...icon} id="Roles" />,
              name: "Roles",
              path: "/configuracion/roles",
              element: <Roles />,
            },
            {
              show: false,
              icon: <RectangleStackIcon {...icon} id="" />,
              name: "Nuevo Rol",
              path: "/configuracion/roles/nuevo",
              element: <AddRole />,
            },
            {
              show: false,
              icon: <RectangleStackIcon {...icon} id="" />,
              name: "Editar Rol",
              path: "/configuracion/roles/editar/:id",
              element: <EditRole />,
            },
          ],
        },
      ],
    },
  ];

  return dashboardRoutes;
}
