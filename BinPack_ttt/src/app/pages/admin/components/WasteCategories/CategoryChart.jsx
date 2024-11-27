import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';

const CategoryChart = ({ height, colors = [], Series, dateBarDataset }) => {
  const { palette } = useTheme();

  const option = {
    grid: { left: '6%', bottom: '10%', right: '1%' },
    color: [
      ...colors
    ],
    barMaxWidth: '10px',
    tooltip: { show: true, trigger: 'item',  },
    xAxis: {
      type: 'category',
      data: dateBarDataset,
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
      { name: 'Covid',type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] }, data: Series[0].covid_waste },
      { name: 'General',type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] }, data: Series[0].general_waste },
      { name: 'Hazardous',type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] }, data: Series[0].hazardous_waste },
      { name: 'Metal',type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] }, data: Series[0].metal_waste },
      { name: 'Paper',type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] }, data: Series[0].paper_waste },
      { name: 'Plastic',type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] }, data: Series[0].plastic_waste },
      { name: 'Refuse',type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] }, data: Series[0].refuse_waste },
      { name: 'Healthcare',type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] }, data: Series[0].healthcare_waste },
      { name: 'Other',type: 'bar', itemStyle: { borderRadius: [10, 10, 0, 0] }, data: Series[0].other },
    ],
  };

  return <ReactEcharts style={{ height: height }} option={option} />;
};

export default CategoryChart;
