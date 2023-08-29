import {
  GET_ALL_LEAD,
  GET_ALL_LEAD_A_PAGAR,
  GET_LEAD_UNCHECKED,
  GET_LEAD_CHEQUED,
  GET_LEAD_UNCHECKED_10,
  GET_LEAD_CHEQUED_INACTIVE_5,
  GET_LEAD_CHEQUED_FREELANCE,
  ORDER_CLIENTS,
  ORDER_CATEGORY,
  FILTER_LEVEL,
  FILTER_STATUS,
  GET_ALL_CORREDORES,
  GET_CORREDOR_EMAIL,
  GET_ALL_VENDEDORES,
  GET_ALL_LEADER,
  GET_ALL_CLEVEL,
  GET_VENDEDOR_ALL_LEADS,
  GET_LEADS_LLAMADA_VENTA,
  GET_EMPLOYEES,
  SET_ROL,
  SET_ACCESS,
  GET_CORREDOR_LEAD,
  GET_CORREDOR_LEAD_CHECKED,
  FIND_CORREDORES_NAME,
  FIND_VENDEDORES_NAME,
  GET_ALL_EMPLOYEES,
  GET_ALL_PROFESION,
  GET_ALL_PROFESION_FREELANCE,
  GET_ALL_COUNTRY,
  GET_ALL_COUNTRY_FREELANCE,
  GET_ALL_CATEGORY,
  GET_DETAIL_EMPLOY,
  FIND_CORREDORES_NAME_ALL_INFO,
  FIND_VENDEDORES_NAME_ALL_INFO,
  GET_ALL_CLIENTES,
  GET_CLIENT_BY_EMAIL,
  GET_BANNED,
  GET_CORREDORES,
  GET_VENDEDORES,
  GET_CLIENTE_EMPRESA,
  GET_LEAD_DISCARD,
  GET_CLASIFICACION_LEAD,
  GET_ALL_FREELANCER,
  FIND_FREELANCER_NAME_ALL_INFO,
  GET_LEAD_CHEQUED_FREELANCER,
  GET_FREELANCER,
  GET_CORREDOR_LEAD_CHECKED_DESCARGARDOS,
  GET_ALL_PROMOCIONES,
  FIND_CORREDORES_NAME_ALL_INFO_SEGUIMIENTO,
  FIND_VENDEDORES_NAME_ALL_INFO_SEGUIMIENTO,
  PUT_CLIENTE_EMPRESA,
} from "./actions";

const initialState = {
  lead: [],
  leadAPagar: [],
  leadChequed: [],
  leadCheckedInactive5: [],
  leadCheckedFreelance: [],
  leadUnchecked: [],
  leadUnchecked10: [],
  leaderDashboard: [],
  leaderDiscard: [],
  leaderFreelancer: [],
  vendedoresDashboard: [],
  vendedoresVentasDashboard: [],
  corredores: [],
  corredor: [],
  vendedores: [],
  leader: [],
  clevel: [],
  freelancer: [],
  vendedorAllLeads: [],
  VendedorAllLeadsHistory: [],
  LeadsLlamadaVenta: [],
  employees: [],
  rol: undefined,
  isEmployee: undefined,
  corredorLead: [],
  corredorLeadChecked: [],
  allEmployees: [],
  allProfesion: [],
  allProfesionFreelance: [],
  allCountries: [],
  allCountriesFreelance: [],
  allCategory: [],
  detailEmploy: [],
  corredoresByNameAllInfo: [],
  vendedoresByNameAllInfo: [],
  vendedorHistoryDashboard: [],
  allClientes: [],
  client: [],
  employeesBanned: [],
  allCorredores: [],
  allVendedores: [],
  clienteEmpresa: "",
  freelanceLead: [],
  allFreelancer: [],
  corredorLeadCheckedDescagados: [],
  promociones: [],
  corredoresByNameAllInfoSeguimiento: [],
  vendedoresByNameAllInfoSeguimiento: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROL:
      return {
        ...state,
        rol: action.payload,
      };
    // ...
    case SET_ACCESS:
      return {
        ...state,
        isEmployee: action.payload,
      };

    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };

    case GET_BANNED:
      return {
        ...state,
        employeesBanned: action.payload,
      };

    case GET_ALL_LEAD:
      return {
        ...state,
        lead: action.payload,
      };
    case GET_ALL_LEAD_A_PAGAR:
      return {
        ...state,
        leadAPagar: action.payload,
      };
    case FIND_CORREDORES_NAME_ALL_INFO_SEGUIMIENTO:
      const corredoresByNameAllInfoSeguimiento = action.payload;
      return {
        ...state,
        leadAPagar: corredoresByNameAllInfoSeguimiento,
      };
    case FIND_VENDEDORES_NAME_ALL_INFO_SEGUIMIENTO:
      const vendedoresByNameAllInfoSeguimiento = action.payload;
      return {
        ...state,
        leadAPagar: vendedoresByNameAllInfoSeguimiento,
      };
    case GET_ALL_PROMOCIONES:
      return {
        ...state,
        promociones: action.payload,
      };
    case GET_LEAD_UNCHECKED:
      return {
        ...state,
        leadUnchecked: action.payload,
      };
    case GET_LEAD_UNCHECKED_10:
      return {
        ...state,
        leadUnchecked10: action.payload,
      };
    case GET_LEAD_CHEQUED:
      return {
        ...state,
        leaderDashboard: action.payload,
        leadChequed: action.payload,
      };
    case GET_LEAD_CHEQUED_FREELANCER:
      return {
        ...state,
        leaderFreelancer: action.payload,
      };
    case GET_LEAD_DISCARD:
      return {
        ...state,
        leaderDiscard: action.payload,
      };
    case GET_LEAD_CHEQUED_INACTIVE_5:
      return {
        ...state,
        leadCheckedInactive5: action.payload,
        vendedoresDashboard: action.payload,
      };
    case GET_LEAD_CHEQUED_FREELANCE:
      return {
        ...state,
        leadCheckedFreelance: action.payload,
        vendedoresDashboard: action.payload,
      };

    case ORDER_CLIENTS:
      const copyClient = [...state.leaderDashboard];
      if (action.payload === "DES") {
        copyClient.sort((a, b) => {
          const clientA = a.name ? a.name.toLowerCase() : "";
          const clientB = b.name ? b.name.toLowerCase() : "";
          return clientB.localeCompare(clientA, "default", {
            sensitivity: "accent",
          });
        });
      } else {
        copyClient.sort((a, b) => {
          const clientA = a.name ? a.name.toLowerCase() : "";
          const clientB = b.name ? b.name.toLowerCase() : "";
          return clientA.localeCompare(clientB, "default", {
            sensitivity: "accent",
          });
        });
      }
      return {
        ...state,
        leaderDashboard: copyClient,
      };
    case ORDER_CATEGORY:
      const copyCategory = [...state.leaderDashboard];
      if (action.payload === "DES") {
        copyCategory.sort((a, b) => {
          const clientA = a.profesion ? a.profesion.toLowerCase() : "";
          const clientB = b.profesion ? b.profesion.toLowerCase() : "";
          return clientB.localeCompare(clientA, "default", {
            sensitivity: "accent",
          });
        });
      } else {
        copyCategory.sort((a, b) => {
          const clientA = a.profesion ? a.profesion.toLowerCase() : "";
          const clientB = b.profesion ? b.profesion.toLowerCase() : "";
          return clientA.localeCompare(clientB, "default", {
            sensitivity: "accent",
          });
        });
      }
      return {
        ...state,
        leaderDashboard: copyCategory,
      };

    case FILTER_LEVEL:
      const copyLevel = [...state.leadChequed];
      let filteredLevel = copyLevel;
      const copyLevelVendedores = [...state.leadCheckedInactive5];
      let filteredLevelVendedores = copyLevelVendedores;
      const copyLeadsLlamadaVenta = [...state.LeadsLlamadaVenta];
      let filteredLeadsLlamadaVenta = copyLeadsLlamadaVenta;
      const copyVendedorAllLeadsHistory = [...state.vendedorAllLeads];
      let filteredVendedorAllLeadsHistory = copyVendedorAllLeadsHistory;

      if (action.payload === "0") {
        filteredLevel = copyLevel.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "0";
        });
        filteredLevelVendedores = copyLevelVendedores.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "0";
        });
        filteredLeadsLlamadaVenta = copyLeadsLlamadaVenta.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "0";
        });
        filteredVendedorAllLeadsHistory = copyVendedorAllLeadsHistory.filter(
          (client) => {
            const clientLevel = client.level ? client.level : "";
            return clientLevel === "0";
          }
        );
      }
      if (action.payload === "1") {
        filteredLevel = copyLevel.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "1";
        });
        filteredLevelVendedores = copyLevelVendedores.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "1";
        });
        filteredLeadsLlamadaVenta = copyLeadsLlamadaVenta.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "1";
        });
        filteredVendedorAllLeadsHistory = copyVendedorAllLeadsHistory.filter(
          (client) => {
            const clientLevel = client.level ? client.level : "";
            return clientLevel === "1";
          }
        );
      }
      if (action.payload === "2") {
        filteredLevel = copyLevel.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "2";
        });
        filteredLevelVendedores = copyLevelVendedores.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "2";
        });
        filteredLeadsLlamadaVenta = copyLeadsLlamadaVenta.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "2";
        });
        filteredVendedorAllLeadsHistory = copyVendedorAllLeadsHistory.filter(
          (client) => {
            const clientLevel = client.level ? client.level : "";
            return clientLevel === "2";
          }
        );
      }
      if (action.payload === "incidencia") {
        filteredLevel = copyLevel.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "incidencia";
        });
        filteredLevelVendedores = copyLevelVendedores.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "incidencia";
        });
        filteredLeadsLlamadaVenta = copyLeadsLlamadaVenta.filter((client) => {
          const clientLevel = client.level ? client.level : "";
          return clientLevel === "incidencia";
        });
        filteredVendedorAllLeadsHistory = copyVendedorAllLeadsHistory.filter(
          (client) => {
            const clientLevel = client.level ? client.level : "";
            return clientLevel === "incidencia";
          }
        );
      }
      return {
        ...state,
        leaderDashboard: filteredLevel,
        vendedoresDashboard: filteredLevelVendedores,
        vendedoresVentasDashboard: filteredLeadsLlamadaVenta,
        vendedorAllLeadsHistory: filteredVendedorAllLeadsHistory,
      };

    case FILTER_STATUS:
      const copyStatus = [...state.leadChequed];
      let filteredStatus = copyStatus;

      if (action.payload === "contratado") {
        filteredStatus = copyStatus.filter((client) => {
          const clientStatus = client.status ? client.status : "";
          return clientStatus === "Contratado";
        });
      }
      if (action.payload === "no-responde") {
        filteredStatus = copyStatus.filter((client) => {
          const clientstatus = client.status ? client.status : "";
          return clientstatus === "No responde";
        });
      }
      if (action.payload === "rechazado") {
        filteredStatus = copyStatus.filter((client) => {
          const clientStatus = client.status ? client.status : "";
          return clientStatus === "Rechazado";
        });
      }
      if (action.payload === "sin-contactar") {
        filteredStatus = copyStatus.filter((client) => {
          const clientStatus = client.status ? client.status : "";
          return clientStatus === "Sin contactar";
        });
      }
      return {
        ...state,
        leaderDashboard: filteredStatus,
      };
    case FIND_CORREDORES_NAME:
      const corredorName = action.payload;
      const CorredorNameSort = corredorName.sort(
        (a, b) => (b ? b.level : "") - (a ? a.level : "")
      );
      return {
        ...state,
        leaderDashboard: CorredorNameSort,
      };
    case FIND_CORREDORES_NAME_ALL_INFO:
      const corredoresByNameAllInfo = action.payload;
      const corredoresByNameAllInfoSort = corredoresByNameAllInfo.sort(
        (a, b) => (b ? b.level : "") - (a ? a.level : "")
      );
      return {
        ...state,
        leaderDashboard: corredoresByNameAllInfoSort,
      };
    case FIND_FREELANCER_NAME_ALL_INFO:
      const freelancerByNameAllInfo = action.payload;
      const freelancerByNameAllInfoSort = freelancerByNameAllInfo.sort(
        (a, b) => (b ? b.level : "") - (a ? a.level : "")
      );
      return {
        ...state,
        leaderFreelancer: freelancerByNameAllInfoSort,
      };
    case FIND_VENDEDORES_NAME_ALL_INFO:
      const vendedoresByNameAllInfo = action.payload;
      const vendedoresByNameAllInfoSort = vendedoresByNameAllInfo.sort(
        (a, b) => (b ? b.level : "") - (a ? a.level : "")
      );
      return {
        ...state,
        vendedorAllLeadsHistory: vendedoresByNameAllInfoSort,
      };
    case FIND_VENDEDORES_NAME:
      const vendedorName = action.payload;
      const vendedorNameSort = vendedorName.sort(
        (a, b) => (b ? b.level : "") - (a ? a.level : "")
      );
      return {
        ...state,
        leaderDashboard: vendedorNameSort,
      };
    case GET_ALL_CORREDORES:
      return {
        ...state,
        corredores: action.payload,
      };
    case GET_CORREDOR_EMAIL:
      return {
        ...state,
        corredor: action.payload,
      };
    case GET_ALL_VENDEDORES:
      return {
        ...state,
        vendedores: action.payload,
      };
    case GET_ALL_LEADER:
      return {
        ...state,
        leader: action.payload,
      };
    case GET_ALL_CLEVEL:
      return {
        ...state,
        clevel: action.payload,
      };
    case GET_ALL_FREELANCER:
      return {
        ...state,
        freelancer: action.payload,
      };
    case GET_VENDEDOR_ALL_LEADS:
      return {
        ...state,
        vendedorAllLeads: action.payload,
        vendedorAllLeadsHistory: action.payload,
      };
    case GET_LEADS_LLAMADA_VENTA:
      return {
        ...state,
        LeadsLlamadaVenta: action.payload,
        vendedoresVentasDashboard: action.payload,
      };
    case GET_CORREDOR_LEAD:
      return {
        ...state,
        corredorLead: action.payload,
      };
    case GET_CLASIFICACION_LEAD:
      return {
        ...state,
        freelanceLead: action.payload,
      };
    case GET_CORREDOR_LEAD_CHECKED:
      return {
        ...state,
        corredorLeadChecked: action.payload,
      };

    case GET_ALL_EMPLOYEES:
      return {
        ...state,
        allEmployees: action.payload,
      };
    case GET_ALL_PROFESION:
      return {
        ...state,
        allProfesion: action.payload,
      };
    case GET_ALL_PROFESION_FREELANCE:
      return {
        ...state,
        allProfesionFreelance: action.payload,
      };
    case GET_ALL_COUNTRY:
      return {
        ...state,
        allCountries: action.payload,
      };
    case GET_ALL_COUNTRY_FREELANCE:
      return {
        ...state,
        allCountriesFreelance: action.payload,
      };
    case GET_ALL_CATEGORY:
      return {
        ...state,
        allCategory: action.payload,
      };
    case GET_CORREDORES:
      return {
        ...state,
        allCorredores: action.payload,
      };
    case GET_FREELANCER:
      return {
        ...state,
        allFreelancer: action.payload,
      };
    case GET_VENDEDORES:
      return {
        ...state,
        allVendedores: action.payload,
      };
    case GET_DETAIL_EMPLOY:
      return {
        ...state,
        detailEmploy: action.payload,
      };
    case GET_CORREDOR_LEAD_CHECKED_DESCARGARDOS:
      return {
        ...state,
        corredorLeadCheckedDescagados: action.payload,
      };

    // *******************************Clientes *******************************
    case GET_ALL_CLIENTES:
      return {
        ...state,
        allClientes: action.payload,
      };
    case GET_CLIENT_BY_EMAIL:
      return {
        ...state,
        client: action.payload,
      };
    case GET_CLIENTE_EMPRESA:
      return {
        ...state,
        clienteEmpresa: action.payload,
      };
    case PUT_CLIENTE_EMPRESA:
      return {
        ...state,
        clienteEmpresa: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
