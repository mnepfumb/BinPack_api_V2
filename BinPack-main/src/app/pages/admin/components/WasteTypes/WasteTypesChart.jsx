import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';

const WasteTypesChart = ({ height, colors = []  }) => {
  const { palette } = useTheme();

  const option = {
    grid: { left: '6%', bottom: '10%', right: '1%',},
    // legend: {
    //   itemGap: 100,
    //   icon: 'circle',
    //   // bottom: 400,
    //   textStyle: { color: palette.text.secondary, fontSize: 10, fontFamily: 'roboto' },
    // },
    color: [
      ...colors
    ],
    barMaxWidth: '10px',
    dataset: {
      source: [
        ['Month', 'Infectious Waste', 'General Landfill', 'Aluminium cans and foil', 'Metal', 'Mixed Cans', 'Steel Cans', 'Board', 'Mixed', 'Paper', 'HDPE', 'LDPE and LLDPE', 'PET', 'PP', 'PVC', 'Domestic Waste', 'Anatomical Waste', 'Cytotoxic Waste', 'Pharmaceutical Waste', 'Sharps', 'Glass'],
        ['Jan', 2200, 1200, 950, 800, 2200, 1200, 950, 800, 2200, 1200, 950, 800, 2200, 1200, 950, 800, 950, 800, 2200, 1200],
        ['Feb', 800, 500, 1500, 600, 2200, 1200, 950, 800, 2200, 1200, 950, 800, 2200, 1200, 950, 800, 2200, 1200, 950, 800],
        ['Mar', 700, 1350, 800, 700, 2200, 1200, 950, 800, 2200, 1200, 950, 800, 2200, 1200, 950, 800, 2200, 1200, 950, 800],
        // ['Apr', 1500, 1250, 950, 900, 2200, 1200, 950, 800, 2200, 1200, 950, 800, 2200, 1200, 950, 800, 2200, 1200, 950, 800],
        // ['May', 2450, 450, 950, 500, 2200, 1200, 950, 800, 2200, 1200, 950, 800, 2200, 1200, 950, 800, 2200, 1200, 950, 800],
        // ['June', 1700, 1250, 1500, 800, 2200, 1200, 950, 800, 2200, 1200, 950, 800, 2200, 1200, 950, 800, 2200, 1200, 950, 800],
      ],
    },
    tooltip: { show: true, trigger: 'item',  },
    xAxis: {
      type: 'category',
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
    },
    yAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: palette.text.secondary, opacity: 0.15 },
      },
      axisLabel: { color: palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
      { type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] } },
    ],
  };

  return <ReactEcharts style={{ height: height }} option={option} />;
};

export default WasteTypesChart;
