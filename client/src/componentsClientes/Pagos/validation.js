const validation = (pago) => {
    const errores = {};

    const regexEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(pago.nombre[0] === " " || !pago.nombre) errores.nombre = "Nombre: Complete el campo del nombre"
    if(pago.email[0] === " " || !pago.email) errores.email = "email: Complete el campo del email"
    else if (!regexEmail.test(pago.email)) errores.email = "Email: Debe que ser un email";
    if(pago.email2[0] === " " || !pago.email2) errores.email2 = "email: Complete el campo del email"
    else if (pago.email !== pago.email2) errores.email2 = "Email: Los email no coinciden";
  if (pago.pais[0] === "" || !pago.pais) errores.pais = "País: Complete el campo del país";
  if (pago.calle[0] === "" || !pago.calle) errores.calle = "Calle: Complete el campo del Calle";
  if (pago.numero[0] === "" || !pago.numero) errores.numero = "Número: Complete el campo del número";
  if (pago.cp[0] === "" || !pago.cp) errores.cp = "CP: Complete el campo del CP";
  
  
  
  if (pago.tarjeta === "Your card number is invalid.") errores.tarjeta = "Número de tarjeta invalido";
  if (pago.tarjeta === "Your card number is incomplete.") errores.tarjeta = "Número de tarjeta incompleto";
  if (pago.tarjeta === "Your card's security code is incomplete.") errores.tarjeta = "Clave de seguridad incompleta";
  if (pago.tarjeta === "Your card's expiration date is incomplete.") errores.tarjeta = "Fecha de expiración incompleta";
  if (pago.tarjeta === "Your card's expiration date is incomplete.") errores.tarjeta = "Fecha de expiración incompleta";
  if (pago.tarjeta === "Your card's expiration year is in the past.") errores.tarjeta = "Tarjeta expirada";



    // if(pago.email2 === '') errores.email2 = "";
    // else if(pago.pais) errores.pais = "";
    // else if(pago.calle) errores.calle = "";
    // else if(pago.numero) errores.numero = "";  
    // if(!pago.cp) errores.cp = "";
    // if(pago.tarjeta) errores.tarjeta = "";
  

    
    return errores;
  };
  
  export default validation;
  