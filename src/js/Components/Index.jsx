import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";

import Home from "./Home/Home";
import Routes from "./Routes/Routes";
import DatePickerPreview from "./DatePickerPreview/DatePickerPreview";

import Nav from "./_shared/Nav/Nav";

export default class Index extends Component {
  render() {
    return (
      <article>
        <Nav />
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/routes" component={Routes} />
            <Route
              path="/react-jalaali-datepicker"
              component={DatePickerPreview}
            />
          </Switch>
        </main>
      </article>
    );
  }
}
