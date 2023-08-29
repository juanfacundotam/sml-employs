import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import "dayjs/locale/es";
import style from "../Modal/ResponsiveDateTimePickers.module.css";

export default function ResponsiveDateTimePickers({
  closeDateHour,
  changeTime,
  handleLlamadoVentaChange,
}) {
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  let date = "";
  const today = dayjs();

  const handleAcept = (date) => {
    closeDateHour();
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleLlamadoVentaChange()
  };

  const handleCancel = () => {
    changeTime(selectedDate);
    closeDateHour();
  };

  React.useEffect(() => {
    dayjs.locale("es"); // Establecer el idioma en español
  }, []);
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es" locale="es">
      <DemoContainer components={["StaticDateTimePicker"]}>
        <DemoItem>
          <StaticDateTimePicker
            sx={{
              width: 300,
              height: 500,
              borderRadius: 5,
              backgroundColor: "#39394B",
              color: "white",

              "& .css-1b9e08i-MuiTypography-root-MuiPickersToolbarText-root.Mui-selected":
                {
                  color: "white",
                },
              "& .css-1b9e08i-MuiTypography-root-MuiPickersToolbarText-root": {
                color: "white",
              },
              "& .css-1hbyad5-MuiTypography-root": {
                color: "white",
              },
              "& .css-13vtpvu-MuiTypography-root-MuiPickersToolbarText-root ": {
                color: "white",
              },
              "& .css-mvmxd9-MuiTypography-root-MuiPickersToolbarText-root": {
                color: "white",
              },
              "& .css-i4bv87-MuiSvgIcon-root": {
                color: "white",
              },
              "& .css-1tkx1wf-MuiSvgIcon-root-MuiPickersCalendarHeader-switchViewIcon":
                {
                  color: "white",
                },
              "& .css-1vooibu-MuiSvgIcon-root": {
                color: "white",
              },
              "& .css-rhmlg1-MuiTypography-root-MuiDayCalendar-weekDayLabel": {
                color: "white",
              },
              "& .css-qa7bje-MuiButtonBase-root-MuiPickersDay-root": {
                color: "white",
              },
              "& .css-1e4tpwf-MuiTypography-root-MuiPickersToolbarText-root-MuiDateTimePickerToolbar-separator":
                {
                  color: "white",
                },
              "& .css-zddqwy-MuiClockNumber-root": {
                color: "white",
              },
              "& .css-53ccts-MuiClockNumber-root": {
                color: "white",
              },
              "& .css-1e6y48t-MuiButtonBase-root-MuiButton-root": {
                display: "none",
                color: "white",
              },
            }}
            format={`D/M/YYYY HH:mm`}
            defaultValue={today}
            value={selectedDate}
            onChange={handleDateChange}
          />
        </DemoItem>
      </DemoContainer>
          <button
            type="button"
            className="w-fit py-1 px-2 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 absolute right-3 bottom-3"
            onClick={handleCancel}
          >
            Guardar
          </button>
    </LocalizationProvider>
  );
}
