import React from "react";
import { render } from "react-dom";
import Map from "./Map";
import "./styles.css";

class App extends React.Component {
  render() {
    return <Map />;
  }
}

render(<App />, document.getElementById("root"));
