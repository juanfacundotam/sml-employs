const mongoose = require("mongoose");
const validator = require("validator");

const LeadSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      require: true,
    },
    province: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    telephone: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
    instagram: {
      type: String,
      require: true,
    },
    level: {
      type: String,
      enum: ["", "-", "0", "1", "2", "incidencia"],
      require: true,
    },
    status: {
      type: String,
      enum: [
        "Sin contactar",
        "Rechazado",
        "Contratado",
        "A pagar",
        "No responde",
        "Agenda llamada",
        "En proceso",
        "Contactado",
        "incidencia",
        "discard",
      ],
      require: true,
    },
    llamada_venta: {
      type: Object,
      require: true,
    },
    status_op: {
      type: String,
      require: true,
      default: "",
    },
    observaciones_ventas: {
      type: Array,
      require: true,
      default: "",
    },
    pagos: {
      type: Object,
      require: true,
    },
    dataStripe: {
      type: Object,
      require: true,
    },
    pagoRecibido: {
      type: Boolean,
      require: true,
    },
    edicion: {
      type: Boolean,
      require: true,
      default: false,
    },
    linkActivado: {
      type: Boolean,
      require: true,
    },
    linkPago: {
      type: String,
      require: true,
    },
    primeraPromosion: {
      type: Object,
      require: true,
    },
    segundaPromosion: {
      type: Object,
      require: true,
    },
    contacto: {
      type: String,
      require: true,
    },
    llamados: {
      type: Number,
      require: true,
      default: 0,
    },
    vendedor: {
      type: String,
      require: true,
      default: "",
    },
    vendedor_name: {
      type: String,
      require: true,
      default: "",
    },
    emailApp: {
      type: String,
      require: true,
      default: "",
    },
    corredor: {
      type: String,
      require: true,
      default: "",
    },
    corredor_name: {
      type: String,
      require: true,
      default: "",
    },
    checked: {
      type: Boolean,
      require: true,
      default: false,
    },
    view: {
      type: Boolean,
      require: true,
      default: false,
    },
    freelancer: {
      type: Boolean,
      require: true,
      default: false,
    },
    descargadosLeader: {
      type: Boolean,
      require: true,
      default: false,
    },
    descargadosCorredor: {
      type: Boolean,
      require: true,
      default: false,
    },
    country: {
      type: String,
      require: true,
    },
    profesion: {
      type: String,
      require: true,
    },
    marca_personal: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
      default: "",
    },
    speech: {
      type: String,
      require: true,
      default: "",
    },
    monto_op: {
      type: Number,
      require: true,
      default: 0,
    },
    fecha_op: {
      type: String,
      require: true,
      default: "",
    },
    seguidores2000: {
      type: Boolean,
      default: false,
      require: true,
    },
    repercusion: {
      type: Boolean,
      default: false,
      require: true,
    },
    frecuencia: {
      type: Boolean,
      default: false,
      require: true,
    },
    contenidoPersonal: {
      type: Boolean,
      default: false,
      require: true,
    },
    contenidoValor: {
      type: Boolean,
      default: false,
      require: true,
    },
    calidadInstagram: {
      type: Boolean,
      default: false,
      require: true,
    },
    from: {
      type: String,
      require: true,
    },
    url_linkedin: {
      type: String,
      require: true,
    },
    updateCorredor: {
      type: Date,
      require: true,
    },
    updateVendedor: {
      type: Date,
      require: true,
    },
    updateSinContactar: {
      type: Date,
      require: true,
    },
    updateRechazado: {
      type: Date,
      require: true,
    },
    updateContratado: {
      type: Date,
      require: true,
    },
    updateNoResponde: {
      type: Date,
      require: true,
    },
    updateContactado: {
      type: Date,
      require: true,
    },
    updateAPagar: {
      type: Date,
      require: true,
    },
    updateSegundoLlamado: {
      type: Date,
      require: true,
    },
    updateIncidencia: {
      type: Date,
      require: true,
    },
    updateEnProceso: {
      type: Date,
      require: true,
    },
    deleted: {
      type: Boolean,
      require: true,
      default: false,
    },
    promociones: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Lead = new mongoose.model("lead", LeadSchema);

module.exports = Lead;
