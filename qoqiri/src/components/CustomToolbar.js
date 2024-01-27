import React, { useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CustomToolbar = () => {
  const [values, setValues] = useState('');

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
      },
    };
  }, []);
  

return (

<div>
  <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-size" defaultValue="medium">
        <option value="small">작게</option>
        <option value="medium">중간</option>
        <option value="large">크게</option>
        <option value="huge">매우 크게</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-underline" />
      <button className="ql-strike" />
      <button className="ql-blockquote" />
    </span>
    <span className="ql-formats">
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    <span className="ql-formats">
      <button className="ql-image" />  
    </span>
  </div>
      <ReactQuill
        theme="snow"
        modules={modules}
        style={{ width: "100%", height: "400px" }}
        formats={['font', 'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'align', 'color', 'background', 'size', 'h1']}
        onChange={setValues}
      />
    </div>
  );
};
export default CustomToolbar;
