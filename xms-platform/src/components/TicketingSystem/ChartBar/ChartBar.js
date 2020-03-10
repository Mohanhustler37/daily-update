import React, { Component } from "react";
import "./ChartBar.scss";
import gql from "graphql-tag";
import PieChart from "../../../assets/icons/SVG/Icon-awesome-chart-pie.svg";
import GreenLineChart from "../../../assets/icons/SVG/Icon-material-show-chart.svg";
import RedLineChart from "../../../assets/icons/SVG/Iconmaterial-timeline.svg";
import BarChart from "../../../assets/icons/SVG/Icon-feather-bar-chart-2.svg";
import DropDown from "../../../assets/icons/SVG/Icon ionic-ios-arrow-down.svg";
import DropUp from "../../../assets/icons/SVG/ionic-ios-arrow-up.svg";
import EditImage from "../../../assets/icons/SVG/feather-edit.svg";
import PinLight from "../../../assets/icons/SVG/metro-pin-light.svg";
import FeatherArrowUpRight from "../../../assets/icons/SVG/feather-arrow-up-right.svg";
import FeatherArrowDownRight from "../../../assets/icons/SVG/feather-arrow-down-right.svg";
import ReactApexChart from "react-apexcharts";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import history from "../../../Routes/history";
import {
  GetoverviewchartTicket,
  Gettheallticketsdata
} from "./ChartBarQueries";

function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.95em",
      width: "2em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${color} transparent`
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.95em",
      width: "2em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${color} transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: -2,
      marginLeft: "-0.95em",
      height: "2em",
      width: "2em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent #ffffff transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.95em",
      height: "2em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${color}`
      }
    }
  };
}

const useStylesArrow = makeStyles(theme => ({
  tooltip: {
    position: "relative",
    fontSize: 10,
    borderRadius: 100,
    backgroundColor: "#ffffff",
    color: "#656565",
    boxShadow: "0 3px 12px 0 #d2d2d2",
    marginLeft: "0.1em",
    padding: "4px 12px 4px 12px",
    textAlign: "center"
  },
  arrow: {
    position: "absolute",
    fontSize: 4,
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid"
    }
  },
  popper: arrowGenerator(theme.palette.grey[700])
}));

function ArrowTooltip(props) {
  const { arrow, ...classes } = useStylesArrow();
  const [arrowRef, setArrowRef] = React.useState(null);

  return (
    <Tooltip
      classes={classes}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef
            }
          }
        }
      }}
      {...props}
      title={
        <React.Fragment>
          {props.title}
          <span className={arrow} ref={setArrowRef} />
        </React.Fragment>
      }
    />
  );
}

class ChartBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTicketsRadialValues : [],
      isChartSectionExpand: true,
      chartOpenedClass: "chartOpened",
      chartClosedClass: "",
      allTicketsRadial: {
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
                  total : 0,
                  formatter: function (w) {
                    return this.total;
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
                colors: ["#249efa", "#fdba3a", "#fd5f76"],
                counts: [3,4,5]
              }
            }
          }
        },
        series: []
      },
      ticketsGrowthArea: {
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
          title: {
            text: "300",
            offsetX: 5,
            offsetY: 40,
            style: {
              fontSize: "27px",
              cssClass: "apexcharts-title-text"
            }
          },
          subtitle: {
            text: "All Tickets",
            offsetX: 5,
            offsetY: 70,
            style: {
              fontSize: "13px"
            }
          },
          colors: ["#7e72f2"]
        },
        series: [
          {
            name: "TicketGrowth",
            data: [31, 40, 18, 51, 42, 109, 100]
          }
        ]
      },
      autoAssignedGrpah: {
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
          title: {
            text: "15",
            offsetX: 5,
            offsetY: 20,
            style: {
              fontSize: "27px",
              cssClass: "apexcharts-title-text"
            }
          },
          subtitle: {
            text: "Auto Assigned",
            offsetX: 5,
            offsetY: 50,
            style: {
              fontSize: "13px"
            }
          }
        },
        series: [
          {
            name: "TicketGrowth",
            data: [31, 40, 18, 51, 42, 109, 100]
          }
        ]
      },
      manualAssignedGrpah: {
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
          title: {
            text: "05",
            offsetX: 5,
            offsetY: 20,
            style: {
              fontSize: "27px",
              cssClass: "apexcharts-title-text"
            }
          },
          subtitle: {
            text: "Manual Assigned",
            offsetX: 5,
            offsetY: 50,
            style: {
              fontSize: "13px"
            }
          },
          colors: ["#ff9f43"]
        },
        series: [
          {
            name: "TicketGrowth",
            data: [31, 40, 18, 51, 42, 109, 100]
          }
        ]
      },
      allOriginBarChart: {
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
              endingShape: "rounded",
              columnWidth: "52%",
              barHeight: "100%",
              distributed: false,
              colors: {
                ranges: [
                  {
                    from: 0,
                    to: 0,
                    color: undefined
                  }
                ],
                backgroundBarColors: [],
                backgroundBarOpacity: 1
              }
            }
          },
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
          tooltip: {
            enabled: false
          },
          sparkline: {
            enabled: false
          },
          colors: ["#7467f0"]
        },
        series: [
          {
            data: [31, 40, 18, 100, 42, 49, 80]
          }
        ]
      }
    };

    this.showCharts = () => {
      this.setState({
        chartOpenedClass: "chartOpened",
        chartClosedClass: "",
        isChartSectionExpand: true
      });
      this.props.chartSectionToggler();
    };

    this.hideCharts = () => {
      this.setState({
        chartOpenedClass: "",
        chartClosedClass: "chartClosed",
        isChartSectionExpand: false
      });
      this.props.chartSectionToggler();
    };
  }

  componentDidMount = async() => {
    
    let client = this.props.client;
    let loginUserDetails = JSON.parse(new Object(localStorage.getItem("loginUserDetails")))
    if (loginUserDetails) {
      await this.setState({
        loginUserId: loginUserDetails.userId,
        companyId: loginUserDetails.companyId,
        loginUserFName: loginUserDetails.firstName,
        loginUserLName: loginUserDetails.lastName,
      });
    } else {
      history.push('/');
    }
    this.fetchChartsData(this.props.client, this.state.companyId);
  }

  executeQuery = (client, pageNo, q, params, callback) => {
    client
      .query({
        query: q,
        variables: params
      })
      .then(
        response => {
          callback(response);
        },
        error => {
          callback(error);
        }
      );
  };

  fetchChartsData = (client, companyId) => {
    this.executeQuery(client,companyId,GetoverviewchartTicket,{
      companyId : companyId
    },(response)=>{

      this.state.allTicketsRadialValues = response.data.getoverviewchartTicket.values;
      this.state.allTicketsRadial.series = [];
      this.state.allTicketsRadial.options.labels = [];

      let total = 0;
      this.state.allTicketsRadialValues.map((status)=>{
        this.state.allTicketsRadial.series.push(status.angle);
        this.state.allTicketsRadial.options.labels.push(status.status);
        total = total + parseInt(status.count);
      });

      let allTicketsRadial = {...this.state.allTicketsRadial};
      allTicketsRadial.options.plotOptions.radialBar.dataLabels.total.total = total;
      this.setState({
        allTicketsRadial : allTicketsRadial
      })

    });
  };

  render() {
    return (
      <div
        className={`ticket-table-chart-container  ${
          this.state.isChartSectionExpand
            ? "expanded-chart-section"
            : "collapsed-chart-section"
        }`}
      >
        <div id="chart-bar" className={this.state.chartClosedClass}>
          <div className="charts-text">
            <p>CHARTS</p>
          </div>
          <div className="charts-icon1-text">
            <img src={PieChart} alt=""></img>
            <p>300</p>
            <span>All Tickets</span>
          </div>
          <div className="charts-icon2-text">
            <img src={GreenLineChart} alt=""></img>
            <p>15</p>
            <span>All Tickets</span>
          </div>
          <div className="charts-icon3-text">
            <img src={RedLineChart} alt=""></img>
            <p>05</p>
            <span>Manual Assigned</span>
          </div>
          <div className="charts-icon4-text">
            <img src={BarChart} alt=""></img>
            <p>1.9k</p>
            <span>All origin points</span>
          </div>
          <div className="charts-drop-down-icon">
            <img src={DropDown} alt="" onClick={this.showCharts}></img>
          </div>
        </div>

        <div id="chartOpened" className={this.state.chartOpenedClass}>
          <div className="d-flex align-items-center justify-space-between chart-bar-opened">
            <div class="label">CHARTS</div>
            <div class="icons d-flex align-items-center justify-content-around">
              <div class="icon_edit">
                <ArrowTooltip title="Edit chart layout" placement="bottom">
                  <img src={EditImage} alt=""></img>
                </ArrowTooltip>
              </div>
              <div class="icon_pin">
                <ArrowTooltip title="Pin / unpin the view" placement="bottom">
                  <img src={PinLight} alt=""></img>
                </ArrowTooltip>
              </div>
              <div class="icon_expand">
                <ArrowTooltip title="Expand / Collapse" placement="bottom">
                  <img src={DropUp} alt="" onClick={this.hideCharts}></img>
                </ArrowTooltip>
              </div>
            </div>
          </div>
          <div className="d-flex  align-items-center justify-space-around chartopensection">
            <div id="allTicketsRadialChartContainer" class="chart4sec">
              <div className="d-flex align-items-center justify-space-between">
                <label className="p-0 m-0" id="allTicketsHdr">
                  All Tickets
                </label>
              </div>
              <div id="allTicketsRadialChart">
                {
                  (this.state.allTicketsRadialValues.length) ? <ReactApexChart
                    options={this.state.allTicketsRadial.options}
                    series={this.state.allTicketsRadial.series}
                    type="radialBar"
                    width="200"
                    height="200"
                  /> : null
                }
              </div>

              {
                (!!this.state.allTicketsRadialValues) ? this.state.allTicketsRadialValues.map((status)=>(
                  <div className="chartLabels">
                    <div className="d-flex align-items-center justify-space-between resolved due inProcess">
                      <label className="p-0 m-0" style={{fontSize: 9, lineHeight: 2}}>
                        <span style={{width: 5, height: 5}}></span>&nbsp;{status.status}
                      </label>
                      <label className="p-0 m-0">{status.count}</label>
                    </div>
                  </div>
                )) : null
              }

            </div>
            <div id="ticketsGrowthAreaChartContainer" class="chart4sec">
              <div>
                <label className="areaChartLabel up">
                  <img alt="growthuparrow" src={FeatherArrowUpRight} />
                  22.5% <label>Ticket growth</label>
                </label>
              </div>
              <ReactApexChart
                options={this.state.ticketsGrowthArea.options}
                series={this.state.ticketsGrowthArea.series}
                type="area"
                height="200"
                width="200"
              />
            </div>
            <div id="assignedGraphsContainer" class="chart4sec">
              <div>
                <div>
                  <label className="areaChartLabel up">
                    <img alt="growthuparrow" src={FeatherArrowUpRight} />
                    32% <label>growth</label>
                  </label>
                </div>
                <ReactApexChart
                  options={this.state.autoAssignedGrpah.options}
                  series={this.state.autoAssignedGrpah.series}
                  type="area"
                  height="110"
                  width="200"
                />
              </div>

              <div>
                <div>
                  <label className="areaChartLabel down">
                    <img alt="growthdownarrow" src={FeatherArrowDownRight} />
                    12% <label>Decrease</label>
                  </label>
                </div>
                <ReactApexChart
                  options={this.state.manualAssignedGrpah.options}
                  series={this.state.manualAssignedGrpah.series}
                  type="area"
                  height="110"
                  width="200"
                />
              </div>
            </div>
            <div id="fromOriginPointGraphContainer" class="chart4sec">
              <div>
                <div class="top" style={{justifyContent: 'space-between'}}>
                  <div style={{ paddingLeft: 10 }}>
                    <label className="m-0">1.8K</label>
                    <label className="m-0">From all origin point</label>
                    <label className="areaChartLabel up p-0">
                      <img alt="growthuparrow" src={FeatherArrowUpRight} />
                      22.5% <label>vs last 7 days</label>
                    </label>
                    <label style={{left: 10}}>View Details ></label>
                  </div>
                  <ReactApexChart
                    options={this.state.allOriginBarChart.options}
                    series={this.state.allOriginBarChart.series}
                    type="bar"
                    height="180"
                    width="200"
                  />
                </div>
                <div class="down" style={{paddingLeft: 10}}>
                  <div>
                    <span>In App: 780</span>
                    <label></label>
                    <label className="purple" style={{ width: "67%" }}></label>
                  </div>
                  <div>
                    <span>Chat: 250</span>
                    <label></label>
                    <label className="orange" style={{ width: "47%" }}></label>
                  </div>
                  <div>
                    <span>Phone: 500</span>
                    <label></label>
                    <label className="pink" style={{ width: "57%" }}></label>
                  </div>
                  <div>
                    <span>Email: 780</span>
                    <label></label>
                    <label className="green" style={{ width: "87%" }}></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChartBar;
