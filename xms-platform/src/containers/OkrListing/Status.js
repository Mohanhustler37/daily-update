import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ExpandIcon from "../../assets/icons/SVG/Icon ionic-md-expand.svg";
import RadialChart from "./RadialChart";
import readMore from "../../assets/icons/SVG/Iconawesome-ellipsis-v.svg";
import completed from "../../assets/icons/task/completed.svg";
import pending from "../../assets/icons/task/group-11441.svg";
import TaskListStarIcon from "../../assets/icons/01-10-2019/Icon ionic-md-star-outline.svg";
import { withStyles, lighten } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

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
const objArr = [
  "Successfully launch version 3 of ...",
  "Research, analyze and understand...",
  "Activate user-testing of our product",
  "Implement new 360-degree produ...",
  "Successfully launch version 3 of ...",
  "Research, analyze and understand...",
  "Activate user-testing of our product",
  "Activate user-testing of our product"
];
export default class Status extends Component {
  render() {
    return (
      <div className="status-wrapper">
        <div className="task-status-wrapper">
          <div className="task-status">
            <div className="header">
              <h2>TASK LIST</h2>
              <div className="select-option-wrapper">
                <FormControl
                  variant="outlined"
                  className={"select-day-for-tickets"}
                >
                  <Select value={"today"}>
                    <MenuItem value="tomorrow">Tomorrow</MenuItem>
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="yesterday">Yesterday</MenuItem>
                  </Select>
                </FormControl>
                <img src={ExpandIcon} class="Icon-ionic-md-expand"></img>
              </div>
            </div>
            <RadialChart />
          </div>
        </div>
        <div className="task-list-wrapper">
          <div className="task-list">
            <div className="header">
              <h2>TASK LIST</h2>
              <div className="select-option-wrapper">
                <FormControl
                  variant="outlined"
                  className={"select-day-for-tickets"}
                >
                  <Select value={"today"}>
                    <MenuItem value="tomorrow">Tomorrow</MenuItem>
                    <MenuItem value="today">TODAY</MenuItem>
                    <MenuItem value="yesterday">Yesterday</MenuItem>
                  </Select>
                </FormControl>
                <img src={ExpandIcon} class="Icon-ionic-md-expand"></img>
              </div>
            </div>
            <div className="task-list-list">
              {objArr.map((name, i) => (
                <div className="list-item-wrapper">
                  <div className="left">
                    <span>{`0${i + 1}`}</span>
                    <p>{name.substring(0,25)}</p>
                  </div>
                  <div className="right">
                    <BorderLinearProgress
                      variant="determinate"
                      color="secondary"
                      value={50}
                      width={30}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="task-list-wrapper">
          <div className="task-list">
            <div className="header">
              <h2>TASK LIST</h2>
              <div className="select-option-wrapper">
                <FormControl
                  variant="outlined"
                  className={"select-day-for-tickets"}
                >
                  <Select value={"today"}>
                    <MenuItem value="tomorrow">Tomorrow</MenuItem>
                    <MenuItem value="today">TODAY</MenuItem>
                    <MenuItem value="yesterday">Yesterday</MenuItem>
                  </Select>
                </FormControl>
                <img src={ExpandIcon} class="Icon-ionic-md-expand"></img>
              </div>
            </div>
            <div className="task-list-list">
              <div className="list-item-wrapper">
                <div className="left">
                  <img className="tasks-listing-checked-icon" src={completed} />
                  <p>Daily Stand-up meeting</p>
                </div>
                <div className="right tsk-lstng-mr-str">
                  <img src={TaskListStarIcon}></img>
                  <img src={readMore} style={{ height: 15 }} />
                </div>
              </div>
              {this.props.taskList.map(task => (
                <div className="list-item-wrapper">
                  <div className="left">
                    <img className="tasks-listing-checked-icon" src={pending} />
                    <p>{task.title}</p>
                  </div>
                  <div className="right tsk-lstng-mr-str">
                    <img src={TaskListStarIcon}></img>
                    <img src={readMore} style={{ height: 15 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
