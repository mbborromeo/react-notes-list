import React from 'react';

//function NoteTextArea({value, handleOnChange, view}){
function NoteTextArea( {label, register, required, view} ){
  return (
    <textarea 
      id={ label } 
      name={ label } 
      ref={ register({ required }) }      
      // value={ value }
      // onChange={ handleOnChange }
      rows={ view==="detail" ? 16 : 4 }
      cols="35"
      wrap="hard"
      placeholder="Type note"
    />
  );
}

export default NoteTextArea;