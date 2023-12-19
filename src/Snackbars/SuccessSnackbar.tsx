import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import type { JSX } from 'react';

type SuccessSnackbarProps = {
    message: string | null,
    setMessage: (value: string | null) => void,
};

export function SuccessSnackbar(props: SuccessSnackbarProps): JSX.Element {

    return (
        <Snackbar
            open={props.message !== null} 
            autoHideDuration={6000} 
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            onClose={(): void => props.setMessage(null)}
        >
            <Alert onClose={(): void => props.setMessage(null)} severity='success'>
                {props.message}
            </Alert>
        </Snackbar>
    );
}