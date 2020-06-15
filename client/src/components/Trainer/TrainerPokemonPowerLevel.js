import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const TrainerPokemonPowerLevel = ({ stats, baseStats }) => {
  const data = {
    labels: ['Base Stats Total'],
    datasets: [
      {
        backgroundColor: 'rgba(189,55,54,1)',
        hoverBackgroundColor: 'rgba(189,55,54,.5)',
        barThickness: 15,
        data: [baseStats],
      },
    ],
  };

  const options = {
    tooltips: { enabled: false },
    hover: { mode: null },
    layout: {
      padding: {
        right: 2,
        top: 1,
        left: 1,
        bottom: 1,
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
            max: 720,
            display: false,
          },
          gridLines: {
            drawTicks: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
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
    <div className='TrainerPokemonPowerLevel'>
      <HorizontalBar data={data} options={options} />
    </div>
  );
};

export default TrainerPokemonPowerLevel;
