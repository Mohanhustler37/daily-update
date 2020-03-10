import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

export default class LineChart extends Component {
  render() {
      const {options,series} = this.props;
    return (
      <div>
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          width="100%"
        />
      </div>
    );
  }
}
