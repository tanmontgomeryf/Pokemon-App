import React, { Fragment } from 'react';
import { totalBaseStats } from '../../helpers';
import { Bar } from 'react-chartjs-2';

const PokemonBaseStats = ({ stats }) => {
  const baseStats = [...stats].reverse();
  const data = {
    labels: baseStats.map((stat) => stat.stat.name),
    datasets: [
      {
        labels: baseStats.map((stat) => stat.stat.name),
        backgroundColor: 'rgba(189,55,54,1)',
        borderColor: 'rgba(189,55,54,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(189,55,54,.5)',
        hoverBorderColor: 'rgba(189,55,54,.5)',
        data: baseStats.map((stat) => stat.base_stat),
      },
    ],
  };

  const options = {
    animation: {
      duration: 3000,
      easing: 'linear',
    },
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 255,
            display: false,
          },
          gridLines: {
            offsetGridLines: false,
          },
        },
      ],
    },
  };
  return (
    <div>
      <h4>Base Stats</h4>
      <Bar data={data} options={options} />
    </div>
    // <Fragment>
    //   <h4>Base Stats</h4>
    //   {totalBaseStats(stats).map((stat) => (
    //     <p key={stat.name}>
    //       <strong>{stat.name}:</strong> {stat.baseStat}
    //     </p>
    //   ))}
    // </Fragment>
  );
};

export default PokemonBaseStats;
