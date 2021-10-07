import React from "react";
import ReactDom from "react-dom";
import App from "./App";

const ROOT_ID = "cat_root";

document.addEventListener("DOMContentLoaded", async () => {
  let newContent = document.createTextNode("");
  let newElement = document.createElement("div");
  newElement.appendChild(newContent);
  newElement.setAttribute("id", ROOT_ID);
  document.body.insertBefore(newElement, document.body.lastChild);
  ReactDom.render(<App />, document.getElementById(ROOT_ID));
});
