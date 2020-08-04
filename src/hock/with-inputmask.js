import React, {PureComponent} from "react";
import Inputmask from "inputmask";

const withInputmask = (ReactElement) => {
  class WithInputmask extends PureComponent {
    constructor(props) {
      super(props);
      this.phoneRef = React.createRef();
    }

    render() {
      return (<ReactElement
        {...this.props}
        phoneRef={this.phoneRef}
      />);
    }

    componentDidMount() {
      Inputmask({mask: "+7 999 999 99 99", showMaskOnHover: false}).mask(this.phoneRef.current);
    }
  }

  return WithInputmask;
};

export default withInputmask;
