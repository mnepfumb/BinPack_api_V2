import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';

const WasteTypesDoughnut = ({ height, color = [] }) => {
  const theme = useTheme();

  const option = {
    // legend: {
    //   show: true,
    //   itemGap: 50,
    //   icon: 'circle',
    //   bottom: 0,
    //   textStyle: {  fontSize: 9, fontFamily: 'roboto', fontWeight: 'bold' },
    // },
    tooltip: { show: true, trigger: 'item', formatter: '{a} <br/>{b}: {c}kg ({d}%)' },
    xAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],
    yAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],

    series: [
      {
        name: 'Waste Type',
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
          { value: 10, name: 'Infectious Waste' },
          { value: 14, name: 'General Landfill' },
          { value: 10, name: 'Aluminium cans and foil' },
          { value: 30, name: 'Metal' },
          { value: 5, name: 'Mixed Cans' },
          { value: 90, name: 'Steel Cans' },
          { value: 8, name: 'Board' },
          { value: 20, name: 'Mixed' },
          { value: 21, name: 'Paper' },
          { value: 10, name: 'HDPE' },
          { value: 14, name: 'LDPE and LLDPE' },
          { value: 10, name: 'PET' },
          { value: 30, name: 'PP' },
          { value: 5, name: 'PVC' },
          { value: 90, name: 'Domestic Waste' },
          { value: 8, name: 'Anatomical Waste' },
          { value: 20, name: 'Cytotoxic Waste' },
          { value: 21, name: 'Pharmaceutical Waste' },
          { value: 20, name: 'Sharps' },
          { value: 21, name: 'Glass' },
        ],
        itemStyle: {
          emphasis: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' },
        },
      },
    ],
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option, color: [...color] }} />;
};

export default WasteTypesDoughnut;
