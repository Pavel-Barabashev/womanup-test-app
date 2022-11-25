import React from "react";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

export const EntryEditForm = ({ editableEntry, setIsEntryEditViewVisible }) => {
  let [newTitle, setNewTitle] = useState("");
  let [newText, setNewText] = useState("");

  async function updateEntry() {
    let entryDoc = doc(db, "entries", editableEntry.id);
    let newFields = { text: newText, title: newTitle };
    await updateDoc(entryDoc, newFields);
  }

  async function deleteEntry() {
    let entryDoc = doc(db, "entries", editableEntry.id);
    await deleteDoc(entryDoc);
  }

  return (
    <div className="entry-edit-create-container">
      <form className="entry-edit-form">
        <label htmlFor="newTitle">Edit title</label>
        <input
          type="text"
          value={newTitle}
          onChange={(event) => {
            setNewTitle(event.target.value);
          }}
          placeholder={editableEntry.title}
          name="newTitle"
        />
        <label htmlFor="newText">Edit text</label>
        <textarea
          value={newText}
          onChange={(event) => {
            setNewText(event.target.value);
          }}
          placeholder={editableEntry.text}
          name="newText"
        />
        <button
          disabled={editableEntry.completed ? true : false}
          onClick={(event) => {
            updateEntry();
            event.preventDefault();
          }}
        >
          Save changes
        </button>
        <button
          onClick={() => {
            setIsEntryEditViewVisible(false);
          }}
        >
          close
        </button>
        <button
          onClick={(event) => {
            deleteEntry();
            event.preventDefault();
          }}
        >
          delete
        </button>
      </form>
    </div>
  );
};
