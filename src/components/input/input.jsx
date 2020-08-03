import React, {PureComponent} from "react";

class Input extends PureComponent {
  constructor(props) {
    super(props);

    this._handlerBlur = this._handlerBlur.bind(this);
    this._handlerFocus =this._handlerFocus.bind(this);
    this.phoneRef = props.inputName === `phone` ? props.phoneRef : null;
    this.state = props.inputName === `password`
      ? ({inputType: `password`, isNeedValidity: !!props.invalidClass})
      : {isNeedValidity: !!props.invalidClass};
  }

  static _handlerButtonClick(objThis) {
    return (evt) => {
      evt.stopPropagation();
      objThis.setState((prevState) => {
        return prevState.inputType === `password` ? {inputType: `text`} : {inputType: `password`}
      });
    }
  }

  render() {
    const {inputName, inputType, inputLabel, invalidClass, pattern} = this.props;

    return (
      <label className="input">
        <input
          name={inputName}
          type={this.state && this.state.inputType ? this.state.inputType : inputType}
          className={this.state.isNeedValidity ? `` : invalidClass}
          onFocus={this.state.isNeedValidity ? this._handlerFocus : null}
          onBlur={this._handlerBlur}
          ref={this.phoneRef}
          pattern={pattern}
          required={true}
        />
        <span className="input__label">{inputLabel}</span>
        {inputName === `password`
          ? <button type="button" onClick={Input._handlerButtonClick(this)}>
              <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.1134 6.99999C12.1134 7.68197 11.8425 8.33603 11.3603 8.81826C10.878 9.3005 10.224 9.57142 9.54201 9.57142C8.86002 9.57142 8.20597 9.3005 7.72373 8.81826C7.2415 8.33603 6.97058 7.68197 6.97058 6.99999C6.97058 6.318 7.2415 5.66395 7.72373 5.18171C8.20597 4.69948 8.86002 4.42856 9.54201 4.42856C10.224 4.42856 10.878 4.69948 11.3603 5.18171C11.8425 5.66395 12.1134 6.318 12.1134 6.99999V6.99999Z" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1.36316 7C2.45516 3.52257 5.70459 1 9.54202 1C13.3803 1 16.6289 3.52257 17.7209 7C16.6289 10.4774 13.3803 13 9.54202 13C5.70459 13 2.45516 10.4774 1.36316 7V7Z" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          : ``}
      </label>
    );
  }

  _handlerBlur(evt) {
    if (evt.target.value && !evt.target.nextElementSibling.classList.contains(`input__label--small`)) {
      evt.target.nextElementSibling.classList.add(`input__label--small`);
    }
    if (!evt.target.value && evt.target.nextElementSibling.classList.contains(`input__label--small`)) {
      evt.target.nextElementSibling.classList.remove(`input__label--small`);
    }
  }

  _handlerFocus() {
    this.setState({isNeedValidity: false});
  }
}


export {Input}
