import React, { forwardRef } from 'react';

//function PriorityDropDown({ value, handleOnChange, view}){
const PriorityDropDown = forwardRef( ({ label, view }, ref) => (
  <select 
    name={ label } 
    id={ label }
    // value={ value }
    // onChange={ handleOnChange }
    ref={ ref }
  >
    { view==="list" ?
      <option value="all">ALL</option>
      :
      <option value="" disabled hidden selected>Select priority</option>
    }       
    <option value="high">High</option>
    <option value="normal">Normal</option>
    <option value="low">Low</option>
  </select>
));

export default PriorityDropDown;