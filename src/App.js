import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakTime: 5,
      sessionTime: 25,
      mins: 25,
      secs: 0,
      intervalId: 0,
      label: '',
      timerRunning: false,
    };
  }

  breakDecrementFunc = () => {
    let min_break_time = this.state.breakTime - 1;
    if (min_break_time > 0) {
      this.setState({
        breakTime: min_break_time,
      });
    }
  };

  breakIncrementFun = () => {
    let max_break_time = this.state.breakTime + 1;
    if (max_break_time <= 60) {
      this.setState({
        breakTime: max_break_time,
      });
    }
  };

  sessionDecrementFunc = () => {
    this.setState(prevState => {
      if (prevState.sessionTime - 1 > 0) {
        return {
          sessionTime: prevState.sessionTime - 1,
          mins: prevState.sessionTime - 1,
        };
      }
    });
  };

  sessionIncrementFunc = () => {
    this.setState(prevState => {
      if (prevState.sessionTime + 1 <= 60) {
        return {
          sessionTime: prevState.sessionTime + 1,
          mins: prevState.sessionTime + 1,
        };
      }
    });
  };

  startTimer = () => {
    if (this.state.timerRunning) {
      clearInterval(this.state.intervalId);
      this.setState({
        timerRunning: false,
      });
    } else {
      let intervalId = setInterval(() => {
        this.countDown();
      }, 1000);
      this.setState({
        intervalId: intervalId,
        timerRunning: true,
      });
      if (this.state.label === '') {
        this.setState({ label: 'session' });
      }
    }
  };

  switchTimer(mins, label) {
    this.setState({
      mins,
      label,
    });
  }

  countDown = () => {
    switch (this.state.secs) {
      case 0:
        if (this.state.mins === 0 && this.state.secs === 0) {
          if (this.state.label === 'session') {
            this.switchTimer(this.state.breakTime, 'break');
            this.audioBeep.play();
          } else if (this.state.label === 'break') {
            this.switchTimer(this.state.sessionTime, 'session');
          }
        } else {
          this.updateTimerMinute();
          this.setState({
            secs: 59,
          });
        }
        break;
      default:
        this.setState(prevState => {
          return {
            secs: prevState.secs - 1,
          };
        });
        break;
    }
  };

  updateTimerMinute = () => {
    this.setState(prevState => {
      return {
        mins: prevState.mins - 1,
      };
    });
  };

  restFunc = () => {
    if (this.state.timerRunning) {
      clearInterval(this.state.intervalId);
    }
    this.setState({
      breakTime: 5,
      sessionTime: 25,
      mins: 25,
      secs: 0,
      intervalId: 0,
      label: '',
      timerRunning: false,
    });
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  };

  render() {
    return (
      <div>
        <h1>Hi my last pro</h1>

        <h3 id="break-label">Break Length:</h3>
        <button id="break-decrement" onClick={this.breakDecrementFunc}>
          ↓
        </button>
        <div id="break-length">{this.state.breakTime}</div>
        <button id="break-increment" onClick={this.breakIncrementFun}>
          ↑
        </button>

        <br />
        <br />
        <br />

        <h3 id="session-label">Session Length:</h3>
        <button id="session-decrement" onClick={this.sessionDecrementFunc}>
          ↓
        </button>
        <div id="session-length">{this.state.sessionTime}</div>
        <button id="session-increment" onClick={this.sessionIncrementFunc}>
          ↑
        </button>

        <br />
        <br />
        <br />
        <div className="timer-wrapper">
          <div id="timer-label">
            {this.state.label === ''
              ? 'Session'
              : this.state.label.charAt(0).toUpperCase() +
                this.state.label.slice(1)}
            :
          </div>
          <div id="time-left">
            {this.state.mins.toLocaleString(undefined, {
              minimumIntegerDigits: 2,
            })}
            :
            {this.state.secs.toLocaleString(undefined, {
              minimumIntegerDigits: 2,
            })}
          </div>
        </div>

        <br />
        <br />

        <button id="start_stop" onClick={this.startTimer}>
          <audio
            id="beep"
            preload="auto"
            src="https://goo.gl/65cBl1"
            ref={audio => {
              this.audioBeep = audio;
            }}
          />
          start/stop
        </button>

        <button id="reset" onClick={this.restFunc}>
          ↻
        </button>
      </div>
    );
  }
}
