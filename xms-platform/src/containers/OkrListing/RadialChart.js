import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

export default class RadialChart extends Component {
  render() {
    const radialChart = {
      options: {
        labels: ["Resolved", "In-Process", "Due"],
        fill: {
          type: "solid",
          colors: ["#249efa", "#fdba3a", "#fd5f76"]
        },
        plotOptions: {
          radialBar: {
            offsetX: 0,
            hollow: {
              size: "40%"
            },
            track: {
              strokeWidth: "100%"
            },
            dataLabels: {
              total: {
                show: true,
                label: "TOTAL",
                color: "#111",
                formatter: function() {
                  return 45678;
                }
              },
              name: {
                fontSize: "12px",
                offsetY: 0
              },
              value: {
                fontSize: "12px",
                offsetY: 0
              },
              colors: ["#249efa", "#fdba3a", "#fd5f76"]
            }
          }
        }
      },
      series: [43, 54, 41]
    };
    return (
      <div className="raidal-chart-wrapper">
        <ReactApexChart
          options={radialChart.options}
          series={radialChart.series}
          type="radialBar"
          // width="250"
          // height="250"
        />
        <div className="chart-labels-wrapper">
          <div className="chartLabels">
            <div className="d-flex align-items-center justify-content-between resolved">
              <label className="p-0 m-0">
                <span></span> Completed
              </label>
              <label className="p-0 m-0">23450</label>
            </div>
          </div>
          <div className=" chartLabels">
            <div className="d-flex align-items-center justify-content-between inProcess">
              <label className="p-0 m-0">
                <span></span> In Process
              </label>
              <label className="p-0 m-0">14567</label>
            </div>
          </div>
          <div className="chartLabels">
            <div className="d-flex align-items-center justify-content-between due">
              <label className="p-0 m-0">
                <span></span> Backlog
              </label>
              <label className="p-0 m-0">4567</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
