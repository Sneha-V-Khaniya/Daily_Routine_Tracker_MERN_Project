import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from '../Context/UserContext';


export default function Notes(props) {
  const [text, setText] = useState("");

  const { user } = useUser();

  const saveNote = async (e) => {
    try {
      const userEmail = user.email;
      console.log(userEmail)
      const dateParts = props.day.split('-'); // Split the date string into parts
      const isoDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // Reformat to ISO 8601 format
      const date = new Date(isoDate);
      const note = e.target.value;
      console.log(props.day)
      console.log(date)
      await axios.post("http://localhost:8800/save/note", {
        userEmail,
        date,
        note,
      });
    } catch (err) {
      console.log("err from Notes:" + err);
    }
  };

  const getNote = async () => {
    try {
      let userEmail = user.email
      let date = new Date(props.day);

      const notedata = await axios.post("http://localhost:8800/get/note", {
        userEmail,
        date,
      });
      if (notedata) {
        console.log(notedata.data.note);
        setText(notedata.data.note);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <>
      <textarea
        value={text}
        placeholder="Something about the day..."
        onChange={(e) => setText(e.target.value)}
        onBlur={saveNote}
      />
    </>
  );
}
