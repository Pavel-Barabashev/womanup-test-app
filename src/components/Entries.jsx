import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "@firebase/firestore";
import { EntryEditForm } from "./EntryEditForm";
import dayjs from "dayjs";
import { EntryCreationForm } from "./EntryCreationForm";

export const Entries = () => {
  let [entries, setEntries] = useState([]);
  let [editableEntry, setEditableEntry] = useState({});
  let [isEntryEditViewVisible, setIsEntryEditViewVisible] = useState(false);
  let [isEntryCreationViewVisible, setIsEntryCreationViewVisible] =
    useState(false);
  let entriesCollectionRef = collection(db, "entries");

  useEffect(() => {
    async function getEntries() {
      let data = await getDocs(entriesCollectionRef);
      setEntries(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getEntries();
  }, []);
  return (
    <>
      <button
        onClick={() => {
          setIsEntryCreationViewVisible(true);
        }}
      >
        Create entry
      </button>
      {isEntryCreationViewVisible ? (
        <EntryCreationForm entriesCollectionRef={entriesCollectionRef} />
      ) : null}
      <div className="entries-container">
        {entries.map((entry) => {
          return (
            <div
              className={
                entry.completed
                  ? "entry-card-complete"
                  : "entry-card-incomplete"
              }
              key={entry.id}
            >
              <h2>{entry.title}</h2>
              <p>{entry.text}</p>
              <button
                disabled={entry.completed}
                onClick={() => {
                  setEditableEntry(entry);
                  setIsEntryEditViewVisible(true);
                }}
              >
                Edit
              </button>
              <input
                disabled={entry.completed}
                onClick={async () => {
                  let entryDoc = doc(db, "entries", entry.id);
                  let newFields = { completed: true };
                  await updateDoc(entryDoc, newFields);
                }}
                type="radio"
              />
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
    </>
  );
};
