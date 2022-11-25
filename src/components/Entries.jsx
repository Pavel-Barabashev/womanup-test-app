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
    <div className="main-wrapper">
      <header>
        <button
          className="entry-creation-button"
          onClick={() => {
            setIsEntryCreationViewVisible(true);
          }}
        >
          Create entry
        </button>
      </header>
      {isEntryCreationViewVisible ? (
        <EntryCreationForm
          entriesCollectionRef={entriesCollectionRef}
          setIsEntryCreationFormVisible={setIsEntryCreationViewVisible}
        />
      ) : null}
      <div className="entries-container">
        {entries.map((entry) => {
          return (
            <div
              className={
                entry.completed ||
                new Date(entry.dueDate.seconds * 1000) < dayjs().toDate()
                  ? "entry-card-complete"
                  : "entry-card-incomplete"
              }
              key={entry.id}
            >
              <h2>{entry.title}</h2>
              <img src={entry.fileUrl} />
              <p className="enrty-text-p">{entry.text}</p>
              <p className="due-date-p">
                Due date: {new Date(entry.dueDate.seconds * 1000).toString()}
              </p>
              {new Date(entry.dueDate.seconds * 1000) < dayjs().toDate() ? (
                <p className="due-date-expiration-notification-p">
                  The time to perform the task has expired
                </p>
              ) : null}
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
                disabled={entry.completed ? true : false}
                onClick={async () => {
                  let entryDoc = doc(db, "entries", entry.id);
                  let newFields = { completed: true };
                  await updateDoc(entryDoc, newFields);
                }}
                type="checkbox"
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
    </div>
  );
};
