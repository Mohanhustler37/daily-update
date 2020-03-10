import React, { Component } from "react";

import Header from "../../containers/Header/Header";
import SubHeader from "../../containers/SubHeaderNew/SubHeaderNew";
import UserInfo from "../OkrListing/UserInfo";

export default class Objectives extends Component {
  render() {
    return (
      <div>
        <Header />
        <SubHeader />
        {/* USER INFO */}
        <UserInfo />
      </div>
    );
  }
}
