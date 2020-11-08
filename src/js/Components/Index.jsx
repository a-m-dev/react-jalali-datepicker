import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home/Home";
import Routes from "./Routes/Routes";
import DatePickersPreview from "./DatePickersPreview/DatePickersPreview";

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
              component={DatePickersPreview}
            />
          </Switch>
        </main>
      </article>
    );
  }
}
