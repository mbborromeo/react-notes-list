import React from 'react';

function PriorityDropDown({ value, handleOnChange}){

  return (
    <select 
      name="priority" 
      id="priority" 
      value={ value }
      onChange={ handleOnChange }
    >
      <option value="" disabled hidden>Select priority</option>
      <option value="high">High</option>
      <option value="normal">Normal</option>
      <option value="low">Low</option>
    </select>
  );
}

export default PriorityDropDown;