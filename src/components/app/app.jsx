import React, {PureComponent} from "react";
import {SineUpScreen} from "../sine-up-screen/sine-up-screen.jsx";
import {SineInScreen} from "../sine-in-screen/sine-in-screen.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {isShowSineUpScreen: props.isShowSineUpScreen};
    this.toggleSineUpScreen = this.toggleSineUpScreen.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isShowSineUpScreen && <SineUpScreen toggleSineUpScreen={this.toggleSineUpScreen}/>}
        {!this.state.isShowSineUpScreen && <SineInScreen toggleSineUpScreen={this.toggleSineUpScreen}/>}
      </React.Fragment>
    );
  }

  toggleSineUpScreen() {
    this.setState((prevState) => {
      return {isShowSineUpScreen: !prevState.isShowSineUpScreen}
    });
  }
}

export {App};
