import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import type { JSX } from 'react';

type LoadDataBackdropProps = {
    dataIsLoaded: boolean,   
};

export function LoadDataBackdrop(props: LoadDataBackdropProps): JSX.Element {

    return (
        <Backdrop
            open={!props.dataIsLoaded}  
            style={{
                zIndex: 5000,
                color: '#FFFFFF',
                position: 'absolute',
                borderRadius: '25px',
            }}
        >
            <CircularProgress color='inherit' />
        </Backdrop>
    );
}