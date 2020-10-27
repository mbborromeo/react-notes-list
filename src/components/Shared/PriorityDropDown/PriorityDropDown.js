import React from 'react';

function PriorityDropDown({ view, value, handleOnChange}){

  return (
    <select 
      name="priority" 
      id="priority" 
      value={ value }
      onChange={ handleOnChange }
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
  );
}

export default PriorityDropDown;