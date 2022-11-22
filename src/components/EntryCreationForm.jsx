import React from "react";
import { addDoc, doc } from "firebase/firestore";

export const EntryCreationForm = () => {
  let [title, setTitle] = useState("");
  let [text, setText] = useState("");
  async function createEntry(event) {
    event.preventDefault();
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
    <form
      onSubmit={(event) => {
        createEntry(event);
      }}
    >
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
      <input type="submit" value="create entry!" />
    </form>
  );
};
