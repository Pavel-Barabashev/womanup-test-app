import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import { EntryEditForm } from "./EntryEditForm";
import dayjs from "dayjs";

export const Entries = () => {
  let [entries, setEntries] = useState([]);
  let [editableEntry, setEditableEntry] = useState({});
  let [isEntryEditViewVisible, setIsEntryEditViewVisible] = useState(false);
  let entriesCollectionRef = collection(db, "entries");

  useEffect(() => {
    async function getEntries() {
      let data = await getDocs(entriesCollectionRef);
      setEntries(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getEntries();
  }, []);
  return (
    <div>
      {entries.map((entry) => {
        return (
          <div key={entry.id}>
            <p>{entry.title}</p>
            <p>{entry.text}</p>
            <button
              onClick={() => {
                setEditableEntry(entry);
                setIsEntryEditViewVisible(true);
              }}
            >
              Edit
            </button>
          </div>
        );
      })}
      {isEntryEditViewVisible ? (
        <EntryEditForm
          editableEntry={editableEntry}
          setIsEntryEditViewVisible={setIsEntryEditViewVisible}
        />
      ) : null}
    </div>
  );
};
