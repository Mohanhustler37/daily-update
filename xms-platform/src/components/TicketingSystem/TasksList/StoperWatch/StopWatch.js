import React from "react";
import StopwatchDisplay from "./StopWatchDisplay";
import Play from "./Play";
import Pause from "./Pause";
import "./StopWatch.scss"
import { baseUrl } from "../../../../constants";
import { UpdateTask } from "./StopWatchQueries"

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      running: false,
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0
    };
  }

componentDidMount(){
 if( this.props.data!=null || this.props.data!= undefined ){
   let time = this.props.data
   let array = time.split(':')
  this.setState({currentTimeMin:parseInt(array[0]),currentTimeSec:parseInt(array[1])})
 }
}

  formatTime = (val, ...rest) => {
    let value = val.toString();
    if (value.length < 2) {
      value = "0" + value;
    }
    if (rest[0] === "ms" && value.length < 3) {
      value = "0" + value;
    }
    return value;
  };

  start = () => {
    if (!this.state.running) {
      this.setState({ running: true });
      this.watch = setInterval(() => this.pace(), 10);
    }
  };

  stop = () => {

    this.setState({ running: false });
    clearInterval(this.watch);
    let variables = {
      id:this.props.taskId,
      taskHours: `${this.state.currentTimeMin}:${this.state.currentTimeSec}`
    }
    UpdateTask(variables,res => {
      return res;
    })
 };

  pace = () => {
    this.setState({ currentTimeMs: this.state.currentTimeMs + 10 });
    if (this.state.currentTimeMs >= 1000) {
      this.setState({ currentTimeSec: this.state.currentTimeSec + 1 });
      this.setState({ currentTimeMs: 0 });
    }
    if (this.state.currentTimeSec >= 60) {
      this.setState({ currentTimeMin: this.state.currentTimeMin + 1 });
      this.setState({ currentTimeSec: 0 });
    }
  };


  render() {
    return (
      <div className="stop-watch-section">
          <button className="stopwatch">
          {this.state.running === false && (
          <button className="button-one" onClick={this.start}><Play/></button>
        )}
        {this.state.running === true && (
          <button className="button-one" onClick={this.stop}><Pause/></button>
        )}
        <StopwatchDisplay
          ref="display"
          {...this.state}
          formatTime={this.formatTime}
        />
          </button>
    
        
      </div>
    );
  }
}

export default Stopwatch;
