import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';

const CategoryDoughnut = ({ height, color = [], pieDataset, tooltip, formatter}) => {
  const theme = useTheme();

  const option = {
    // legend: {
    //   show: true,
    //   itemGap: 50,
    //   icon: 'circle',
    //   bottom: 0,
    //   textStyle: {  fontSize: 9, fontFamily: 'roboto', fontWeight: 'bold' },
    // },
    tooltip: { show: true, trigger: 'item', formatter: tooltip },
    xAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],
    yAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],

    series: [
      {
        name: 'Waste Category',
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
            formatter: formatter,
          },
        },
        labelLine: { normal: { show: false } },
        data: pieDataset,
        itemStyle: {
          emphasis: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' },
        },
      },
    ],
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option, color: [...color] }} />;
};

export default CategoryDoughnut;
