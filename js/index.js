const decimalPointRegExp = new RegExp(/\.(\d+)(?!.*\d)/);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calculatorValue: 0,
      calculatorExpression: "--"
    };

    // set this constructor scope
    this.calNumClick = this.calNumClick.bind(this);
    this.calDecimalPointClick = this.calDecimalPointClick.bind(this);
    this.calOperatorClick = this.calOperatorClick.bind(this);
    this.calResetClick = this.calResetClick.bind(this);
    this.calculateClick = this.calculateClick.bind(this);
  }

  calNumClick(event) {
    this.setState({
      calculatorValue:
        this.state.calculatorValue == 0
          ? event.target.innerText
          : this.state.calculatorValue + event.target.innerText
    });
  }

  calDecimalPointClick(event) {
    let len = this.state.calculatorValue.length;
    // make sure its a number and there is not already a decimal point in it
    if (
      !isNaN(
        parseInt(this.state.calculatorValue.toString().slice(len - 1, len), 10)
      ) &&
      !decimalPointRegExp.test(this.state.calculatorValue)
    ) {
      this.setState({
        calculatorValue: this.state.calculatorValue + event.target.innerText
      });
    }
  }

  calOperatorClick(event) {
    let len = this.state.calculatorValue.length;
    let slicedVal = this.state.calculatorValue.toString().slice(len - 1, len);
    if (this.state.calculatorValue != 0 && !isNaN(parseInt(slicedVal, 10))) {
      this.setState({
        calculatorValue: this.state.calculatorValue + event.target.innerText
      });
    } else if (["+", "-", "/", "*"].some(val => slicedVal == val)) {
      this.setState({
        calculatorValue:
          this.state.calculatorValue.toString().substring(0, len - 1) +
          event.target.innerText
      });
    }
  }

  calResetClick(event) {
    this.setState({
      calculatorValue: 0,
      calculatorExpression: "--"
    });
  }

  calculateClick(event) {
    let len = this.state.calculatorValue.length;
    if (
      this.state.calculatorValue !== 0 &&
      !isNaN(parseInt(this.state.calculatorValue.slice(len - 1, len), 10))
    ) {
      this.setState({
        calculatorValue: eval(this.state.calculatorValue),
        calculatorExpression: this.state.calculatorValue + " = "
      });
    }
  }

  render() {
    return (
      <div className="cal-container">
        <div className="expression">{this.state.calculatorExpression}</div>
        <div id="display" className="value">
          {this.state.calculatorValue}
        </div>
        <div>
          <div className="cal-buttons">
            <div className="cal-button" />
            <div className="cal-button" />
            <div className="cal-button" />
            <div id="clear" className="cal-button" onClick={this.calResetClick}>
              AC
            </div>
            <div id="seven" className="cal-button" onClick={this.calNumClick}>
              7
            </div>
            <div id="eight" className="cal-button" onClick={this.calNumClick}>
              8
            </div>
            <div id="nine" className="cal-button" onClick={this.calNumClick}>
              9
            </div>
            <div
              id="divide"
              className="cal-button"
              onClick={this.calOperatorClick}
            >
              /
            </div>
            <div id="four" className="cal-button" onClick={this.calNumClick}>
              4
            </div>
            <div id="five" className="cal-button" onClick={this.calNumClick}>
              5
            </div>
            <div id="six" className="cal-button" onClick={this.calNumClick}>
              6
            </div>
            <div
              id="multiply"
              className="cal-button"
              onClick={this.calOperatorClick}
            >
              *
            </div>
            <div id="one" className="cal-button" onClick={this.calNumClick}>
              1
            </div>
            <div id="two" className="cal-button" onClick={this.calNumClick}>
              2
            </div>
            <div id="three" className="cal-button" onClick={this.calNumClick}>
              3
            </div>
            <div
              id="subtract"
              className="cal-button"
              onClick={this.calOperatorClick}
            >
              -
            </div>
            <div id="zero" className="cal-button" onClick={this.calNumClick}>
              0
            </div>
            <div
              id="decimal"
              className="cal-button"
              onClick={this.calDecimalPointClick}
            >
              .
            </div>
            <div
              id="equals"
              className="cal-button"
              onClick={this.calculateClick}
            >
              =
            </div>
            <div
              id="add"
              className="cal-button"
              onClick={this.calOperatorClick}
            >
              +
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
