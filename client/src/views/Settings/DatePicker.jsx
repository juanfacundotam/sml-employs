import * as React from "react";
import { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";
import "dayjs/locale/es";

export default function BasicDatePicker({ handleDateFromPicker, saveDate }) {
  const dateBackup = saveDate && saveDate.split("/").reverse().join("/");

  const [selectedDate, setSelectedDate] = useState(dayjs(dateBackup));

  const funcion = () => {
    return selectedDate;
  };

  const handleChangeDate = (date) => {
    setSelectedDate(date);
    handleDateFromPicker(date);
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="es"
      locale="es"
    >
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label=""
          value={dayjs(dateBackup ? dateBackup : null)}
          onChange={handleChangeDate}
          sx={{
            width: 350,
            borderRadius: 5,
            backgroundColor: "#39394B",
            color: "white",
            "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
              color: "white",

            },
            "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
              color: "white",

            },
            "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
              backgroundColor: "#222131",
              color: "white",
              border: "1px solid white",

              borderRadius: "15px",
            },
            // "& .css-1cb9e0w-MuiFormControl-root-MuiTextField-root ":
            //   {
            //     backgroundColor: "#222131",
            //     color: "white",
            //     // border: "1px solid white",
            //     borderRadius: "15px",
            //   },
            // "& .css-i4bv87-MuiSvgIcon-root": {
            //   color: "white",

            // },
            // "& .css-1xhypcz-MuiStack-root": {

            //   color: "white",
            // },
          }}
          //   value={selectedDate}
          //   onChange={handleDateChange}

          renderInput={(params) => (
            <input
              {...params.inputProps}
              value={selectedDate ? selectedDate.format("DD/MM/YYYY") : ""}
              readOnly
              placeholder="Fecha de nacimiento"
              className="border-2 border-gray-950"
            />
          )}
          format="DD/MM/YYYY"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
