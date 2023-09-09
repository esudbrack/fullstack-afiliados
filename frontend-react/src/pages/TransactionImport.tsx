import { Alert, Button, styled } from '@mui/material';
import * as React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import api from '../services/api';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function TransactionImport () {
  let [displayAlert, setDisplayAlert] = useState(false);
  let [error, setError] = useState(false);
  let [alertMessage, setAlertMessage] = useState(false);
  let [loading, setLoading] = useState(false);

  const fileUpload = (event: any) =>{
    // get the selected file from the input
    const file = event.target.files[0];
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append("sales", file);

    api
      .post("/transactions/import", formData)
      .then((response) => {
        setAlertMessage(response.data.message);
        setError(false);
        setDisplayAlert(true);
        setLoading(false);
      })
      .catch((e) => {
        setAlertMessage(e.response.data.message || 'Erro interno no servidor.');
        setError(true);
        setDisplayAlert(true);
        setLoading(false);
      });
    
  }

  return (
    <div>
      {displayAlert && (
        <Alert
          severity={error ? "error" : "success"}
          style={{ marginBottom: '10px' }}
          onClose={() => {
            setDisplayAlert(false);
          }}
        >
          {alertMessage}
        </Alert>
      )}
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        href="#file-upload"
      >
        Importar Transações
        <VisuallyHiddenInput type="file" name="sales" onChange={fileUpload} />
      </Button>
    </div>
  );
}
