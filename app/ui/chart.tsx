import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const labels = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chi phí năm nay (triệu đồng)",
    },
  },
};

export default function ChartMoney({ dataIn }: { dataIn: number[] }) {
  let data = {
    labels,
    datasets: [
      {
        label: "Dataset 2",
        data: dataIn,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
