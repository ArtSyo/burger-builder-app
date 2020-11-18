import React from 'react';

import './BuildControl.css';

const BuildControl = (props) => {
 return (
     <div className='BuildControl'>
         <div className='Label'>{props.label}</div>
         <button className='Less'>Remove</button>
         <button className='More' onClick={props.added}>Add</button>
     </div>
 )
}

export default BuildControl;