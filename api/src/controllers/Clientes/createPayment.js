const Lead = require("../../models/Lead");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPayment = async ({
  token,
  plan,
  //  id, amount,
}) => {
  try {
    const customer = await stripe.customers.create({
      source: token, // ID del token de la tarjeta generado en el frontend
      // Otros detalles del cliente como nombre y correo electrónico
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan }], // ID del plan de suscripción
    });

    const dateContratado = new Date();
    const formattedTimeContratado = dateContratado.toISOString();
    console.log("Suscripción exitosa:", subscription);

    const lead = await Lead.findOneAndUpdate(
      {
        emailApp: "facutam@gmail.com",
      },
      {
        $set: {
          pagoRecibido: true,
          status: "Contratado",
          updateContratado: formattedTimeContratado,
        },
        $push: {
          observaciones_ventas: {
            status: "Contratado",
            fecha: formattedTimeContratado,
            status_op: "5 pagos de €500",
          },
        },
      },
      { new: true }
    );

    return subscription;
  } catch (error) {
    // Si ocurre un error al crear la suscripción
    console.log("Error al crear la suscripción:", error.message);

    if (error.type === "card_error" && error.code === "card_declined") {
      console.log("La tarjeta fue rechazada debido a fondos insuficientes");
      // Aquí puedes realizar acciones adicionales, como mostrar un mensaje al usuario
    }
    throw error; // Puedes lanzar el error nuevamente para manejarlo en el lugar donde llamaste a esta función
  }

  // const session = await stripe.paymentIntents.create({
  //   amount: amount,
  //   currency: "eur",
  //   description: "producto",
  //   payment_method: id,
  //   confirm: true,
  // });

  // Creamos la descripción para el pago basada en las cuotas restantes y el total de cuotas
  // const description = `cuotas ${cuotasRestantes + 1}/${cuotas}`;

  // // Creamos una sesión de pago en Stripe
  // const session = await stripe.checkout.sessions.create({
  //   line_items: [
  //     {
  //       price_data: {
  //         product_data: {
  //           images: [
  //             // Imagen del producto, en este caso, una URL de imagen
  //             "https://images-ext-1.discordapp.net/external/VmotedpeNAAv9Sz0GZI5iLiobf_7NpJn24pyas4ed_Y/https/i.postimg.cc/4y1YcByV/1685492595204-removebg-preview.webp",
  //           ],
  //           name: name, // Nombre del producto
  //           description: description, // Descripción del producto basada en las cuotas restantes y el total de cuotas
  //         },
  //         currency: "eur", // Moneda del precio
  //         unit_amount: valorCuota * 100, // Monto total del precio en centavos (el precio debe estar en la misma moneda que se establece arriba)
  //       },
  //       quantity: 1, // Cantidad del producto (en este caso, siempre es 1)
  //     },
  //   ],
  //   mode: "payment", // Modo de la sesión de pago (pago único)
  //   payment_method_types: ["card"], // Métodos de pago permitidos (en este caso, solo se permite tarjeta)
  //   payment_intent_data: {
  //     payment_method_options: {
  //       card: {
  //         installments: cuotas, // Establece el número de cuotas del pago en la tarjeta
  //       },
  //     },
  //     description: description, // Establece el detalle del pago
  //   },
  //   success_url: "https://sml-app.vercel.app/clientes-pagos", // URL a la que se redirigirá al usuario después de un pago exitoso
  //   locale: "es", // Configura el idioma de la interfaz de pago de Stripe en español
  // });

  // return session;
};

// Exportamos la función para que pueda ser utilizada en otros archivos
module.exports = createPayment;

// const createPayment = async ({
//   id,
//   name,
//   monto,
//   cuotas,
//   cuotasRestantes,
//   valorCuota,
// }) => {
//   // Creamos la descripción para el pago basada en las cuotas restantes y el total de cuotas
//   const description = `cuotas ${cuotasRestantes + 1}/${cuotas}`;

//   // Creamos una sesión de pago en Stripe
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           product_data: {
//             images: [
//               // Imagen del producto, en este caso, una URL de imagen
//               "https://images-ext-1.discordapp.net/external/VmotedpeNAAv9Sz0GZI5iLiobf_7NpJn24pyas4ed_Y/https/i.postimg.cc/4y1YcByV/1685492595204-removebg-preview.webp",
//             ],
//             name: name, // Nombre del producto
//             description: description, // Descripción del producto basada en las cuotas restantes y el total de cuotas
//           },
//           currency: "eur", // Moneda del precio
//           unit_amount: valorCuota * 100, // Monto total del precio en centavos (el precio debe estar en la misma moneda que se establece arriba)
//         },
//         quantity: 1, // Cantidad del producto (en este caso, siempre es 1)
//       },
//     ],
//     mode: "payment", // Modo de la sesión de pago (pago único)
//     payment_method_types: ["card"], // Métodos de pago permitidos (en este caso, solo se permite tarjeta)
//     payment_intent_data: {
//       payment_method_options: {
//         card: {
//           installments: cuotas, // Establece el número de cuotas del pago en la tarjeta
//         },
//       },
//       description: description, // Establece el detalle del pago
//     },
//     success_url: "https://sml-app.vercel.app/clientes-pagos", // URL a la que se redirigirá al usuario después de un pago exitoso
//     locale: "es", // Configura el idioma de la interfaz de pago de Stripe en español
//   });

//   return session; // Devolvemos la sesión de pago creada por Stripe
// };
