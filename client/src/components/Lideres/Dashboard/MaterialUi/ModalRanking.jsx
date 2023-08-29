import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFreelancer } from "../../../../redux/actions";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import gold from "../../../../Assets/gold.webp";
import silver from "../../../../Assets/silver.webp";
import bronze from "../../../../Assets/bronze.webp";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  textAlign: "center",
  color: "white",
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: "20px",
};

export default function ChildModal() {
  const { freelancer } = useSelector((state) => state);
  const [allFreelancer, setFreelancer] = useState("");
  const [infoFreelancer, setInfoFreelancer] = useState("");
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const place = [gold, silver, bronze];

  useEffect(() => {
    dispatch(getAllFreelancer());
  }, [dispatch]);

  useEffect(() => {
    setFreelancer(freelancer);
  }, [freelancer]);
  useEffect(() => {
    InfoFreelancer();
  }, [allFreelancer]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const InfoFreelancer = async () => {
    let body;
    const infoPromises =
      allFreelancer &&
      allFreelancer.map(async (free) => {
        const response = await axios.get(`/lead/freelancer?name=${free.name}`);
        const data = response.data;
        body = { [free.name]: data, photo: free.photo };
        return body;
      });
    const info = await Promise.all(infoPromises);
    const sortedInfo = [...info].sort((a, b) => {
      const first = b[Object.keys(b)[0]];
      const sortedB = first.reduce((total, ventas) => {
        if (ventas.status === "Contratado") {
          return total + 1;
        }
        return total;
      }, 0);

      const last = a[Object.keys(a)[0]];
      const sortedA = last.reduce((total, ventas) => {
        if (ventas.status === "Contratado") {
          return total + 1;
        }
        return total;
      }, 0);

      return sortedB - sortedA;
    });
    setInfoFreelancer(sortedInfo);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Button
        variant="contained"
        sx={{
          color: "white",
          bgcolor: "#ae2dff",
          "&:hover": {
            bgcolor: "#a020f0",
          },
        }}
        onClick={handleOpen}
      >
        RANKING
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(00, 00, 00, 0.9)",
          },
        }}
      >
        <Box
          sx={{
            ...style,
            width: "40%",
            backgroundColor: "#39394b",
            height: "800px",
          }}
        >
          <div className="flex flex-col gap-5 px-1 py-8 h-full w-full ">
            <h2 className="font-extrabold text-white text-24 mb-8">
              Ranking de Freelancers!
            </h2>
            <div className="flex flex-col gap-5 overflow-scroll h-full pt-1">
              {infoFreelancer &&
                infoFreelancer.map((free, index) => {
                  const firstProperty = Object.keys(infoFreelancer[index])[0];
                  const Leads = infoFreelancer[index]?.[firstProperty];
                  const totalLeadsAsignados = Leads.length || 0;
                  const LeadsChecked = Leads.reduce((total, lead) => {
                    if (lead.checked === true) {
                      return total + 1;
                    }
                    return total;
                  }, 0);
                  const LeadsVendidos = Leads.reduce((total, lead) => {
                    if (lead.status === "Contratado") {
                      return total + 1;
                    }
                    return total;
                  }, 0);
                  const LeadsAPagar = Leads.reduce((total, lead) => {
                    if (lead.status === "A pagar") {
                      return total + 1;
                    }
                    return total;
                  }, 0);

                  return (
                    <div
                      className="flex justify-between items-center bg-[#222131] h-[80px] rounded-xl p-3 "
                      key={index}
                    >
                      <div className="w-1/12 ">
                        {infoFreelancer[index].photo ? (
                          <img
                            src={infoFreelancer[index].photo}
                            alt="photo"
                            className="rounded-full"
                          />
                        ) : null}
                      </div>
                      <div className="w-3/12">
                        <p className="text-center pl-3">
                          {Object.keys(infoFreelancer[index])[0]}
                        </p>
                      </div>
                      <div className="w-3/12">
                        <p>Clasificados</p>
                        <p>
                          {LeadsChecked}/{totalLeadsAsignados}
                        </p>
                      </div>
                      <div className="w-1/12">
                        <p>Ventas</p>
                        <p>{LeadsVendidos}</p>
                      </div>
                      <div className="w-2/12">
                        <p>A pagar </p>
                        <p>{LeadsAPagar}</p>
                      </div>
                      <div className="w-1/12">
                        <p>Rank</p>
                        <p>#{index + 1}</p>
                      </div>
                      <div className="w-1/12">
                        {index < 3 ? (
                          <img src={place[index]} alt="place" />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
