import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const PokemonBaseStats = ({ stats }) => {
  const baseStats = [...stats];
  const data = {
    labels: ['Hp', 'Att', 'Def', 'SpA', 'SpD', 'Spd'],
    datasets: [
      {
        backgroundColor: 'rgba(189,55,54,1)',
        hoverBackgroundColor: 'rgba(189,55,54,.5)',
        data: baseStats.map((stat) => stat.base_stat),
      },
    ],
  };

  const options = {
    layout: {
      padding: {
        right: 5,
      },
    },
    animation: {
      duration: 2500,
      easing: 'linear',
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            min: 0,
            max: 255,
            stepSize: 15,
            display: false,
          },
          gridLines: {
            drawTicks: false,
          },
        },
      ],
    },
  };
  return (
    <div className='PokemonBaseStats'>
      <h4>Base Stats:</h4>
      <div className='PokemonBaseStats-chart'>
        <HorizontalBar data={data} options={options} />
      </div>
    </div>
  );
};

export default PokemonBaseStats;
