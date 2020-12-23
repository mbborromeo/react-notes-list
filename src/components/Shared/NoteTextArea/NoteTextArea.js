import React, { forwardRef } from 'react';

//function NoteTextArea({value, handleOnChange, view}){
//function NoteTextArea( {label, register, required, view} ){ return ( ); }
const NoteTextArea = forwardRef( ({ label, view }, ref) => (  
  <textarea 
    name={ label } 
    id={ label }       
    ref={ ref }
    rows={ view==="detail" ? 16 : 4 }
    cols="35"
    wrap="hard"
    placeholder="Type note"
  />
));

export default NoteTextArea;