"use client";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer as ReactToastifyToastContainer } from "react-toastify";
const ToastContainer = () => {
  return <ReactToastifyToastContainer autoClose={2000} hideProgressBar />;
};

export default ToastContainer;
