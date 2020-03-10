import React, { Component } from "react";
import EditImage from "../../assets/icons/SVG/feather-edit.svg";
import PinLight from "../../assets/icons/SVG/metro-pin-light.svg";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles, lighten } from "@material-ui/core/styles";


const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten("#ff6c5c", 0.5),
    borderRadius: 20
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#ff6c5c"
  }
})(LinearProgress);
export default class UserInfo extends Component {
  render() {
    return (
      <div className="task-details-container row">
        <div className="user-info">
          <div className="user-title">
            <span>Hi John,</span>
            <span>The week ends in 4 days & quater in 2 weeks</span>
          </div>
          <div className="user-data">
            <div className="icon-wrapper">
              <Avatar className="active">37</Avatar>
              <p>TASKS</p>
            </div>
            <div className="icon-wrapper">
              <Avatar>7</Avatar>
              <p>OBJECTIVES</p>
            </div>
            <div className="icon-wrapper">
              <Avatar>14</Avatar>
              <p>KEY&nbsp;RESULTS</p>
            </div>
            <div className="icon-wrapper">
              <Avatar>67%</Avatar>
              <p>WORKLOAD</p>
            </div>
            <div className="icon-wrapper">
              <Avatar>77%</Avatar>
              <p>PERFOMANCE</p>
            </div>
          </div>
          <div className="user-score">
            <div className="score">
              <p>
                <span>9.8</span> <span>1.6</span>
              </p>
              <p>Performance Score</p>
              <BorderLinearProgress
                variant="determinate"
                color="secondary"
                value={50}
              />
            </div>
            <div className="options">
              <div className="icon">
                <img src={EditImage} />
              </div>
              <div className="icon">
                <img src={PinLight} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
