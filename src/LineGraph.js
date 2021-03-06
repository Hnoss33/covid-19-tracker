import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2"
import numeral from "numeral";
//para esta grafica debemos instalar el desde npm  {https://github.com/jerairrest/react-chartjs-2}
//con useState hacemos el fetch de Covid-19 API trayendo los historicos que necesitamos, la documentacion la encontramos en la api Json
//https://disease.sh/v3/covid-19/historical/all?lastdays=120
//we have to instal the package numeral to handel the information on the graph : {http://numeraljs.com/}
const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };
  
  
  const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

function LineGraph({ casesType, ...props}) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          console.log(chartData);
          // buildChart(chartData);
        });
    };

    fetchData();
  }, [casesType]);

    //{data?.length > 0 && ( this verify if data exist insted of put data && data we will put data?
    //<div className={props.className}> al pasar esto y crear ...props en la funcion hacemos un atach a la className
    return (
        <div className={props.className}>
            {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(128, 38, 54, 0.2)",
                borderColor: "#802636",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph


//en este componente hacemos el fetch de DATA usuando useState osea que lo hace by himself <h1>☠︎</h1>