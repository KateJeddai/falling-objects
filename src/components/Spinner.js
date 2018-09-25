import React from 'react';
import spinner from './img/spinner.gif';

export const Spinner = () => {
    return(
        <div>
            <img src={spinner} alt="Loading..." style={{ width: '200px', margin: ' 40px auto', display: 'block' }} />
        </div>
    )
};

export const SpinnerInd = () => {
    return(
        <div>
            <img src='../img/spinner.gif' alt="Loading..." style={{ width: '200px', margin: ' 40px auto', display: 'block' }} />
        </div>
    )
};