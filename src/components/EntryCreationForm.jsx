import React, { useState } from "react";
import { addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import dayjs from "dayjs";
import { storage } from "../firebase";

export const EntryCreationForm = ({
  entriesCollectionRef,
  setIsEntryCreationFormVisible,
}) => {
  let [title, setTitle] = useState("");
  let [text, setText] = useState("");
  let [file, setFile] = useState(null);
  let [dueDate, setDueDate] = useState(null);

  async function createEntry() {
    try {
      if (file) {
        let storageRef = ref(storage, file.name);
        let uploadFile = await uploadBytesResumable(storageRef, file);
        getDownloadURL(uploadFile.ref)
          .then((url) => {
            let entry = {
              title,
              text,
              dueDate,
              createdAt: dayjs().toDate(),
              fileUrl: url,
            };
            addDoc(entriesCollectionRef, entry);
            alert("created successfully!");
          })
          .catch((error) => {
            throw error;
          });
      } else {
        let entry = {
          title,
          text,
          dueDate,
          createdAt: dayjs().toDate(),
        };
        addDoc(entriesCollectionRef, entry)
          .then(() => {
            alert("created successfully!");
          })
          .catch((error) => {
            console.log(error);
            alert("Error");
          });
      }
    } catch (error) {
      alert("Error");
      console.log("Error: ", error);
    }
  }

  return (
    <div className="entry-edit-create-container">
      <form className="entry-creation-form">
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
        <label htmlFor="calendar">Due date</label>
        <input
          type="date"
          onChange={(event) => {
            setDueDate(new Date(event.target.value));
          }}
          name="calendar"
          min="2022-10-03"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            setFile(event.target.files[0]);
          }}
        />
        <button
          disabled={!title || !text || !dueDate}
          onClick={(event) => {
            createEntry();
            event.preventDefault();
          }}
        >
          create entry
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            setIsEntryCreationFormVisible(false);
          }}
        >
          close
        </button>
      </form>
    </div>
  );
};
