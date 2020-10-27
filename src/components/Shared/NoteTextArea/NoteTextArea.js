import React from 'react';

function NoteTextArea({newItem, handleOnChange}){

  return (
    <textarea 
      id="note" 
      name="note" 
      rows="4" 
      cols="35"
      wrap="hard"
      placeholder="Type note"
      value={ newItem }
      onChange={ handleOnChange }
    />
  );
}

export default NoteTextArea;