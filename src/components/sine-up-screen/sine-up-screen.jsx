import React, {PureComponent} from "react";
import {Input} from "../input/input.jsx";
import {CheckBox} from "../check-box/check-box.jsx";
import {Success} from "../success/success.jsx";
import BdApi from "../../bdApi/bdApi";
import withInputmask from "../../hock/with-inputmask";

const InputWrapped = withInputmask(Input);

class SineUpScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {success: ``};
    this._handlerSubmit = this._handlerSubmit.bind(this);
    this._preventInvalid = this._preventInvalid.bind(this);
  }

  render() {
    const {toggleSineUpScreen} = this.props;

    return (
      <section className={`sine-up`}>
        <div className="wrapper  sine-up__wrapper">
          <div className="sine-up__content ${this.state.success}">
            <h2 className="sine-up__heading">Регистрация</h2>
            <p className="sine-up__text">Введите свои данные</p>
            <form name="sine-up" action={`#`} onSubmit={this._handlerSubmit} onInvalid={this._preventInvalid}>
              <Input inputName={`name`} inputType={`text`} inputLabel={`Имя`} invalidClass={`sine-up__invalid`}
                     pattern={`^.{3,}`}/>
              <Input inputName={`nickname`} inputType={`text`} inputLabel={`Никнайм`} invalidClass={`sine-up__invalid`}
                     pattern={`^.{3,}`}/>
              <Input inputName={`email`} inputType={`email`} inputLabel={`Email`} invalidClass={`sine-up__invalid`}/>
              <InputWrapped inputName={`phone`} inputType={`text`} inputLabel={`Телефон`}
                            invalidClass={`sine-up__invalid`} pattern={`^\\+7(\\s\\d{3}){2}(\\s\\d{2}){2}$`}/>
              <Input inputName={`password`} inputType={`password`} inputLabel={`Пароль`} invalidClass={`sine-up__invalid`}
                     pattern={`^(?:(?:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]))|(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\]))|(?:(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\]))|(?:(?=.*[0-9])(?=.*[a-z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\]))).{8,32}$`}/>
              <CheckBox checkBoxName={`permission`} checkBoxClass={`sine-up__check-box`}>
                Я даю свое согласие на обработку персональных данных
              </CheckBox>
              <button className="sine-up__submit" type="submit">Зарегистрироваться</button>
            </form>
            <p className="sine-up__text-2">
              Есть аккаунт? <a className="sine-up__link" onClick={toggleSineUpScreen}>Войти</a>
            </p>
          </div>
        </div>
        {!!this.state.success && <Success toggleSineUpScreen={toggleSineUpScreen}>Вы зарегистрированы</Success>}
      </section>
    );
  }

  _handlerSubmit(evt) {
    evt.preventDefault();
    BdApi.addUser({
      "name": document.forms[`sine-up`][`name`].value,
      "nickname": document.forms[`sine-up`][`nickname`].value,
      "email": document.forms[`sine-up`][`email`].value,
      "phone": document.forms[`sine-up`][`phone`].value,
      "password": document.forms[`sine-up`][`password`].value
    });
    this.setState({success: `sine-up--success`})
  }

  _preventInvalid(evt) {
    if (evt.target.tagName.toLowerCase() === `input`) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  }
}

export {SineUpScreen};
