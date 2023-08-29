import { useEffect, useState } from "react";
import {
  PaymentElement,
  CardElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import style from "./CheckoutForm.module.css";
import validation from "./validation";
import axios from "axios";
import ModalConfirmacion from "./ModalConfirmacion";

const CheckoutForm = ({ emailApp, clienteEmpresa }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadChecks, setLoadChecks] = useState({
    nombre: false,
    email: false,
    email2: false,
    pais: false,
    calle: false,
    numero: false,
    cp: false,
  });
  const [errores, setErrores] = useState({
    nombre: "2",
    email: "2",
    email2: "2",
    pais: "2",
    calle: "2",
    numero: "2",
    cp: "2",
    tarjeta: "",
  });
  const [datos, setDatos] = useState({
    nombre: "",
    email: "",
    email2: "",
    pais: "",
    calle: "",
    numero: "",
    cp: "",
    tarjeta: "",
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //     setErrores({ ...errores, message: "" });
  //   }, 3000);
  // }, [setLoading]);
  // setLoading(false);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLoadChecks({ ...loadChecks, [name]: true });
    setDatos({ ...datos, [name]: value });
    setErrores(validation({ ...datos, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // setTimeout(() => {
      setLoading(false);
      //   // setErrores({ ...errores, message: "" });
      // }, 3000);
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: elements.getElement(CardElement),
    // });

    const { token, error } = await stripe.createToken(
      elements.getElement(CardElement)
    );

    // console.log(paymentMethod)
    setLoading(true);
    // console.log(errores);
    // console.log(error);

    // 'Your card number is invalid.'
    // 'Your card number is incomplete.'
    // "Your card's security code is incomplete."
    // "Your card's expiration date is incomplete."
    // nombre: "",
    // email: "",
    // email2: "",
    // pais: "",
    // calle: "",
    // numero: "",
    // cp: "",
    // tarjeta: "",
    // console.log(error)
    if (
      !error &&
      !errores.nombre &&
      !errores.email &&
      !errores.email2 &&
      !errores.pais &&
      !errores.calle &&
      !errores.numero &&
      !errores.cp &&
      !errores.tarjeta
    ) {
      // console.log("Compra realizada");
      // const { id } = paymentMethod;

      try {
        const selectedPlan = "price_1NNdZpGpn5uZGCfp5ZNktK6p";
        const response = await axios.post("/clientes/payment", {
          token: token.id,
          plan: selectedPlan, // Aquí debes proporcionar el ID del plan seleccionado
          // Otros detalles como nombre, email, dirección, etc.
        });

        // const { data } = await axios.post(
        //   "/clientes/payment",
        //   {
        //     id,
        //     amount: 100, //"centavos por cien seria el peso"
        //   }
        // );

        setErrores({
          ...errores,
          nombre: "",
          email: "",
          email2: "",
          pais: "",
          calle: "",
          numero: "",
          cp: "",
          tarjeta: "",
        });

        // console.log({ datos, data });
        elements.getElement(CardElement).clear();
        navigate("/clientes-checkout");
      } catch (error) {
        console.log(error.response.data.message);
        setErrores(validation({ ...datos, tarjeta: error.message }));
        setLoading(false);

        // setErrores({ ...errores, message: error.message });
        // console.log(error);
      }
      setLoading(false);
    } else {
      setErrores({ ...errores, tarjeta: error ? error.message : "" });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-col justify-center items-center  ">
      <div className="flex flex-col justify-center items-center w-80 my-5">
        <h1 className="whitespace-nowrap text-24 text-white mb-5">
          {clienteEmpresa.name}
        </h1>

        <p>
          Detalle:{" "}
          {clienteEmpresa.dataStripe.cuotaDetail
            ? clienteEmpresa.dataStripe.cuotaDetail
            : "N/A"}
        </p>
        <p>
          Total:{" "}
          {clienteEmpresa.dataStripe.precio
            ? clienteEmpresa.dataStripe.precio
            : "N/A"}
        </p>
        <p>
          cuotas:{" "}
          {clienteEmpresa.dataStripe.cuotas
            ? clienteEmpresa.dataStripe.cuotas
            : "N/A"}
        </p>
        {/* <h1>Valor cuota: {clienteEmpresa.dataStripe.cuotaDetail && clienteEmpresa.dataStripe.cuotaDetail.split(" ")[1] ? `€${clienteEmpresa.cuotaDetail.split(" ")[1]}` : 'N/A'}</h1> */}
        <h1>
          Promoción:{" "}
          {clienteEmpresa.dataStripe.promocion
            ? clienteEmpresa.dataStripe.promocion
            : "N/A"}
        </h1>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center w-80 rounded-lg gap-4 pb-16"
        >
          <label htmlFor="" className=" w-full text-[18px] spa text-center">
            Complete los datos del pago
          </label>
          <div className="border-2 w-80 rounded-full"></div>
          <div className=" w-full relative">
            <label htmlFor="" className=" w-full text-[13px]">
              Nombre completo
            </label>
            {loadChecks.nombre ? (
              errores.nombre ? (
                <p className="absolute text-center text-14 text-red-500 right-1 bottom-4">
                  ❌
                </p>
              ) : (
                <p className="absolute text-center text-14 text-green-500 right-2 bottom-4">
                  ✔
                </p>
              )
            ) : (
              ""
            )}
            <input
              type="text"
              name="nombre"
              onChange={handleChange}
              value={datos.nombre}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#2a2a33] dark:border-gray-600 dark:placeholder-[#b1aeae] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nombre y Apellido"
            />
          </div>
          <div className=" w-full relative">
            <label htmlFor="" className=" w-full text-[13px]">
              Email
            </label>
            {loadChecks.email ? (
              errores.email ? (
                <p className="absolute text-center text-14 text-red-500 right-1 bottom-4">
                  ❌
                </p>
              ) : (
                <p className="absolute text-center text-14 text-green-500 right-2 bottom-4">
                  ✔
                </p>
              )
            ) : (
              ""
            )}
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={datos.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#2a2a33] dark:border-gray-600 dark:placeholder-[#b1aeae] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example@email.com"
            />
          </div>
          <div className=" w-full relative">
            <label htmlFor="" className=" w-full text-[13px]">
              Email confirmación
            </label>
            {loadChecks.email2 ? (
              errores.email2 ? (
                <p className="absolute text-center text-14 text-red-500 right-1 bottom-4">
                  ❌
                </p>
              ) : (
                <p className="absolute text-center text-14 text-green-500 right-2 bottom-4">
                  ✔
                </p>
              )
            ) : (
              ""
            )}
            <input
              type="text"
              name="email2"
              onChange={handleChange}
              value={datos.email2}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#2a2a33] dark:border-gray-600 dark:placeholder-[#b1aeae] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Repita su email"
            />
          </div>
          <div className="flex gap-2">
            <div className=" w-full relative">
              <label htmlFor="" className=" w-full text-[13px]">
                País
              </label>
              {loadChecks.pais ? (
                errores.pais ? (
                  <p className="absolute text-center text-14 text-red-500 right-1 bottom-4">
                    ❌
                  </p>
                ) : (
                  <p className="absolute text-center text-14 text-green-500 right-2 bottom-4">
                    ✔
                  </p>
                )
              ) : (
                ""
              )}
              <input
                type="text"
                name="pais"
                onChange={handleChange}
                value={datos.pais}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#2a2a33] dark:border-gray-600 dark:placeholder-[#b1aeae] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="País"
              />
            </div>
            <div className=" w-full relative">
              <label htmlFor="" className=" w-full text-[13px]">
                Calle
              </label>
              {loadChecks.calle ? (
                errores.calle ? (
                  <p className="absolute text-center text-14 text-red-500 right-1 bottom-4">
                    ❌
                  </p>
                ) : (
                  <p className="absolute text-center text-14 text-green-500 right-2 bottom-4">
                    ✔
                  </p>
                )
              ) : (
                ""
              )}
              <input
                type="text"
                name="calle"
                onChange={handleChange}
                value={datos.calle}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#2a2a33] dark:border-gray-600 dark:placeholder-[#b1aeae] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Calle"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className=" w-full relative">
              <label htmlFor="" className=" w-full text-[13px]">
                Número
              </label>
              {loadChecks.numero ? (
                errores.numero ? (
                  <p className="absolute text-center text-14 text-red-500 right-1 bottom-4">
                    ❌
                  </p>
                ) : (
                  <p className="absolute text-center text-14 text-green-500 right-2 bottom-4">
                    ✔
                  </p>
                )
              ) : (
                ""
              )}
              <input
                type="text"
                name="numero"
                onChange={handleChange}
                value={datos.numero}
                className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#2a2a33] dark:border-gray-600 dark:placeholder-[#b1aeae] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Número"
              />
            </div>
            <div className=" w-full relative">
              <label htmlFor="" className=" w-full text-[13px]">
                Código Postal
              </label>
              {loadChecks.cp ? (
                errores.cp ? (
                  <p className="absolute text-center text-14 text-red-500 right-1 bottom-4">
                    ❌
                  </p>
                ) : (
                  <p className="absolute text-center text-14 text-green-500 right-2 bottom-4">
                    ✔
                  </p>
                )
              ) : (
                ""
              )}
              <input
                type="text"
                name="cp"
                onChange={handleChange}
                value={datos.cp}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#2a2a33] dark:border-gray-600 dark:placeholder-[#b1aeae] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="CP"
              />
            </div>
          </div>
          <div className="border-2 w-80 rounded-full"></div>
          <div className=" w-full">
            <label htmlFor="" className=" w-full text-[13px]">
              Número de tarjeta
            </label>
            <div className="grid items-center bg-[#2a2a33] w-full h-14 rounded-xl p-3">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "18px",
                      color: "#ffffff",
                      "::placeholder": {
                        color: "#c2bfbf",
                      },
                      backgroundColor: "#2a2a33", // Background personalizado
                      borderRadius: "10px", // Border radius personalizado
                      border: "1px solid #bbbbbb",
                    },
                    invalid: {
                      color: "#f50b51",
                    },
                  },
                  hidePostalCode: true,
                }}
              />
            </div>
          </div>
          <div className="border-2 w-80 rounded-full"></div>
          {/* <ModalConfirmacion/> */}

          <button
            type="submit"
            disabled={
              !stripe ||
              errores.nombre ||
              errores.email ||
              errores.email2 ||
              errores.pais ||
              errores.calle ||
              errores.numero ||
              errores.cp
              // errores.tarjeta
            }
            className={
              !stripe ||
              errores.nombre ||
              errores.email ||
              errores.email2 ||
              errores.pais ||
              errores.calle ||
              errores.numero ||
              errores.cp
                ? "border-2 bg-[none] w-full text-[#8d8c8c] px-5 py-3 mt-3 rounded-xl hover:bg-[#182b46] flex justify-center"
                : " bg-[#3483FA] w-full text-white px-5 py-3 mt-3 rounded-xl hover:bg-[#2559a8] flex justify-center"
            }
          >
            {loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-6 h-6  text-gray-200 animate-spin dark:text-gray-600 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Buy"
            )}
          </button>
          <div className=" relative w-full flex justify-center">
            {/* {errores.nombre && (
          <p className="text-center text-14">{errores.nombre}</p>
        )}
        {errores.email && (
          <p className="text-center text-14">{errores.email}</p>
        )}
        {errores.email2 && (
          <p className="text-center text-14">{errores.email2}</p>
        )}
        {errores.pais && <p className="text-center text-14">{errores.pais}</p>}
        {errores.calle && (
          <p className="text-center text-14">{errores.calle}</p>
          )}
        {errores.numero && (
          <p className="text-center text-14">{errores.numero}</p>
        )}

        {errores.calle && (
          <p className="text-center text-14">{errores.calle}</p>
        )}
      {errores.cp && <p className="text-center text-14">{errores.cp}</p>} */}
            {errores.tarjeta && (
              <p className="absolute text-center text-14 text-red-400">
                {errores.tarjeta}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
//   !stripe ||
//   errores.nombre ||
//   errores.email ||
//   errores.email2 ||
//   errores.pais ||
//   errores.calle ||
//   errores.numero ||
//   errores.cp ||
//   errores.tarjeta
export default CheckoutForm;

// import React, {useState} from 'react';
// import {useStripe, useElements, PaymentElement, CartElement} from '@stripe/react-stripe-js';

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [errorMessage, setErrorMessage] = useState(null);

//   const handleSubmit = async (event) => {
//     // We don't want to let default form submission happen here,
//     // which would refresh the page.
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js hasn't yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     const {error} = await stripe.confirmPayment({
//       //`Elements` instance that was used to create the Payment Element
//       elements,
//       confirmParams: {
//         return_url: 'https://example.com/order/123/complete',
//       },
//     });

//     if (error) {
//       // This point will only be reached if there is an immediate error when
//       // confirming the payment. Show error to your customer (for example, payment
//       // details incomplete)
//       setErrorMessage(error.message);
//     } else {
//       // Your customer will be redirected to your `return_url`. For some payment
//       // methods like iDEAL, your customer will be redirected to an intermediate
//       // site first to authorize the payment, then redirected to the `return_url`.
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* <PaymentElement /> */}
//       <CartElement/>
//       <button disabled={!stripe}>Submit</button>
//       {/* Show error message to your customers */}
//       {/* {errorMessage && <div>{errorMessage}</div>} */}
//     </form>
//   )
// };

// export default CheckoutForm;
