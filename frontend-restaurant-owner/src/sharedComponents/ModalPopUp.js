import React from 'react';
import { Modal as MaterialModal, Backdrop, Paper, Fade } from '@material-ui/core';

export default function ModalPopUp(props) {
  const { open, onModalRequestClose, children } = props;
  return (
    <MaterialModal
      closeAfterTransition
      open={open}
      onClose={onModalRequestClose}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Paper style={{ width: '70vw', margin: 'auto', marginTop: 30, padding: 20 }}>
          {children}
        </Paper>
      </Fade>
    </MaterialModal>
  );
}
