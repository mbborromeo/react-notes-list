import React from 'react';

function NoteTextArea({value, handleOnChange}){

  return (
    <textarea 
      id="note" 
      name="note" 
      rows="4" 
      cols="35"
      wrap="hard"
      placeholder="Type note"
      value={ value }
      onChange={ handleOnChange }
    />
  );
}

export default NoteTextArea;