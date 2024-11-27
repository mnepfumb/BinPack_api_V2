import React from 'react'
import { useTheme } from '@mui/system'
import ReactEcharts from 'echarts-for-react'

const DoughnutChart = ({ height, color = [] }) => {
    const theme = useTheme();

  const option = {
    legend: {
        show: true,
        itemGap: 20,
        icon: 'circle',
        bottom: 0,
        textStyle: {
            color: theme.palette.text.secondary,
            fontSize: 13,
            fontFamily: 'roboto',
        },
    },
    tooltip: { show: true, trigger: 'item', formatter: '{a} <br/>{b}: {c}kg ({d}%)' },
    xAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],
    yAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],

    series: [
      {
        name: 'Department',
        type: 'pie',
        radius: ['45%', '72.55%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        hoverOffset: 5,
        stillShowZeroSum: false,
        label: {
          normal: {
            show: false,
            position: 'center', // shows the description data to center, turn off to show in right side
            textStyle: {
              color: theme.palette.text.secondary,
              fontSize: 13,
              fontFamily: 'roboto',
            },
            formatter: '{a}',
          },
          emphasis: {
            show: true,
            textStyle: { fontSize: '14', fontWeight: 'bold' },
            formatter: '{b}: {c}kg ',
          },
        },
        labelLine: { normal: { show: false } },
        data: [
          { value: 10, name: 'Cardiology' },
          { value: 14, name: 'Critical Care' },
          { value: 10, name: 'Intensive Care Unit' },
          { value: 30, name: 'Nephrology' },
        ],
        itemStyle: {
          emphasis: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' },
        },
      },
    ],
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option, color: [...color] }} />;
}

export default DoughnutChart
