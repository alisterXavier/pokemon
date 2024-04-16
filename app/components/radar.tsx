import ReactApexChart from 'react-apexcharts';

interface Stat {
  stat: {
    name: string;
  };
  base_stat: number;
}

export const RadarChart: React.FC<{ data: Stat[] }> = ({ data }) => {
  const dataStat = data.map(
    (i: { stat: { name: string }; base_stat: number }) => {
      return { name: i.stat.name, stat: i.base_stat };
    }
  );

  var series = [
    {
      name: 'Stats',
      data: dataStat.map((i: { stat: number }) => i.stat),
    },
  ];

  var options = {
    dataLabels: {
      enabled: true,
      background: {
        enabled: true,
        borderRadius: 2,
      },
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: dataStat.map((i: { name: string }) => i.name.toUpperCase()),
    },
    tooltip: {
      theme: 'dark',
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radar"
      height={350}
      width={450}
    />
  );
};
