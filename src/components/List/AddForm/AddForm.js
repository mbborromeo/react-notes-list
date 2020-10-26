import React, { useState, useCallback } from 'react';

function AddForm({ addFunction }) {
  const [newItem, setNewItem] = useState('');
  const [itemPriority, setItemPriority] = useState('');

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!newItem || !itemPriority ) {        
        alert('Note must not be empty and priority must be selected')
        return; // exit if field empty
      }
      
      addFunction(newItem, itemPriority);
      // reset field to empty
      setNewItem('');
      setItemPriority('');
    },
    [newItem, itemPriority, addFunction]
  );

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

      <select 
        name="priority" 
        id="priority" 
        value={ itemPriority }
        onChange={(e) => setItemPriority(e.target.value) }
      >
        <option value="" disabled hidden>Select priority</option>
        <option value="high">High</option>
        <option value="normal">Normal</option>
        <option value="low">Low</option>
      </select>
      &nbsp;&nbsp;

      <button type="submit">Add</button>
      &nbsp;

      <input
        type="button"
        value="Clear"
        onClick={() => {
          setNewItem('');
          setItemPriority('');
        }}
      />
    </form>
  );
}

export default AddForm;
