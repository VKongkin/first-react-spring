/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create the ToastContext
const ToastContext = createContext();

// Create a custom hook to use the ToastContext
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const showToast = (type, message) => {
        switch (type) {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            case 'warning':
                toast.warning(message);
                break;
            default:
                toast(message);
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
};