import React, { forwardRef } from 'react';

//function PriorityDropDown({ value, handleOnChange, view}){
const PriorityDropDown = forwardRef( ({ label, view, handleOnChange }, ref) => (
  <select 
    name={ label } 
    id={ label }
    onChange={ handleOnChange } // still need onChange for List.js as there is no parent form
    ref={ ref }
  >
    { view==="list" ?
      <option value="all">ALL</option>
      :
      <option value="" disabled hidden>Select priority</option>
    }       
    <option value="high">High</option>
    <option value="normal">Normal</option>
    <option value="low">Low</option>
  </select>
));

export default PriorityDropDown;