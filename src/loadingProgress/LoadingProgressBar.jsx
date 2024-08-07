/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./LoadingProgressBar.css";

const LoadingProgressBar = ({ progress }) => {
    return (
        <div className="progress-bar">
            <div 
                className={`progress-bar-inner ${progress === 100 ? 'hide' : ''}`} 
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};
export default LoadingProgressBar;