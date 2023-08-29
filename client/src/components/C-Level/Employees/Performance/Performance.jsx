import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Performance() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        backgroundColor: "violet",
        borderColor: "violet",
        borderWidth: 1,
        hoverBackgroundColor: "purple",
        hoverBorderColor: "purple",
        data: [100, 233, 260, 245, 300, 320],
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    color: "white",
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const keyframes = `
        @keyframes fill-progress {
          from {
            stroke-dasharray: 0 100;
          }
          to {
            stroke-dasharray: var(--percent) 100;
          }
        }
      `;
  return (
    <div className=" flex flex-col h-2/4 w-full items-center gap-y-2">
      <div className=" w-10/12 h-3/6 border-gray-400 border-2">
        <div className="flex h-1/12 items-center justify-between pr-4 pl-2 pt-2">
          <p className=" font-normal text-18 pt-0 text-gray-200">Performance</p>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              stroke="white"
              fill="none"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="19" r="1" />
              <circle cx="12" cy="5" r="1" />
            </svg>
          </button>
        </div>
        <div className="flex h-5/6">
          <Bar data={data} options={options} />
        </div>
      </div>
      <div className=" flex flex-row h-3/6 w-[300px] justify-center  items-center gap-x-3 ">
        <div
          style={{ "--percent": "70" }}
          className=" flex w-2/5 h-4/6 border-gray-400 border-2 relative"
        >
          <style>{keyframes}</style>
          <svg>
            <circle
              r="35%"
              cx="50%"
              cy="50%"
              pathLength="100"
              strokeDasharray="100 100"
              className="fill-none stroke-slate-600 stroke-[10%] "
            ></circle>
            <circle
              r="35%"
              cx="50%"
              cy="50%"
              pathLength="100"
              strokeDasharray="var(--percent) 100"
              className="fill-none stroke-green-300 stroke-[10%] transform -rotate-90 origin-center border-red-600 "
              style={{ animation: "fill-progress 1s ease-out forwards" }}
            ></circle>
          </svg>
          <span className="absolute top-0 bottom-0 left-0 right-0 items-center justify-center flex font-normal text-18 pt-0 text-gray-200">
            70%
          </span>
        </div>
        <div
          style={{ "--percent": "60" }}
          className=" flex w-2/5 h-4/6 border-gray-400 border-2 relative"
        >
          <style>{keyframes}</style>
          <svg>
            <circle
              r="35%"
              cx="50%"
              cy="50%"
              pathLength="100"
              strokeDasharray="100 100"
              className="fill-none stroke-slate-600 stroke-[10%] "
            ></circle>
            <circle
              r="35%"
              cx="50%"
              cy="50%"
              pathLength="100"
              strokeDasharray="var(--percent) 100"
              className="fill-none stroke-blue-600 stroke-[10%] transform -rotate-90 origin-center border-red-600 "
              style={{ animation: "fill-progress 1s ease-out forwards" }}
            ></circle>
          </svg>
          <span className="absolute top-0 bottom-0 left-0 right-0 items-center justify-center flex font-normal text-18 pt-0 text-gray-200">
            60%
          </span>
        </div>
      </div>
    </div>
  );
}
