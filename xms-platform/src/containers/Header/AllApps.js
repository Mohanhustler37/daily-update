import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ArrowTooltip } from "./Header";
import Option1 from "../../assets/images/allapps-options1.png";
import Option2 from "../../assets/images/allapps-options2.png";
import Option3 from "../../assets/images/allapps-options3.png";
import Option4 from "../../assets/images/allapps-options4.png";
import Option5 from "../../assets/images/allapps-options1.png";
import Option6 from "../../assets/images/allapps-options2.png";
import Option7 from "../../assets/images/allapps-options3.png";
import Option8 from "../../assets/images/allapps-options4.png";
import Option9 from "../../assets/images/allapps-options1.png";
const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  }
}));
const allAppsData = [
  {label:'Option ',icon :Option1},
  {label:'Option2 ',icon :Option2},
  {label:'Option3 ',icon :Option3},
  {label:'Option4 ',icon :Option4},
  {label:'Option5 ',icon :Option5},
  {label:'Option6 ',icon :Option6},
  {label:'Option7 ',icon :Option7},
  {label:'Option8 ',icon :Option8},
  {label:'Option9 ',icon :Option9},
]
const Child = forwardRef((props, ref) => {
  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({
    getAlert() {
      alert("getAlert from Child");
    }
  }));
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "all-apps-popover" : undefined;

  return (
    <>
      <ArrowTooltip title={props.icon.tooltip} placement="bottom">
        <img
          className="icon-img"
          src={props.icon.icon}
          alt={props.icon.icon}
          onClick={handleClick}
        />
      </ArrowTooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <div className="all-apps-wrapper">
          <h2>All Applications</h2>
          <div className="options-wrapper">
            {allAppsData.map(item => (
              <div className="option">
                <div>
                  <img src={item.icon} alt="" />
                  <p>{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Popover>
    </>
  );
});
export default Child;
