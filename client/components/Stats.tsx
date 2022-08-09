import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  tackingData: {
    All: number;
    Todo: number;
    Solved: number;
  };
}

const Stats: React.FC<Props> = ({ tackingData: { Solved, All, Todo } }) => {
  console.log(Solved, All, Todo);
  return (
    <div className="mr-4 h-40 w-40 md:h-48 md:w-48 lg:mr-12">
      <Pie
        data={{
          labels: ["Remaining", "Solved", "Todo"],
          datasets: [
            {
              label: "Question",
              data: [All - Solved, Solved, Todo],
              backgroundColor: [
                "rgba(255, 99, 132, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 206, 86, 0.7)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
              type: "pie",
              borderRadius: 1,
            },
          ],
        }}
      />
    </div>
  );
};

export default Stats;
