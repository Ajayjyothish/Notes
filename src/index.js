import React from "react";
import ReactDOM from "react-dom";
import { FaPencil } from "react-icons/fa";
import FaTrash from "react-icons/fa";

import "./styles.css";

import Board from "./board";

const rootElement = document.getElementById("root");
ReactDOM.render(<Board />, rootElement);
