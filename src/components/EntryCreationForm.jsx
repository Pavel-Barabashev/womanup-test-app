import React, { useState } from "react";
import { addDoc, doc } from "firebase/firestore";
import dayjs from "dayjs";

export const EntryCreationForm = ({ entriesCollectionRef }) => {
  let [title, setTitle] = useState("");
  let [text, setText] = useState("");
  async function createEntry() {
    let entry = {
      title,
      text,
      createdAt: dayjs().toDate(),
    };
    try {
      addDoc(entriesCollectionRef, entry);
      console.log("created successfully!");
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <form>
      <label htmlFor="title">Title:</label>
      <input
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        type="text"
        name="title"
      />

      <label htmlFor="text">Text of entry:</label>
      <textarea
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
        name="text"
      />
      <button
        onClick={(event) => {
          createEntry();
          event.preventDefault();
        }}
      >
        create entry
      </button>
      <button>close</button>
    </form>
  );
};
