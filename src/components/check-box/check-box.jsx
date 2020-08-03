import React, {PureComponent} from "react";

class CheckBox extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {checkBoxName, checkBoxClass, children} = this.props;

    return (
    <div className={checkBoxClass}>
      <input id={checkBoxName} className="visually-hidden" type="checkbox" name={checkBoxName} required={true}/>
      <label htmlFor={checkBoxName}/>
      {children}
    </div>
    );
  }
}

export {CheckBox}
