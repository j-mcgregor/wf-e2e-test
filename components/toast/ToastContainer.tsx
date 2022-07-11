import React from 'react';
import {
  ToastContainer as ToastifyContainer,
  ToastContainerProps
} from 'react-toastify';

export const ToastContainer = (props: ToastContainerProps) => (
  <ToastifyContainer
    {...props}
    containerId="toast-container"
    draggable={false}
    position="top-right"
    autoClose={8000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    pauseOnHover
  />
);
