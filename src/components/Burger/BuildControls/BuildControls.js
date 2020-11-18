import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import './BuildControls.css';

const controls = [
    { label: 'Meat', type: 'meat'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Salad', type: 'salad'},
    { label: 'Cheese', type: 'cheese'}
]

const BuildControls = (props) => {
    return (
        <div className='BuildControls'>
            {controls.map(item => {
               return <BuildControl key={item.label} type={item.type} label={item.label}/>
            })}
        </div>
    );
}

export default BuildControls;