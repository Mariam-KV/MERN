import React from "react";
import "./ImageUpload.css";
import { useRef, useState, useEffect } from "react";
import Button from "./Button";
function ImageUpload(props) {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePicker = useRef();
  useEffect(() => {
    if (!file) return;
    //preview url of image
    //API of the browser => file reader
    const fileReader = new FileReader();
    //this function will be executed when readAsDataURL finish parsing the data
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    //we can convert file data into image
    fileReader.readAsDataURL(file);
  }, [file]);
  const pickImageHandler = () => {
    filePicker.current.click();
  };
  const pickedHandler = (event) => {
    //that holds the files the user selected.
    const files = event.target.files;
    let fileIsValid;
    if (files && files.length === 1) {
      setFile(files[0]);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, files[0], fileIsValid);
  };
  return (
    <div className="form-control">
      <input
        type="file"
        id={props.id}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        ref={filePicker}
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
}

export default ImageUpload;
