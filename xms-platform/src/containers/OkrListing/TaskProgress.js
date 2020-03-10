import React, { Component } from "react";
import axios from "axios";
import { CirclePicker, TwitterPicker } from "react-color";
import { withStyles, lighten } from "@material-ui/core/styles";
import { Scrollbars } from "react-custom-scrollbars";
import dropdownIcon from "../../assets/icons/01-10-2019/Icon ionic-md-arrow-dropdown.svg";
import colorPallet from "../../assets/create-habit/Icon material-color-lens.svg";
import Header from "../../containers/Header/Header";
import SubHeader from "../../containers/SubHeaderNew/SubHeaderNew";
import CreateTaskDrawer from "../../containers/CreateTaskDrawer/CreateTaskDrawer";
import CreateTicketDrawer from "../../components/TicketingSystem/TicketTable/SideDrawers/CreateTicketUpdated/CreateTicketDrawer";
import Fab from "@material-ui/core/Fab";
import readMore from "../../assets/icons/SVG/Iconawesome-ellipsis-v.svg";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import ClrPckrTray from "../../assets/icons/create-ticket/Icon ionic-ios-color-palette.svg";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import profileIcon from "../../assets/profile.png";
import decrementIcon from "../../assets/icons/SVG/Group 11399.svg";
import estimatedTimeIcon from "../../assets/icons/SVG/Icon material-access-time.svg";
import tagsIcon from "../../assets/icons/SVG/Icon awesome-tags.svg";
import addNewIcon from "../../assets/icons/SVG/Group 11382.svg";
import ExpandIcon from "../../assets/icons/SVG/Icon ionic-md-expand.svg";
import InputBase from "@material-ui/core/InputBase";
import SearchTagAdd from "../../assets/icons/create-ticket/Group 11349.svg";
import AttachmentAddIcon from "../../assets/icons/01-10-2019/Icon feather-plus-circle.svg";
import TasksListAddIcon from "../../assets/icons/01-10-2019/Group 10948.svg";
import TasksListUpArrow from "../../assets/icons/01-10-2019/Group 10952.svg";
import TasksListEditIcon from "../../assets/icons/01-10-2019/Icon feather-edit-3.svg";
import TaskListRectangleGray from "../../assets/icons/01-10-2019/Rectangle 526.svg";
import TaskListRectangleBlue from "../../assets/icons/01-10-2019/Rectangle 530.svg";
import TaskListAccessTime from "../../assets/icons/01-10-2019/Icon material-access-time.svg";
import TaskListTag from "../../assets/icons/01-10-2019/Icon awesome-tags1.svg";
import TaskListExclamation from "../../assets/icons/01-10-2019/Icon awesome-exclamation-circle1.svg";
import TaskListGroupMessage from "../../assets/icons/01-10-2019/Group 10951.svg";
import TaskListSubdirectory from "../../assets/icons/01-10-2019/Icon material-subdirectory-arrow-right.svg";
import TaskListLink from "../../assets/icons/01-10-2019/Icon feather-link.svg";
import TaskListNotification from "../../assets/icons/01-10-2019/Icon ionic-ios-notifications-outline.svg";
import TaskListRepeat from "../../assets/icons/01-10-2019/Icon feather-repeat.svg";
import TaskListAttachment from "../../assets/icons/01-10-2019/Icon metro-attachment.svg";
import TaskListProfile from "../../assets/images/profile.png";
import TaskListStarIcon from "../../assets/icons/01-10-2019/Icon ionic-md-star-outline.svg";
import TaskListRedExclamation from "../../assets/icons/01-10-2019/Icon awesome-exclamation-circle.svg";
import TasksListPopupEdit from "../../assets/icons/01-10-2019/Icon feather-edit.svg";
import TasksListPopupAssign from "../../assets/icons/01-10-2019/Icon material-description.svg";
import TasksListPopupBulk from "../../assets/icons/01-10-2019/Icon feather-mail.svg";
import TasksListPopupMerge from "../../assets/icons/01-10-2019/Icon material-call-merge.svg";
import TasksListPopupConvert from "../../assets/icons/01-10-2019/Icon ionic-ios-options.svg";
import TasksListPopupLink from "../../assets/icons/01-10-2019/Icon feather-link.svg";
import TasksListPopupDuplicate from "../../assets/icons/15-10-2019/Icon material-control-point-duplicate.svg";
import TasksListPopupDelete from "../../assets/icons/01-10-2019/Icon material-delete-sweep.svg";
import CompanyLogo from "../../assets/icons/01-10-2019/company-logo.svg";
import CompanyEditIcon from "../../assets/icons/SVG/Iconfeather-edit-3.svg";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItemImage from "../../assets/images/profile.png";
import gql from "graphql-tag";
import AttachmentIcon from "../../assets/icons/task/Icon metro-attachment.svg";
import PieChart from "../../assets/icons/SVG/Icon-awesome-chart-pie.svg";
import SubtaskIcon from "../../assets/icons/task/Icon open-task.svg";
import CommentMoreIcon from "../../assets/icons/task/CommentMoreIcon.svg";
import ReportAChallenge from "../../assets/icons/task/Icon material-report-problem.svg";
import startIcon from "../../assets/icons/task/Icon ionic-md-star-outline.svg";
import subdirectoryarrow from "../../assets/icons/task/Icon material-subdirectory-arrow-right.svg";
import notifications from "../../assets/icons/task/Icon ionic-ios-notifications-outline.svg";
import backTotasklist from "../../assets/icons/task/Icon ionic-ios-arrow-back.svg";
import LinkWith from "../../assets/icons/task/link-with.svg";
import Radio from "@material-ui/core/Radio";
import { baseUrl } from "../../constants";
import { green } from "@material-ui/core/colors";
import ReactApexChart from "react-apexcharts";
import GreenLineChart from "../../assets/icons/SVG/Icon-material-show-chart.svg";
import RedLineChart from "../../assets/icons/SVG/Iconmaterial-timeline.svg";
import BarChart from "../../assets/icons/SVG/Icon-feather-bar-chart-2.svg";
import DropDown from "../../assets/icons/SVG/Icon ionic-ios-arrow-down.svg";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";
import EditIcon from "@material-ui/icons/Edit";
import FormGroup from "@material-ui/core/FormGroup";
import completed from "../../assets/icons/task/completed.svg";
import pending from "../../assets/icons/task/group-11441.svg";

export default class TaskProgress extends Component {
  render() {
    const { series, options, taskList } = this.props;
    console.log("props =>>>>>", series, options, taskList);
    if (!series || !options || !taskList) {
      return <div />;
    }
    return (
      <div className="task-progress-wrapper">
        <div className="task-progress">
          <div className="chart-wrapper">
            <div className="header">
              <h2>TASK PROGRESS</h2>
            </div>
            <div id="chart">
              <ReactApexChart
                options={options}
                series={series}
                type="bar"
                width="100%"
              />
            </div>
          </div>
          <div className="task-list-wrapper">
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
            <div className="task-list">
              <div className="task-list-list">
                <div className="list-item-wrapper">
                  <div className="left">
                    <img
                      className="tasks-listing-checked-icon"
                      src={completed}
                    />
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
                      <img
                        className="tasks-listing-checked-icon"
                        src={pending}
                      />
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
      </div>
    );
  }
}
