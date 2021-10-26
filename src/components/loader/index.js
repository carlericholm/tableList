import React from 'react';
import { CircularProgress } from '@material-ui/core';
import './index.css';

const Loading = (props) => (
  <div className='loading-shading-mui'>
    <CircularProgress className={`loading-icon-mui ${props.classStyle}`} />
  </div>
);

export default Loading;
