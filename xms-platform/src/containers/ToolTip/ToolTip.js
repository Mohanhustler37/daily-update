import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
function arrowGenerator(color) {
    return {
      '&[x-placement*="bottom"] $arrow': {
        top: 0,
        left: 0,
        marginTop: '-0.95em',
        width: '2em',
        height: '1em',
        '&::before': {
          borderWidth: '0 1em 1em 1em',
          borderColor: `transparent transparent #ffffff transparent`,
        },
      },
      '&[x-placement*="top"] $arrow': {
        bottom: 0,
        left: 0,
        marginBottom: '-0.95em',
        width: '2em',
        height: '1em',
        '&::before': {
          borderWidth: '1em 1em 0 1em',
          borderColor: `#ffffff transparent transparent transparent`,
        },
      },
      '&[x-placement*="right"] $arrow': {
        left: -2,
        marginLeft: '-0.95em',
        height: '2em',
        width: '2em',
        '&::before': {
          borderWidth: '1em 1em 1em 0',
          borderColor: `transparent #ffffff transparent transparent`,
        },
      },
      '&[x-placement*="left"] $arrow': {
        right: 0,
        marginRight: '-0.95em',
        height: '2em',
        width: '1em',
        '&::before': {
          borderWidth: '1em 0 1em 1em',
          borderColor: `transparent transparent transparent ${color}`,
        },
      },
    };
  }
  
  
  const useStylesArrow = makeStyles(theme => ({
    tooltip: {
      position: 'relative',
      fontSize: 10, 
      borderRadius: 100,
      backgroundColor: "#ffffff",
      color: "#656565",
      boxShadow: "0 3px 12px 0 #d2d2d2",
      marginLeft: '0.1em',
      padding: "3px 10px 3px 10px",
      textAlign: 'center',
      top: 8
    },
    arrow: {
      position: 'absolute',
      fontSize: 4,
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: 0,
        height: 0,
        borderStyle: 'solid',
      },
    },
    popper: arrowGenerator(theme.palette.grey[700]),
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
                element: arrowRef,
              },
            },
          },
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
  export default ArrowTooltip;