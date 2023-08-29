import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';

function DateTimePicker() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
  
    const handleDateChange = (date) => {
      setSelectedDate(date[0]);
    };
  
    const handleTimeChange = (time) => {
      setSelectedTime(time[0]);
    };
  
    return (
      <div>
        <label htmlFor="fecha">Fecha:</label>
        <Flatpickr
          id="fecha"
          value={selectedDate}
          options={{
            enableTime: false,
            dateFormat: 'd-m-y',
          }}
          onChange={handleDateChange}
        />
  
        <label htmlFor="hora">Hora:</label>
        <Flatpickr
          id="hora"
          value={selectedTime}
          options={{
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            hourPlaceholder: "hh"
          }}
          onChange={handleTimeChange}
        />
      </div>
    );
  }

  export default DateTimePicker