import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Checkbox, FormControlLabel, Input, TextField } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllPromociones } from "../../../../redux/actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "30px",
  boxShadow: 24,
  textAlign: "center",
  color: "white",
  backgroundColor: "#39394b",
  pt: 2,
  px: 4,
  pb: 3,
};

export default function AgregarPromosion() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [promocion, setPromocion] = React.useState({
    name: "",
    hora: 0,
    link: "",
    cuota: 0,
    monto: 0,
    valorCuota: 0,
    descuento: 0,
    edicion: true,
    active: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cargarPromocion = async () => {
    await axios.post(`/promociones`, promocion);
    dispatch(getAllPromociones());
    handleClose();
  };

  const handleChange = (event, property) => {
    let newValue;

    if (property === "name") {
      newValue = event.target.value.trimStart();
    } else if (
      property === "hora" ||
      property === "link" ||
      property === "cuota" ||
      property === "monto" ||
      property === "descuento" ||
      property === "valorCuota"
    ) {
      newValue = event.target.value.trim();
    } else if (property === "active") {
      newValue = !promocion.active;
    } else if (property === "edicion") {
      newValue = !promocion.edicion;
    } else {
      newValue = event.target.value;
    }

    setPromocion({
      ...promocion,
      [property]: newValue,
    });
  };

  return (
    <div className="mx-5">
      <Button
        variant="outlined"
        sx={{
          color: "white",
          borderColor: "#ae2dff",
          "&:hover": {
            borderColor: "#a020f0",
          },
        }}
        onClick={handleOpen}
      >
        Añadir Promociones
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-5">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Agregue una Promoción nueva
            </Typography>
            <TextField
              fullWidth
              label="Nombre de promoción"
              type="text"
              id="Nombre"
              value={promocion.name}
              onChange={(e) => handleChange(e, "name")}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
            <TextField
              fullWidth
              type="text"
              label="Link de Stripe"
              id="Link"
              value={promocion.link}
              onChange={(e) => handleChange(e, "link")}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
            <TextField
              fullWidth
              type="number"
              label="Horas"
              id="Horas"
              value={promocion.hora}
              onChange={(e) => handleChange(e, "hora")}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
            <TextField
              fullWidth
              type="number"
              label="Cantidad de Cuotas"
              id="Cuotas"
              value={promocion.cuota}
              onChange={(e) => handleChange(e, "cuota")}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
            <TextField
              fullWidth
              type="number"
              label="Monto de Cuotas"
              id="Monto"
              value={promocion.valorCuota}
              onChange={(e) => handleChange(e, "valorCuota")}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
            <TextField
              fullWidth
              type="number"
              label="Monto Total"
              id="Monto"
              value={promocion.monto}
              onChange={(e) => handleChange(e, "monto")}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
            <TextField
              fullWidth
              type="number"
              label="Descuento"
              id="Descuento"
              value={promocion.descuento}
              onChange={(e) => handleChange(e, "descuento")}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={promocion.edicion}
                  onChange={(e) => handleChange(e, "edicion")}
                  color="primary"
                  size="large"
                  sx={{
                    color: "#ae2dff",
                    "& .MuiSvgIcon-root": {
                      fill: promocion.edicion && "#ae2dff",
                    },
                    "&:hover .MuiSvgIcon-root": {
                      fill: "#ae2dff",
                    },
                  }}
                />
              }
              label={`Promocion con Editores`}
            /> */}
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "#ae2dff",
                "&:hover": {
                  borderColor: "#a020f0",
                },
              }}
              onClick={cargarPromocion}
            >
              Agregar Promoción
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
