import React from "react";

function Analytic() {
  return (
    <div className="flex flex-col h-screen w-screen">
      {/* <iframe
        title="dashboard SML"
        width="100%"
        height="100%"
        src="https://app.powerbi.com/view?r=eyJrIjoiY2NlZGM5ZjItODdjYS00YmM1LTgzODMtMDAzNTYyYjcxZjVkIiwidCI6ImZhMTYyNmJlLTUxMDMtNGM5MC1iYzJmLTY2NzAxMWIzMzAwYyJ9&pageName=ReportSection"
        frameborder="0"
        allowFullScreen="true"
      ></iframe> */}
      <iframe
        title="Report Section"
        width="100%"
        height="100%"
        src="https://app.powerbi.com/view?r=eyJrIjoiNjFiZTI4MWMtMDI5YS00OGNkLTkxNmItNDU2YzA5NzJmZmQ1IiwidCI6ImZhMTYyNmJlLTUxMDMtNGM5MC1iYzJmLTY2NzAxMWIzMzAwYyJ9"
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
}

export default Analytic;
