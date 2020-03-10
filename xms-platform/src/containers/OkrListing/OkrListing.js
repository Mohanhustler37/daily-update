import React, { Component } from "react";
// import "../../../containers/TicketTable/TicketTable.scss";
import "./OkrListing.scss";
import "../../components/TicketingSystem/ChartBar/ChartBar.scss";
import Checkbox from "@material-ui/core/Checkbox";
import MainLayout from "../../containers/MainLayout/MainLayout";
import OkrCollapsible from "../../containers/TaskTable/OkrCollapsible/OkrCollapsible";
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

import EditImage from "../../assets/icons/SVG/feather-edit.svg";
import PinLight from "../../assets/icons/SVG/metro-pin-light.svg";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link,
  Redirect
} from "react-router-dom";
import {
  PolarShadow,
  LineShadow,
  SmallLineChart
} from "../../components/Chart/chartnew";
import {
  visitChartConfig,
  conversionChartConfig,
  lineChartConfig,
  polarChartConfig,
  smallChartData1,
  smallChartData2,
  smallChartData3,
  smallChartData4
} from "../../components/Chart/chartConfig";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TaskProgress from "./TaskProgress";
import YourProgress from "./YourProgress";
import Status from "./Status";
import UserInfo from "./UserInfo";
const imgscr =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC";
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);
const assignToData = [
  { id: 0, name: "John Dan", profile: "" },
  { id: 1, name: "John Doe", profile: "" },
  { id: 2, name: "John pazos", profile: "" },
  { id: 3, name: "Mark John", profile: "" },
  { id: 4, name: "John Dan", profile: "" },
  { id: 5, name: "John Doe", profile: "" },
  { id: 6, name: "John pazos", profile: "" }
];

const tagsData = [
  { id: 0, title: "Risk" },
  { id: 1, title: "Critical Customer" },
  { id: 2, title: "Phase1" },
  { id: 3, title: "Technical" }
];

const taskListData = [
  { id: 0, title: "Daily Stand-up meeting " },
  { id: 1, title: "Matrix1 onboarding process" },
  { id: 2, title: "Create a API for registration" },
  { id: 3, title: "UI for Dashboard" },
  { id: 4, title: "Meeting at 4:30PM with John " },
  { id: 5, title: "Matrix1 onboarding process" },
  { id: 6, title: "Create a API for registration" }
];

const StyledMenuItem = withStyles(theme => ({
  root: {
    // '&:focus': {
    //   backgroundColor: theme.palette.primary.main,
    //   '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
    //     color: theme.palette.common.white,
    //   },
    // },
  }
}))(MenuItem);
const color = [
  "#feb1b2",
  "#7ac9ff",
  "#ffc089",
  "#41e590",
  "#ea5455",
  "#c8c8c8",
  "#656565",
  "#ecf1f9",
  "#7AC9FF"
];
const colors = [
  "#1abc9c",
  "#17a085",
  "#2ecc71",
  "#27ae60",
  "#3498db",
  "#2980b9",
  "#9b59b6",
  "#8e44ad",
  "#34495e",
  "#2c3e50",
  "#f1c40e",
  "#f39c12",
  "#d35400",
  "#e74c3c",
  "#c0392b",
  "#9b0000",
  "#f28a8a",
  "#00edff",
  "#1aa0bc",
  "#1cd8ff",
  "#ff92f4",
  "#d500a3",
  "#ffb300",
  "#d0cfec",
  "#ecf1f9",
  "#c8c8c8",
  "#656565",
  "#464646"
];

let wrapperRef;
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

class TaskListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          },
          series: [43, 54, 41]
        }
      }
    };
  }

  handleChange = name => event => {
    // setState({ ...state, [name]: event.target.checked });
  };

  bodySection = () => {
    const chartOptions = {
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: "rounded",
          // columnWidth: '52%',
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
      colors: ["#ecf1f9"]
    };
    const chartSeries = [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 11]
      }
    ];
    return (
      <div className="ag-theme-balham">
        <Header />
        <SubHeader />
        {/* USER INFO */}
        <UserInfo />

        {/* TASK PROGRESS */}
        <TaskProgress
          options={chartOptions}
          series={chartSeries}
          taskList={taskListData}
        />
        {/* YOUR PROGRESS */}

        <YourProgress />

        {/* STATUS */}

        <Status taskList={taskListData} />
      </div>
    );
  };

  render() {
    return (
      <MainLayout
        secondSidebar={<OkrCollapsible thisObj={this} />}
        bodySection={this.bodySection()}
      />
    );
  }
}

export default TaskListing;
