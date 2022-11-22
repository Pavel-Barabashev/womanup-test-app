import React from "react";
import { updateDoc, doc } from "firebase/firestore";

export const EntryEditForm = ({ editableEntry, setIsEntryEditViewVisible }) => {
  async function updateEntry() {
    console.log(editableEntry);
  }

  return (
    <form>
      <label htmlFor="newTitle">Edit title</label>
      <input type="text" placeholder={editableEntry.title} name="newTitle" />
      <label htmlFor="newText">Edit text</label>
      <textarea placeholder={editableEntry.text} name="newText" />
      <input
        type="button"
        onClick={() => {
          updateEntry();
        }}
        value="save changes"
      />
      <input
        type="button"
        onClick={() => {
          setIsEntryEditViewVisible(false);
        }}
        value="close"
      />
    </form>
  );
};
