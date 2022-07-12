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
    className="!top-14 xl:!top-[1em]"
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    pauseOnHover
  />
);
