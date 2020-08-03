import scss from "./scss/style.scss";
import React from "react";
import ReactDOM from "react-dom";
import mockDataUrl from "./data/mock.json"
import BdApi from "./bdApi/bdApi";
const mockJson = {
  name: "Остап Бендер",
  nickname: "Bender",
  email: "roga@copyta.su",
  phone: "+7 095 144 39 17",
  password: "R0s@lioa"
};

import {App} from "./components/app/app.jsx";

const isShowSineUpScreen = true;

const init = () => {
  BdApi.init(`https://vitaliybru.github.io/${mockDataUrl}`, mockJson);
  ReactDOM.render(
    <App isShowSineUpScreen={isShowSineUpScreen}/>,
    document.getElementById(`root`));
};

init();
