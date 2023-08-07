import React, { useCallback } from "react";
import closeWhite from "../../assets/icon/close-white.png";
import { useDropzone } from "react-dropzone";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { getUpload } from "../../redux/uploadFileSlice";
import * as XLSX from "xlsx";

interface IEUploadFile {
  uploadFileTrigger: boolean;
  setUploadFileTrigger: (value:boolean) => void;
}

function UploadFile({  uploadFileTrigger, setUploadFileTrigger} : IEUploadFile) {
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      acceptedFiles.forEach((file: File) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = (e) => {
          const filename = file.name
          const fileData = e.target.result;
          const workbook = XLSX.read(fileData, { type: "binary" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonWorksheet = XLSX.utils.sheet_to_json(worksheet, {
            raw: true,
          });

          // Extract and store formulas separately
          const extractedFormulas = [];
          for (const cellAddress in worksheet) {
            if (!worksheet.hasOwnProperty(cellAddress)) continue;

            const cell = worksheet[cellAddress];
            if (cell.f) {
              extractedFormulas.push({ cell: cellAddress, formula: cell.f });
            }
          }
          const data = {
            filename,
            jsonWorksheet,
            workbook,
            extractedFormulas,
          };

          dispatch(getUpload(data));
          console.log("jsonWorksheet: ", jsonWorksheet);
          console.log("workbook: ", workbook);
          console.log("extractedFormulas", extractedFormulas);
        };

        reader.readAsArrayBuffer(file);
        setUploadFileTrigger((prev) => !prev);
      });
    },
    [uploadFileTrigger]
  );

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
