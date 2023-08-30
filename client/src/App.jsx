import styles from "./App.module.css";
import Landing from "./views/Landing/Landing";
import Analytics from "./views/Analytics/Analytics.jsx";
import Settings from "./views/Settings/Settings.jsx";
import Login from "./views/Login/Login";
import CorredoresDashboard from "./components/Corredores/Dashboard/CorredoresDashboard";
import VendedoresDashboard from "./components/Vendedores/Dashboard/VendedoresDashboard";
import { AnalyticLeader } from "./components/Lideres/Analytic/AnalyticLeader";
import { DashboardFreelancer } from "./components/Lideres/Dashboard/DashboardFreelancer";
import VendedoresHistory from "./components/Vendedores/analytics/VendedoresHistory";
import VendedoresAnalytics from "./components/Vendedores/analytics/VendedoresAnalytics";
import VendedoresAgenda from "./components/Vendedores/Dashboard/VendedoresAgenda";
import ReturnToPage from "./components/ReturnToPage/ReturnToPage";
import Lideres from "./components/Lideres/Lideres";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Clevel from "./components/C-Level/Clevel";
import Analytic from "./components/C-Level/Analytics/Analytic";
import Incidences from "./components/Lideres/incidences/incidencias";
import { IncidencesHistory } from "./components/Lideres/incidences-history/IncidencesHistory.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CorredoresHistory from "./components/Corredores/History/CorredoresHistory";
import CorredoresAnlaytics from "./components/Corredores/Analytics/CorredoresAnalytics";
import LoginClientes from "./viewsClientes/Login/LoginClientes";
import Home from "./viewsClientes/Home/Home";
import AddVideos from "./viewsClientes/AddVideos/AddVideos";
import ClientesSettings from "./viewsClientes/Settings/ClientesSettings";
import Pagos from "./componentsClientes/Pagos/Pagos";
import { LideresHistory } from "./components/Lideres/History/HistoryLeader";
import BannedEmployees from "./components/C-Level/Employees/EmployBanned/BannedEmploy";
import { CheckoutPage } from "./viewsClientes/CheckoutPage/CheckoutPage";
import Referidos from "./viewsClientes/Referidos/Referidos";
import TrofeosDesktop from "./componentsClientes/Trofeos/TrofeosDesktop";
import RecursosDesktop from "./componentsClientes/Recursos/RecursosDesktop";
import ExperienciaDesktop from "./componentsClientes/ExperienciaDesktop/ExperienciaDesktop";
import Guiones from "./componentsClientes/Guiones/Guiones";
import ClasificacionDashboard from "./components/Freelance/Clasificacion/Dashboard/ClasificacionDashboard";
import ClasificacionHistory from "./components/Freelance/Clasificacion/History/ClasificacionHistory";
import ClasificacionAnalytics from "./components/Freelance/Clasificacion/Analytics/ClasificacionAnalytics";
import VentasHistory from "./components/Freelance/Ventas/analytics/VentasHistory";
import VentasDashboard from "./components/Freelance/Ventas/Dashboard/VentasDashboard";
import VentasAgenda from "./components/Freelance/Ventas/Dashboard/VentasAgenda";
import PagosInfo from "./components/PagosInfo/PagosInfo";
import PagoOk from "./components/PagosInfo/PagoOk";
import PromocionPago from "./components/PagosInfo/PromocionPago";
import { ContratandoLeader } from "./components/Lideres/Contratando/ContratandoLeader";
import { Promociones } from "./components/Lideres/Promociones/Promociones";
import RegisterEmpleados from "./components/Register/RegisterEmpleados";
const { CLERK_API_KEY } = import.meta.env;

if (!"pk_test_c3RpcnJpbmctdXJjaGluLTk2LmNsZXJrLmFjY291bnRzLmRldiQ") {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey =
  "pk_test_c3RpcnJpbmctdXJjaGluLTk2LmNsZXJrLmFjY291bnRzLmRldiQ";

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
  const role = useSelector((state) => state.rol);
  const isEmployee = useSelector((state) => state.isEmployee);
  const [roleReady, setRoleReady] = useState("");
  const [accesReady, setAccessReady] = useState(false);
  const [tamañoPantalla, setTamañoPantalla] = useState("");

  useEffect(() => {
    const checkRole = async () => {
      if (role !== undefined && role !== null && role !== "") {
        setRoleReady(role);
        localStorage.setItem("roleReady", role);
      }
    };

    const storedRoleReady = localStorage.getItem("roleReady");
    if (storedRoleReady) {
      setRoleReady(storedRoleReady);
    }

    const checkAccess = async () => {
      if (
        isEmployee !== undefined &&
        isEmployee !== null &&
        isEmployee !== ""
      ) {
        setAccessReady(isEmployee);
        localStorage.setItem("isEmployeeReady", isEmployee);
      } else {
        setAccessReady(false);
      }
    };

    const storedIsEmployee = localStorage.getItem("isEmployeeReady");
    if (storedIsEmployee) {
      setAccessReady(storedIsEmployee);
    }

    checkRole();
    checkAccess();
  }, [role, isEmployee]);

  const handleSignOut = () => {
    localStorage.removeItem("roleReady");
    localStorage.removeItem("isEmployeeReady");
  };

  const isRoleReady = localStorage.getItem("roleReady");
  const isEmployeeReady = localStorage.getItem("isEmployeeReady");

  function isRoleAllowed(role) {
    const allowedRoles = [
      "vendedor",
      "clevel",
      "leader",
      "corredor",
      "freelancer",
    ];
    return allowedRoles.includes(isRoleReady);
  }
  const location = useLocation();
  const redirectUrl = new URLSearchParams(location.search).get("redirect_url");

  // Para obtener el tamaño de la pantalla en cada renderizado
  useEffect(() => {
    const { innerWidth } = window;
    if (innerWidth < 768) {
      setTamañoPantalla("Pequeña");
    } else {
      setTamañoPantalla("Grande");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterEmpleados />} />
        <Route path="/pago-ok" element={<PagoOk />} />
        <Route path="/pagos-sml" element={<PagosInfo />} />
        <Route
          path="/promocion-pagos"
          element={<PromocionPago tamañoPantalla={tamañoPantalla} />}
        />
      </Routes>
      <ClerkProvider
        publishableKey={clerkPubKey}
        navigate={(to) => navigate(to)}
        onSignOut={handleSignOut}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/sign-in/*"
            element={
              // redirectUrl === "/protected"  ? (
              redirectUrl === "/protected" ||
              redirectUrl === null ||
              redirectUrl === "undefined" ||
              redirectUrl === undefined ? (
                <SignIn
                  routing="path"
                  path="/sign-in"
                  appearance={{
                    variables: {
                      colorInputBackground: "#222131",
                      spacingUnit: "0.8rem",
                    },
                    layout: {
                      socialButtonsPlacement: "top",
                    },
                    elements: {
                      formButtonPrimary: styles.formButtonPrimary,
                      socialButtonsBlockButton: styles.socialButtons,
                      formFieldInput: styles.formFieldInput,
                      card: styles.card,
                      main: styles.main,
                      form: styles.form,
                      formField: styles.formField,
                      dividerRow: styles.dividerRow,
                      formFieldLabel: styles.formFieldLabel,
                      footerActionText: styles.footerActionText,
                      logoImage: styles.logoImage,
                      headerTitle: styles.headerTitle,
                      headerSubtitle: styles.headerSubtitle,
                      rootBox: styles.rootBox,
                    },
                  }}
                ></SignIn>
              ) : (
                redirectUrl === "/clientes-home" && (
                  <LoginClientes tamañoPantalla={tamañoPantalla} />
                )
              )
            }
          />

          <Route
            path="/sign-up/*"
            element={<SignUp routing="path" path="/sign-up" />}
          />
          {/* <Route path="*" element={<h1>error 404</h1>} /> */}
          <Route
            path="/home"
            element={<Landing />}
            tamañoPantalla={tamañoPantalla}
          />
          <Route
            path="/clientes-trofeos"
            element={<TrofeosDesktop />}
            tamañoPantalla={tamañoPantalla}
          />
          <Route
            path="/clientes-experiencia"
            element={<ExperienciaDesktop />}
          />
          <Route
            path="/clientes-addvideos"
            element={<AddVideos />}
            tamañoPantalla={tamañoPantalla}
          />
          <Route
            path="/clientes-estadisticas"
            element={<Home tamañoPantalla={tamañoPantalla} />}
          />
          <Route
            path="/clientes-settings"
            element={<ClientesSettings tamañoPantalla={tamañoPantalla} />}
          />
          <Route
            path="/clientes-pagos"
            element={<Pagos tamañoPantalla={tamañoPantalla} />}
          />
          <Route
            path="/clientes-checkout"
            element={<CheckoutPage tamañoPantalla={tamañoPantalla} />}
          />
          <Route
            path="/clientes-referidos"
            element={<Referidos tamañoPantalla={tamañoPantalla} />}
          />
          <Route
            path="/clientes-recursos"
            element={<RecursosDesktop tamañoPantalla={tamañoPantalla} />}
          />
          {/* <Route path="/pago-ok" element={<PagoOk />} />
        <Route path="/pagos-sml" element={<PagosInfo />} /> */}

          <Route path="/" element={<Login />} />
          <Route
            path="/lideres"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" || roleReady === "leader") &&
              isEmployeeReady ? (
                <LideresHistory />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/contratando"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" || roleReady === "leader") &&
              isEmployeeReady ? (
                <ContratandoLeader />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/promociones"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" || roleReady === "leader") &&
              isEmployeeReady ? (
                <Promociones />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/lideres-freelancer"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" || roleReady === "leader") &&
              isEmployeeReady ? (
                <DashboardFreelancer />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/employees-banned"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" || roleReady === "leader") &&
              isEmployeeReady ? (
                <BannedEmployees />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/lideres-analytics"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" || roleReady === "leader") &&
              isEmployeeReady ? (
                <AnalyticLeader />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/lideres-employees"
            element={
              isRoleAllowed(roleReady) &&
              roleReady === "leader" &&
              isEmployeeReady ? (
                <Lideres />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/lideres-incidences"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" || roleReady === "leader") &&
              isEmployeeReady ? (
                <Incidences />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/incidences-history"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" || roleReady === "leader") &&
              isEmployeeReady ? (
                <IncidencesHistory />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/clevel"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" || roleReady === "leader") &&
              isEmployeeReady ? (
                <Clevel />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/clevel-analytics"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" || roleReady === "leader") &&
              isEmployeeReady ? (
                <Analytic />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/corredores"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" ||
                roleReady === "leader" ||
                roleReady === "corredor") &&
              isEmployeeReady ? (
                <CorredoresDashboard />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/clasificacion"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" ||
                roleReady === "leader" ||
                roleReady === "freelancer") &&
              isEmployeeReady ? (
                <ClasificacionDashboard />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/corredores-history"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" ||
                roleReady === "leader" ||
                roleReady === "corredor") &&
              isEmployeeReady ? (
                <CorredoresHistory />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/corredores-analytics"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" ||
                roleReady === "leader" ||
                roleReady === "corredor") &&
              isEmployeeReady ? (
                <CorredoresAnlaytics />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/clasificacion-history"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" ||
                roleReady === "leader" ||
                roleReady === "freelancer") &&
              isEmployeeReady ? (
                <ClasificacionHistory />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/clasificacion-analytics"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" ||
                roleReady === "leader" ||
                roleReady === "freelancer") &&
              isEmployeeReady ? (
                <ClasificacionAnalytics />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/analytics"
            element={
              isRoleAllowed(roleReady) &&
              roleReady === "clevel" &&
              isEmployeeReady ? (
                <Analytics />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/settings"
            element={isEmployeeReady ? <Settings /> : <ReturnToPage />}
          />
          <Route
            path="/vendedores"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" ||
                roleReady === "leader" ||
                roleReady === "vendedor") &&
              isEmployeeReady ? (
                <VendedoresDashboard />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/ventas-agenda"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" ||
                roleReady === "leader" ||
                roleReady === "freelancer") &&
              isEmployeeReady ? (
                <VentasAgenda />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/vendedores-history"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" ||
                roleReady === "leader" ||
                roleReady === "vendedor") &&
              isEmployeeReady ? (
                <VendedoresHistory />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/ventas-history"
            element={
              isRoleAllowed(roleReady) &&
              (roleReady === "clevel" ||
                roleReady === "leader" ||
                roleReady === "freelancer") &&
              isEmployeeReady ? (
                <VentasHistory />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/vendedores-ventas"
            element={
              (roleReady === "clevel" ||
                roleReady === "leader" ||
                roleReady === "vendedor") &&
              isEmployeeReady ? (
                <VendedoresAgenda />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/ventas-dashboard"
            element={
              (roleReady === "clevel" ||
                roleReady === "leader" ||
                roleReady === "freelancer") &&
              isEmployeeReady ? (
                <VentasDashboard />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/vendedores-analytics"
            element={
              (roleReady === "clevel" ||
                roleReady === "leader" ||
                roleReady === "vendedor") &&
              isEmployeeReady ? (
                <VendedoresAnalytics />
              ) : (
                <ReturnToPage />
              )
            }
          />
          <Route
            path="/protected"
            element={
              <>
                <SignedIn>
                  <Landing />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />

          <Route
            path="/clientes-home"
            element={
              <>
                <SignedIn>
                  <Guiones tamañoPantalla={tamañoPantalla} />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </ClerkProvider>
    </>
  );
}

function App() {
  return (
    <div className={styles.App}>
      <>
        <ClerkProviderWithRoutes />
      </>
    </div>
  );
}

export default App;
