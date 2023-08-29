import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllPromociones } from "../../../../redux/actions";
import { VscSettings } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#39394b",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  borderRadius: "30px",
  p: 4,
};

const styleButton = {
  bgcolor: "transparent",
  width: "96.5%",
  height: "3rem",
};

const buttonsend = {
  bgcolor: "transparent",
  width: "30%",
  color: "white",
  borderColor: "#ae2dff",
  "&:hover": {
    borderColor: "#a020f0",
  },
};

export default function ActualizarPromocion({ item }) {
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
    active: false,
    edicion: true,
  });

  React.useEffect(() => {
    setPromocion({
      ...promocion,
      name: item.promocion.name || "",
      hora: item.promocion.hora || 0,
      link: item.promocion.link || "",
      cuota: item.promocion.cuota || 0,
      monto: item.promocion.monto || 0,
      valorCuota: item.promocion.valorCuota || 0,
      descuento: item.promocion.descuento || 0,
      active: item.promocion.active || false,
      edicion: item.promocion.edicion || true,
    });
  }, [item]);

  const handleOpen = () => {
    dispatch(getAllPromociones());
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(getAllPromociones());
    setOpen(false);
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

  const updatePromocion = () => {
    toast.success(`✔ Promoción actualizada! `, {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const deletePromocion = () => {
    toast.success(`✔  Promoción eliminada! `, {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const actualizarPromocion = async () => {
    await axios.put(`/promociones/${item._id}`, promocion);
    dispatch(getAllPromociones());
    updatePromocion();
    handleClose();
  };

  const eliminarromocion = async () => {
    await axios.delete(`/promociones/${item._id}`, promocion);
    dispatch(getAllPromociones());
    deletePromocion();
    handleClose();
  };

  return (
    <div className="flex items-center justify-center">
      <ToastContainer />
      <Button sx={styleButton} onClick={handleOpen}>
        <VscSettings className="text-[1.5rem] text-[#ae2dff] hover:text-[#a020f0]" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Quieres modificar la promoción {item.promocion.name}?
          </Typography>
          <TextField
            fullWidth
            label="Promoción"
            id="Promoción"
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
            label="Hora"
            id="Hora"
            type="number"
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
            label="Link"
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
            label="Cuota"
            id="Cuota"
            type="number"
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
            label="Monto"
            id="Monto"
            type="number"
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
            label="Valor de Cuota"
            id="ValorCuota"
            type="number"
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
            label="Descuento"
            id="Descuento"
            type="number"
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
          <FormControlLabel
            control={
              <Checkbox
                checked={promocion.active}
                onChange={(e) => handleChange(e, "active")}
                color="primary"
                size="large"
                sx={{
                  color: "#ae2dff",
                  "& .MuiSvgIcon-root": {
                    fill: promocion.active && "#ae2dff",
                  },
                  "&:hover .MuiSvgIcon-root": {
                    fill: "#ae2dff",
                  },
                }}
              />
            }
            label={`Estado de la Promoción: ${
              item.promocion.active === true ? " Activa " : " Inactiva "
            }`}
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
          <div className="flex gap-5 justify-center items-center">
            <Button
              sx={buttonsend}
              variant="outlined" 
              onClick={actualizarPromocion}
            >
              Actualizar Promoción
            </Button>
            <Button
              sx={buttonsend}
              variant="outlined" 
              onClick={eliminarromocion}
            >
              Eliminar Promoción
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
