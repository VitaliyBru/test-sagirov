import React, {PureComponent} from "react";
import {Input} from "../input/input.jsx";
import {CheckBox} from "../check-box/check-box.jsx";
import {Success} from "../success/success.jsx";
import BdApi from "../../bdApi/bdApi";

class SineInScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {success: ``};
    this._handlerSubmit = this._handlerSubmit.bind(this);
    this._preventInvalid = this._preventInvalid.bind(this);
  }

  render() {
    const {toggleSineUpScreen} = this.props;

    return(
      <section className={`sine-up`}>
        <div className="wrapper  sine-up__wrapper">
          <div className="sine-up__content ${this.state.success}">
            <h2 className="sine-up__heading">Вход</h2>
            <p className="sine-up__text">Введите свои данные</p>
            <form name="sine-in" action={`#`} onSubmit={this._handlerSubmit} onInvalid={this._preventInvalid}>
              <Input inputName={`nameOrPhone`} inputType={`text`} inputLabel={`Email или номер телефона`}
                     invalidClass={`sine-up__invalid`}/>
              <Input inputName={`password`} inputType={`password`} inputLabel={`Пароль`}
                     invalidClass={`sine-up__invalid`}/>
              <CheckBox checkBoxName={`permission`} checkBoxClass={`sine-up__check-box`}>
                Я даю свое согласие на обработку персональных данных
              </CheckBox>
              <button className="sine-up__submit" type="submit">войти</button>
            </form>
            <p className="sine-up__text-2">
              Нет аккаунта? <a className="sine-up__link" onClick={toggleSineUpScreen}>Зарегистрироваться</a>
            </p>
          </div>
        </div>
        {!!this.state.success && <Success toggleSineUpScreen={toggleSineUpScreen}>Вы авторизованы</Success>}
      </section>
    );
  }

  _handlerSubmit(evt) {
    evt.preventDefault();
    if (BdApi.getUser(document.forms[`sine-in`][`nameOrPhone`].value, document.forms[`sine-in`][`password`].value).name) {
      this.setState({success: `sine-up--success`});
    }
  }

  _preventInvalid(evt) {
    if (evt.target.tagName.toLowerCase() === `input`) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  }
}

export {SineInScreen};
