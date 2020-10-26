import React, { useState, useCallback } from 'react';

function AddForm({ addFunction }) {
  const [newItem, setNewItem] = useState('');

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!newItem) {
        return; // exit if field empty
      }

      addFunction(newItem);
      setNewItem(''); // reset field to empty
    },
    [newItem, addFunction]
  );

  /*
  const handleBlur = (e) => {
        // click on Submit/Add button
        if( e.target ... ){
            e.preventDefault();
        } else {
            setNewItem('')
        }
  };
  */

  return (
    <form onSubmit={handleSubmit}>
      <textarea 
        id="note" 
        name="note" 
        rows="4" 
        cols="40"
        wrap="hard"
        placeholder="Type note"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <br />
      <button type="submit">Add</button>
      <input
        type="button"
        value="Clear"
        onClick={() => setNewItem('')}
      />
    </form>
  );
}

export default AddForm;
