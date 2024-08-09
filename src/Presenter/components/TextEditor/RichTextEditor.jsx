import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function RichTextEditor() {
  const [value, setValue] = useState("");

  return (
    <ReactQuill
      className=" w-full h-full shadow-xl rounded-xl"
      theme="snow"
      name="content"
      value={value}
      onChange={setValue}
    />
  );
}
