import React, { useRef, useEffect, FC } from 'react';
import Chart from 'chart.js/auto';
import { SecretInfo } from 'smart-contracts/passing-secret-info/types';
import useSecretInfoChart from './use-secret-info-chart';


export interface SecretInfoChartProps {
  secretInfos: SecretInfo[]
}

const SecretInfoChart: FC<SecretInfoChartProps> = ({ secretInfos }) => {
  const { datasets, labels, isDone } = useSecretInfoChart({ secretInfos });
  console.log("🚀 ~ isDone:", isDone)
  console.log("🚀 ~ labels:", labels)
  console.log("🚀 ~ datasets:", datasets)
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log('doing')
    if (!isDone) return
    if (chartRef && chartRef.current) {
      buildChart();
    }
  }, [isDone]);
  

  const buildChart = () => {
    if (chartRef && chartRef.current) {
      const ref = chartRef.current.getContext('2d');
      if (ref) {
        new Chart(ref, {
          type: 'line',
          data: {
            labels,
            datasets,
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  };

  return (
    <div className='w-2/3 mt-12'>
      <canvas ref={chartRef} />
    </div>
  );
}

export default SecretInfoChart;
