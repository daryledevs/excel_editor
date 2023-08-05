import React, { useCallback } from "react";
import closeWhite from "../../assets/icon/close-white.png";
import { useDropzone } from "react-dropzone";

interface IEUploadFile {
  uploadFileTrigger: boolean;
  setUploadFileTrigger: (value:boolean) => void;
}

function UploadFile({  uploadFileTrigger, setUploadFileTrigger} : IEUploadFile) {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDrop = useCallback((acceptedFiles:any) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  if(!uploadFileTrigger) return null;

  return (
    <div className="upload-file__container">
      <img src={closeWhite} onClick={() => setUploadFileTrigger(!uploadFileTrigger)} alt="" />
      <div
        className="upload-file__parent"
        {...getRootProps()}
      >
        <p>Drag 'n' drop some files here,</p>
        <p>or click to select files</p>
        <input {...getInputProps()} />
      </div>
    </div>
  );
}

export default UploadFile
