import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ExpandIcon from "../../assets/icons/SVG/Icon ionic-md-expand.svg";
import ClockIcon from "../../assets/icons/SVG/Group 11626.svg";
import BellIcon from "../../assets/icons/SVG/Group 11625.svg";
import LineChart from "./LineChart";

export default class YourProgress extends Component {
  render() {
    const yourProgressChart = {
      options: {
        chart: {
          id: "basic-bar",
          width: 400,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: true,
            type: "x",
            autoScaleYaxis: false,
            zoomedArea: {
              fill: {
                color: "#ecf1f9"
              },
              stroke: {
                color: "#0D47A1",
                opacity: 1,
                width: 1
              }
            }
          }
        },
        xaxis: {
          categories: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
          labels: {
            style: {
              colors: "#c8c8c8",
              fontFamily: "helveticaNeueCondensedBold"
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: "#c8c8c8",
              fontFamily: "helveticaNeueCondensedBold"
            }
          },
          axisBorder: {
            show: true,
            color: "#c8c8c8",
            offsetX: 0,
            offsetY: 0
          }
        },
        colors: ["#4e58a9"],
        markers: {
          size: 5,
          colors: undefined,
          strokeColors: "#fff",
          strokeWidth: 2,
          strokeOpacity: 0.9,
          fillOpacity: 1,
          discrete: [],
          shape: "circle",
          radius: 2,
          offsetX: 0,
          offsetY: 0,
          onClick: undefined,
          onDblClick: undefined,
          hover: {
            size: undefined,
            sizeOffset: 0
          },
          discrete: [
            {
              seriesIndex: 0,
              dataPointIndex: 7,
              fillColor: "#e3e3e3",
              strokeColor: "#fff",
              size: 5
            },
            {
              seriesIndex: 2,
              dataPointIndex: 11,
              fillColor: "#f7f4f3",
              strokeColor: "#eee",
              size: 4
            }
          ]
        }
      },
      series: [
        {
          data: [31, 40, 18, 51, 42, 109, 100]
        }
      ]
    };
    const lineChart = {
      options: {
        chart: {
          zoom: {
            enabled: false
          },
          toolbar: { show: false },
          sparkline: {
            enabled: true
          }
        },
        yaxis: {
          show: false,
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: { show: false }
        },
        xaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: { show: false }
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          enabled: false
        },
        sparkline: {
          enabled: false
        },
        colors: ["#4e58a9"],
        markers: {
          size: 4
        }
      },
      series: [
        {
          data: [31, 40, 18, 51, 42, 109, 100]
        }
      ]
    };

    return (
      <div className="your-progress-wrapper">
        <div className="left-chart-wrapper">
          <div className="header">
            <h2>YOUR PROGRESS</h2>
            <div className="select-option-wrapper">
              <FormControl
                variant="outlined"
                className={"select-day-for-tickets"}
              >
                <Select value={"today"}>
                  <MenuItem value="tomorrow">Tomorrow</MenuItem>
                  <MenuItem value="today">WEEKLY</MenuItem>
                  <MenuItem value="yesterday">Yesterday</MenuItem>
                </Select>
              </FormControl>
              <img src={ExpandIcon} class="Icon-ionic-md-expand"></img>
            </div>
          </div>
          <ReactApexChart
            options={yourProgressChart.options}
            series={yourProgressChart.series}
            type="area"
            width="100%"
          />
        </div>
        <div className="right-chart-wrapper">
          <div className="chart-box-wrapper">
            <div className="chart-box">
              <div className="header">
                <div>
                  <h2>
                    65%
                    <span>
                      <br />
                      OVERALL- THU
                    </span>
                  </h2>
                </div>

                <img src={ExpandIcon} class="Icon-ionic-md-expand"></img>
              </div>
              <div>
                <LineChart
                  options={lineChart.options}
                  series={lineChart.series}
                />
              </div>
            </div>
          </div>
          <div className="chart-box-wrapper">
            <div className="chart-box">
              <div className="header">
                <div>
                  <h2>
                    65%
                    <span>
                      <br />
                      OVERALL- THU
                    </span>
                  </h2>
                </div>

                <img src={ExpandIcon} class="Icon-ionic-md-expand"></img>
              </div>
              <div>
                <LineChart
                  options={lineChart.options}
                  series={lineChart.series}
                />
              </div>
            </div>
          </div>

          <div className="chart-box-wrapper">
            <div className="chart-box">
              <div className="top">
                <img src={ClockIcon} />
              </div>
              <div className="bottom">
                <p>2 days left to complete OKR Project</p>
              </div>
            </div>
          </div>
          <div className="chart-box-wrapper">
            <div className="chart-box">
              <div className="header">
                <div>
                  <h2>
                    65%
                    <span>
                      <br />
                      OVERALL- THU
                    </span>
                  </h2>
                </div>

                <img src={ExpandIcon} class="Icon-ionic-md-expand"></img>
              </div>
              <div>
                <LineChart
                  options={lineChart.options}
                  series={lineChart.series}
                />
              </div>
            </div>
          </div>

          <div className="chart-box-wrapper">
            <div className="chart-box">
              <div className="header">
                <div>
                  <h2>
                    65%
                    <span>
                      <br />
                      OVERALL- THU
                    </span>
                  </h2>
                </div>

                <img src={ExpandIcon} class="Icon-ionic-md-expand"></img>
              </div>
              <div>
                <LineChart
                  options={lineChart.options}
                  series={lineChart.series}
                />
              </div>
            </div>
          </div>

          <div className="chart-box-wrapper">
            <div className="chart-box">
              <div className="top">
                <img src={BellIcon} />
              </div>
              <div className="bottom">
                <p>2 days left to complete OKR Project</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
