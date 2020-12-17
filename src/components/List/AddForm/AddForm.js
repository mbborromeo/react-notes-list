import React, { useState, useCallback } from 'react';
import NoteTextArea from '../../Shared/NoteTextArea/NoteTextArea';
import PriorityDropDown from '../../Shared/PriorityDropDown/PriorityDropDown';
import '../../Detail/Detail.css';

function AddForm({ addFunction }) {
  const [newItem, setNewItem] = useState('');
  const [itemPriority, setItemPriority] = useState('');
  const [showContentValidationMsg, setShowContentValidationMsg] = useState(false);
  const [showPriorityValidationMsg, setShowPriorityValidationMsg] = useState(false);
  const [showNoteAddedConfirmationMsg, setShowNoteAddedConfirmationMsg] = useState(false);

  // add useCallback or useMemo...
  const resetFields = () => {
    setNewItem('');
    setItemPriority('');
    setShowContentValidationMsg(false);
    setShowPriorityValidationMsg(false);
  }

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setShowNoteAddedConfirmationMsg(false);

      if (!newItem) {        
        setShowContentValidationMsg(true);
      } else {
        setShowContentValidationMsg(false);
      }

      if (!itemPriority) {        
        setShowPriorityValidationMsg(true);
      } else {
        setShowPriorityValidationMsg(false);
      }
      
      if(newItem && itemPriority){
        addFunction(newItem, itemPriority);
        resetFields();
        setShowNoteAddedConfirmationMsg(true);
      }      
    },
    [newItem, itemPriority, addFunction]
  );

  const handleTextAreaOnChange = useCallback(
    (e) => {
      setShowNoteAddedConfirmationMsg(false);
      setNewItem(e.target.value);
    },
    []
  );

  const handleSelectOnChange = useCallback(
    (e) => {
      setShowNoteAddedConfirmationMsg(false);
      setItemPriority(e.target.value);
    },
    []
  );

  return (
    <form onSubmit={handleSubmit}>
      <NoteTextArea value={ newItem } handleOnChange={ handleTextAreaOnChange } />
      <br />
      
      <PriorityDropDown value={ itemPriority } handleOnChange={ handleSelectOnChange } />
      &nbsp;&nbsp;

      <button type="submit">Add</button>
      &nbsp;

      <input
        type="button"
        value="Clear"
        onClick={() => {
          resetFields();
        }}
      />

      <br />
      <div id="feedback">
        { showContentValidationMsg && // !newItem &&
          <span className="error">
            Note must not be empty.&nbsp;
          </span>
        }
        { showPriorityValidationMsg && // !itemPriority &&
          <span className="error">
            Priority must be selected.
          </span>
        }
        { showNoteAddedConfirmationMsg &&
          <span className="confirmation">
            Note added.
          </span>
        }
      </div>
    </form>
  );
}

export default AddForm;
