import axios from "axios";
export const GET_ALL_LEAD = "GET_ALL_LEAD";
export const GET_ALL_LEAD_A_PAGAR = "GET_ALL_LEAD_A_PAGAR";
export const GET_LEAD_UNCHECKED_10 = "GET_LEAD_UNCHECKED_10";
export const GET_LEAD_UNCHECKED = "GET_LEAD_UNCHECKED";
export const GET_LEAD_CHEQUED = "GET_LEAD_CHEQUED";
export const GET_LEAD_CHEQUED_INACTIVE_5 = "GET_LEAD_CHEQUED_INACTIVE_5";
export const GET_LEAD_CHEQUED_FREELANCE = "GET_LEAD_CHEQUED_FREELANCE";
export const ORDER_CLIENTS = "ORDER_CLIENTS";
export const ORDER_CATEGORY = "ORDER_CATEGORY";
export const FILTER_LEVEL = "FILTER_LEVEL";
export const FILTER_STATUS = "FILTER_STATUS";
export const GET_ALL_LEAD_INACTIVE = "GET_ALL_LEAD_INACTIVE";
export const GET_ALL_CORREDORES = "GET_ALL_CORREDORES";
export const GET_CORREDOR_EMAIL = "GET_CORREDOR_EMAIL";
export const GET_ALL_VENDEDORES = "GET_ALL_VENDEDORES";
export const GET_ALL_LEADER = "GET_ALL_LEADER";
export const GET_ALL_CLEVEL = "GET_ALL_CLEVEL";
export const GET_VENDEDOR_ALL_LEADS = "GET_VENDEDOR_ALL_LEADS";
export const GET_LEADS_LLAMADA_VENTA = "GET_LEADS_LLAMADA_VENTA";
export const SET_ROL = "SET_ROL";
export const SET_ACCESS = "SET_ACCESS";
export const GET_EMPLOYEES = "GET_EMPLOYEES";
export const GET_CORREDOR_LEAD = "GET_CORREDOR_LEAD";
export const GET_CORREDOR_LEAD_CHECKED = "GET_CORREDOR_LEAD_CHECKED";
export const FIND_CORREDORES_NAME = "FIND_CORREDORES_NAME";
export const FIND_VENDEDORES_NAME = "FIND_VENDEDORES_NAME";
export const GET_ALL_EMPLOYEES = "GET_ALL_EMPLOYEES";
export const GET_ALL_PROFESION = "GET_ALL_PROFESION";
export const GET_ALL_PROFESION_FREELANCE = "GET_ALL_PROFESION_FREELANCE";
export const GET_ALL_COUNTRY = "GET_ALL_COUNTRY";
export const GET_ALL_COUNTRY_FREELANCE = "GET_ALL_COUNTRY_FREELANCE";
export const GET_ALL_CATEGORY = "GET_ALL_CATEGORY";
export const GET_DETAIL_EMPLOY = " GET_DETAIL_EMPLOY";
export const FIND_CORREDORES_NAME_ALL_INFO = " FIND_CORREDORES_NAME_ALL_INFO";
export const FIND_VENDEDORES_NAME_ALL_INFO = " FIND_VENDEDORES_NAME_ALL_INFO";
export const GET_ALL_CLIENTES = "GET_ALL_CLIENTES";
export const GET_CLIENT_BY_EMAIL = "GET_CLIENT_BY_EMAIL";
export const GET_BANNED = "GET_BANNED";
export const GET_CORREDORES = "GET_CORREDORES";
export const GET_VENDEDORES = "GET_VENDEDORES";
export const GET_CLIENTE_EMPRESA = "GET_CLIENTE_EMPRESA";
export const PUT_CLIENTE_EMPRESA = "PUT_CLIENTE_EMPRESA";
export const GET_LEAD_DISCARD = "GET_LEAD_DISCARD";
export const GET_CLASIFICACION_LEAD = "GET_CLASIFICACION_LEAD";
export const GET_ALL_FREELANCER = "GET_ALL_FREELANCER";
export const FIND_FREELANCER_NAME_ALL_INFO = "FIND_FREELANCER_NAME_ALL_INFO";
export const GET_LEAD_CHEQUED_FREELANCER = "GET_LEAD_CHEQUED_FREELANCER";
export const GET_FREELANCER = "GET_FREELANCER";
export const GET_CORREDOR_LEAD_CHECKED_DESCARGARDOS =
  "GET_CORREDOR_LEAD_CHECKED_DESCARGARDOS";
export const GET_ALL_PROMOCIONES = "GET_ALL_PROMOCIONES";
export const FIND_CORREDORES_NAME_ALL_INFO_SEGUIMIENTO =
  "FIND_CORREDORES_NAME_ALL_INFO_SEGUIMIENTO";
export const FIND_VENDEDORES_NAME_ALL_INFO_SEGUIMIENTO =
  "FIND_VENDEDORES_NAME_ALL_INFO_SEGUIMIENTO";

//
export const setRol = (rol) => {
  return async (dispatch) => {
    const fetchedRol = await new Promise((resolve) =>
      setTimeout(() => resolve(rol), 3000)
    );

    dispatch({
      type: SET_ROL,
      payload: fetchedRol,
    });
  };
};

export const setAccess = (access) => {
  return {
    type: SET_ACCESS,
    payload: access,
  };
};
export const getEmployees = (employees) => ({
  type: GET_EMPLOYEES,
  payload: employees,
});

export const getEmployeesBanned = () => {
  return async (dispatch) => {
    const response = await axios.get("/employees/banned");
    const employeesBanned = response.data;
    dispatch({
      type: GET_BANNED,
      payload: employeesBanned,
    });
  };
};

//
export const getAllLead = () => {
  return async (dispatch) => {
    const response = await axios.get("/lead");
    const lead = response.data;
    dispatch({ type: GET_ALL_LEAD, payload: lead });
  };
};

export const getAllLeadAPagar = () => {
  return async (dispatch) => {
    const response = await axios.get("/lead/apagar");
    const leadAPagar = response.data;
    dispatch({ type: GET_ALL_LEAD_A_PAGAR, payload: leadAPagar });
  };
};

export const getAllPromociones = () => {
  return async (dispatch) => {
    const response = await axios.get("/promociones");
    const promociones = response.data;
    dispatch({ type: GET_ALL_PROMOCIONES, payload: promociones });
  };
};

export const getAllCorredores = () => {
  return async (dispatch) => {
    const response = await axios.get("/corredor");
    const corredores = response.data;
    dispatch({ type: GET_ALL_CORREDORES, payload: corredores });
  };
};

export const getAllCorredoresByEmail = (email) => {
  return async (dispatch) => {
    const response = await axios.get(`/corredor/email?email=${email}`);
    const corredor = response.data;
    dispatch({ type: GET_CORREDOR_EMAIL, payload: corredor });
  };
};
export const getAllVendedores = () => {
  return async (dispatch) => {
    const response = await axios.get("/vendedor");
    const vendedores = response.data;
    dispatch({ type: GET_ALL_VENDEDORES, payload: vendedores });
  };
};
export const getAllLeader = () => {
  return async (dispatch) => {
    const response = await axios.get("/leader");
    const leader = response.data;
    dispatch({ type: GET_ALL_LEADER, payload: leader });
  };
};
export const getAllClevel = () => {
  return async (dispatch) => {
    const response = await axios.get("/clevel");
    const clevel = response.data;
    dispatch({ type: GET_ALL_CLEVEL, payload: clevel });
  };
};
export const getAllFreelancer = () => {
  return async (dispatch) => {
    const response = await axios.get("/freelancer");
    const freelancer = response.data;
    dispatch({ type: GET_ALL_FREELANCER, payload: freelancer });
  };
};

export const getLeadUnchecked = () => {
  return async (dispatch) => {
    const response = await axios.get("/lead/unchecked");
    const LeadUnchecked = response.data;
    dispatch({ type: GET_LEAD_UNCHECKED, payload: LeadUnchecked });
  };
};

export const getLeadUnchecked10 = (email) => {
  return async (dispatch) => {
    const response = await axios.get(`/lead/unchecked10?email=${email}`);
    const LeadUnchecked10 = response.data;
    dispatch({ type: GET_LEAD_UNCHECKED_10, payload: LeadUnchecked10 });
  };
};

export const getLeadChecked = () => {
  return async (dispatch) => {
    const response = await axios.get("/lead/checked");
    const LeadChecked = response.data;
    dispatch({ type: GET_LEAD_CHEQUED, payload: LeadChecked });
  };
};
export const getLeadCheckedFreelancer = () => {
  return async (dispatch) => {
    const response = await axios.get("/lead/checkedfreelancer");
    const LeadChecked = response.data;
    dispatch({ type: GET_LEAD_CHEQUED_FREELANCER, payload: LeadChecked });
  };
};
export const getLeadDiscard = () => {
  return async (dispatch) => {
    const response = await axios.get("/lead/checked/discard");
    const LeadChecked = response.data;
    dispatch({ type: GET_LEAD_DISCARD, payload: LeadChecked });
  };
};

export const getLeadCheckedInactive5 = (
  body,
  profesion,
  country,
  level,
  freelancer
) => {
  body = { ...body, profesion, country, level, freelancer };

  return async (dispatch) => {
    if (
      body.email &&
      body.email !== "undefined" &&
      body.email !== null &&
      body.email !== ""
    ) {
      const response = await axios.put(`/lead/checkedinactive5`, body);
      const LeadCheckedInactive5 = response.data;
      dispatch({
        type: GET_LEAD_CHEQUED_INACTIVE_5,
        payload: LeadCheckedInactive5,
      });
    }
  };
};
export const getLeadCheckedFreelance = (
  body,
  profesion,
  country,
  level,
  freelancer
) => {
  body = { ...body, profesion, country, level, freelancer };

  return async (dispatch) => {
    if (
      body.email &&
      body.email !== "undefined" &&
      body.email !== null &&
      body.email !== ""
    ) {
      const response = await axios.put(`/freelancer/checkedfreelance`, body);
      const LeadCheckedInactive5 = response.data;
      dispatch({
        type: GET_LEAD_CHEQUED_FREELANCE,
        payload: LeadCheckedInactive5,
      });
    }
  };
};

export const orderClients = (order) => {
  return async (dispatch) => {
    dispatch({ type: ORDER_CLIENTS, payload: order });
  };
};
export const orderCategory = (order) => {
  return (dispatch) => {
    dispatch({ type: ORDER_CATEGORY, payload: order });
  };
};
export const filterLevel = (filter) => {
  return (dispatch) => {
    dispatch({ type: FILTER_LEVEL, payload: filter });
  };
};
export const filterStatus = (filterStatus) => {
  return (dispatch) => {
    dispatch({ type: FILTER_STATUS, payload: filterStatus });
  };
};

export const findCorredoresByName = (corredorName) => {
  return async (dispatch) => {
    const response = await axios.get(`/lead/corredor?name=${corredorName}`);
    const corredoresByName = response.data;
    dispatch({ type: FIND_CORREDORES_NAME, payload: corredoresByName });
  };
};

export const findCorredoresByNameAllInfo = (
  corredor,
  vendedor,
  fromDay,
  toDay,
  profesion,
  country,
  category,
  level,
  status,
  descargados
) => {
  return async (dispatch) => {
    const response = await axios.get(
      `/lead/allinfo?corredor=${corredor}&vendedor=${vendedor}&fromDay=${fromDay}&toDay=${toDay}&profesion=${profesion}&country=${country}&category=${category}&level=${level}&status=${status}&descargados=${descargados}`
    );
    const corredoresByNameAllInfo = response.data;
    dispatch({
      type: FIND_CORREDORES_NAME_ALL_INFO,
      payload: corredoresByNameAllInfo,
    });
  };
};

export const findCorredoresByNameAllInfoSeguimiento = (
  corredor,
  vendedor,
  freelancer
) => {
  return async (dispatch) => {
    const response = await axios.get(
      `/lead/seguimientofiltro?corredor=${corredor}&vendedor=${vendedor}&freelancer=${freelancer}`
    );
    const corredoresByNameAllInfoSeguimiento = response.data;
    dispatch({
      type: FIND_CORREDORES_NAME_ALL_INFO_SEGUIMIENTO,
      payload: corredoresByNameAllInfoSeguimiento,
    });
  };
};

export const findFreelancerByNameAllInfo = (
  freelancer,
  fromDay,
  toDay,
  profesion,
  country,
  category,
  level,
  status,
  checked,
  descargados
) => {
  return async (dispatch) => {
    const response = await axios.get(
      `/lead/allinfofreelancer?freelancer=${freelancer}&fromDay=${fromDay}&toDay=${toDay}&profesion=${profesion}&country=${country}&category=${category}&level=${level}&status=${status}&checked=${checked}&descargados=${descargados}`
    );
    const freelancerByNameAllInfo = response.data;
    dispatch({
      type: FIND_FREELANCER_NAME_ALL_INFO,
      payload: freelancerByNameAllInfo,
    });
  };
};

export const findVendedoresByNameAllInfo = (
  email,
  fromDay,
  toDay,
  profesion,
  country,
  category,
  level,
  status
) => {
  return async (dispatch) => {
    const response = await axios.get(
      `/lead/allinfovendedor?email=${email}&fromDay=${fromDay}&toDay=${toDay}&profesion=${profesion}&country=${country}&category=${category}&level=${level}&status=${status}`
    );
    const vendedoresByNameAllInfo = response.data;
    dispatch({
      type: FIND_VENDEDORES_NAME_ALL_INFO,
      payload: vendedoresByNameAllInfo,
    });
  };
};

export const findVendedoresByNameAllInfoSeguimiento = (
  email,
  fromDay,
  toDay,
  profesion,
  country,
  category,
  level,
  status
) => {
  return async (dispatch) => {
    const response = await axios.get(
      `/lead/seguimientofiltro?email=${email}&fromDay=${fromDay}&toDay=${toDay}&profesion=${profesion}&country=${country}&category=${category}&level=${level}&status=${status}`
    );
    const vendedoresByNameAllInfoSeguimiento = response.data;
    dispatch({
      type: FIND_VENDEDORES_NAME_ALL_INFO_SEGUIMIENTO,
      payload: vendedoresByNameAllInfoSeguimiento,
    });
  };
};

export const findVendedorByName = (vendedorName) => {
  return async (dispatch) => {
    const response = await axios.get(`/lead/vendedor?name=${vendedorName}`);
    const vendedoresByName = response.data;
    dispatch({ type: FIND_CORREDORES_NAME, payload: vendedoresByName });
  };
};

export const AddLeads = (body) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/lead/", body);
      return response.data;
    } catch (error) {
      console.error("Error al agregar el lead:", error);
      throw error;
    }
  };
};

export const getVendedorAllLeads = (email) => {
  return async (dispatch) => {
    const response = await axios.get(`/vendedor/email?email=${email}`);
    const allLeads = response.data;
    const allLeadsMaps =
      allLeads &&
      (await allLeads.filter((item) => item.status !== "Sin contactar"));
    dispatch({
      type: GET_VENDEDOR_ALL_LEADS,
      payload: allLeadsMaps,
    });
  };
};

export const getLeadsLLamadaVenta = (
  body,
  profesion,
  country,
  status,
  level,
  freelancer
) => {
  body = {
    email: body.email,
    // name: body.name,
    profesion,
    country,
    level,
    status,
    freelancer,
  };
  return async (dispatch) => {
    if (
      body.email &&
      body.email !== "undefined" &&
      body.email !== null &&
      body.email !== ""
    ) {
      const response = await axios.put("/vendedor/ventas/email", body);

      const allLeads = response.data;
      dispatch({
        type: GET_LEADS_LLAMADA_VENTA,
        payload: allLeads,
      });
    }
  };
};

export const getLeadCorredores = (
  email,
  names,
  profesion,
  category,
  country,
  marca_personal
) => {
  return async (dispatch) => {
    if (
      email !== "undefined" &&
      email !== "" &&
      names !== "undefined" &&
      names !== ""
    ) {
      const response = await axios.get(
        `lead/unchecked10?email=${email}&names=${names}&profesion=${profesion}&category=${category}&country=${country}&marca_personal=${marca_personal}`
      );
      const corredorLead = response.data;
      dispatch({ type: GET_CORREDOR_LEAD, payload: corredorLead });
    }
  };
};

export const getLeadClasificacion = (
  email,
  names,
  profesion,
  category,
  country,
  marca_personal,
  freelancer
) => {
  return async (dispatch) => {
    if (email !== "undefined" && email !== "") {
      const response = await axios.get(
        `lead/clasificacion?email=${email}&names=${names}&profesion=${profesion}&category=${category}&country=${country}&marca_personal=${marca_personal}&freelancer=${freelancer}`
      );
      const freelanceLead = response.data;
      dispatch({ type: GET_CLASIFICACION_LEAD, payload: freelanceLead });
    }
  };
};

export const getLeadCorredoresChecked = (email) => {
  return async (dispatch) => {
    const response = await axios.get(`lead/corredorchecked?email=${email}`);
    const corredorLeadChecked = response.data;
    dispatch({ type: GET_CORREDOR_LEAD_CHECKED, payload: corredorLeadChecked });
  };
};

export const getLeadCorredoresCheckedDescargados = (email) => {
  return async (dispatch) => {
    const response = await axios.get(
      `lead/corredorcheckeddescargados?email=${email}`
    );
    const corredorLeadCheckedDescargados = response.data;
    dispatch({
      type: GET_CORREDOR_LEAD_CHECKED_DESCARGARDOS,
      payload: corredorLeadCheckedDescargados,
    });
  };
};
export const getAllEmployees = () => {
  return async (dispatch) => {
    const response = await axios.get("/employees");
    const allEmployees = response.data;
    dispatch({ type: GET_ALL_EMPLOYEES, payload: allEmployees });
  };
};

export const getCorredor = () => {
  return async (dispatch) => {
    const response = await axios.get("/lead/allcorredor");
    const allCorredores = response.data;
    dispatch({ type: GET_CORREDORES, payload: allCorredores });
  };
};
export const getFreelancers = () => {
  return async (dispatch) => {
    const response = await axios.get("/lead/allfreelancer");
    const allFreelancer = response.data;
    dispatch({ type: GET_FREELANCER, payload: allFreelancer });
  };
};

export const getVendedor = () => {
  return async (dispatch) => {
    const response = await axios.get("/lead/allvendedor");
    const allVendedores = response.data;
    dispatch({ type: GET_VENDEDORES, payload: allVendedores });
  };
};

export const getAllProfesion = () => {
  return async (dispatch) => {
    const response = await axios.get("/lead/profesion");
    const allProfesion = response.data;
    dispatch({ type: GET_ALL_PROFESION, payload: allProfesion });
  };
};
export const getAllProfesionFreelance = (emailAddress) => {
  return async (dispatch) => {
    const response = await axios.get(
      `/lead/profesionfreelance?email=${emailAddress}`
    );
    const allProfesion = response.data;
    dispatch({ type: GET_ALL_PROFESION_FREELANCE, payload: allProfesion });
  };
};

export const getAllCountries = () => {
  return async (dispatch) => {
    const response = await axios.get("/lead/country");
    const allCountries = response.data;
    dispatch({ type: GET_ALL_COUNTRY, payload: allCountries });
  };
};
export const getAllCountriesFreelance = (emailAddress) => {
  return async (dispatch) => {
    const response = await axios.get(
      `/lead/countryfreelance?email=${emailAddress}`
    );
    const allCountries = response.data;
    dispatch({ type: GET_ALL_COUNTRY_FREELANCE, payload: allCountries });
  };
};
export const getAllCategory = () => {
  return async (dispatch) => {
    const response = await axios.get("/lead/category");
    const allCategory = response.data;
    dispatch({ type: GET_ALL_CATEGORY, payload: allCategory });
  };
};
export const getDetailEmploy = (email) => {
  return async (dispatch) => {
    const response = await axios.get(`/employees/email/?email=${email}`);
    const detailEmploy = response.data;
    dispatch({ type: GET_DETAIL_EMPLOY, payload: detailEmploy });
  };
};

export const updateLeadIncidence = (client, body) => {
  return async () => {
    await axios.put(`lead/${client}`, body);
  };
};

// *******************************Clientes *******************************
export const getAllClientes = () => {
  return async (dispatch) => {
    const response = await axios.get("/clientes/");
    const clientes = response.data;
    dispatch({ type: GET_ALL_CLIENTES, payload: clientes });
  };
};
export const updateClientProfile = (userEmail, body) => {
  return async () => {
    await axios.put(`/clientes/update?email=${userEmail}`, body);
  };
};
export const getClientByEmail = (userEmail) => {
  return async (dispatch) => {
    const response = await axios.get(`/clientes/user?email=${userEmail}`);
    const client = response.data;
    dispatch({ type: GET_CLIENT_BY_EMAIL, payload: client });
  };
};

export const getClienteEmpresa = (emailApp) => {
  return async (dispatch) => {
    if (emailApp !== "undefined" && emailApp !== "") {
      const response = await axios.get(
        `/lead/leademailapp?emailApp=${emailApp}`
      );
      const empresa = response.data;
      dispatch({ type: GET_CLIENTE_EMPRESA, payload: empresa });
    }
  };
};
export const UpdateClienteEmpresa = (emailApp, updateStripe) => {
  return async (dispatch) => {
    if (emailApp !== "undefined" && emailApp !== "") {
      const response = await axios.put(
        `/lead/emailapp?emailApp=${emailApp}`,
        updateStripe
      );
      const empresa = response.data;
      dispatch({ type: PUT_CLIENTE_EMPRESA, payload: empresa });
    }
  };
};
