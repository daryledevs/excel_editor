import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import UploadFile from '../modal/UploadFile';

function SideBar() {
  const [uploadFileTrigger, setUploadFileTrigger] = useState<boolean>(false);

  return (
    <div className="sidebar__container">
      <UploadFile
        uploadFileTrigger={uploadFileTrigger}
        setUploadFileTrigger={setUploadFileTrigger}
      />
      <ul>
        <li>
          <Link to="/" className="sidebar__link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/list" className="sidebar__link" >
            List
          </Link>
        </li>
        <li onClick={() => setUploadFileTrigger(!uploadFileTrigger)}>Upload</li>
      </ul>
    </div>
  );
}

export default SideBar;
