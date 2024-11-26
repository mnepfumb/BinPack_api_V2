import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';
import { useEffect, useState } from 'react';

const CategoryDoughnut = ({ height, color = [] }) => {
  const theme = useTheme();
  const [open_tasks, setOpen_tasks] = useState(0);
  const [closed_tasks, setClosed_tasks] = useState(0);
  // const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    var total_tasks = 100;
    var closed_tasks = 50;
    setOpen_tasks(closed_tasks);
    setClosed_tasks(total_tasks - open_tasks);
  }, [open_tasks]);

  const option = {
    legend: {
      show: true,
      itemGap: 80,
      icon: 'circle',
      bottom: 0,
      textStyle: { color: theme.palette.text.secondary, fontSize: 14, fontFamily: 'roboto', fontWeight: 'bold' },
    },
    tooltip: { show: false, trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
    xAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],
    yAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],

    series: [
      {
        name: 'Task Rate',
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
            formatter: '{b}: {c}% ',
          },
        },
        labelLine: { normal: { show: false } },
        data: [
          { value: open_tasks, name: 'Open' },
          { value: closed_tasks, name: 'Completed' },
        ],
        itemStyle: {
          emphasis: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' },
        },
      },
    ],
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option, color: [...color] }} />;
};

export default CategoryDoughnut;
