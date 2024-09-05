import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import zIndex from '@mui/material/styles/zIndex';
import React from 'react';
import type { JSX } from 'react';

type LoadDataBackdropProps = {
    dataIsLoaded: boolean,   
    zIndex: number | undefined,
};

export function LoadDataBackdrop(props: Readonly<LoadDataBackdropProps>): JSX.Element {

    return (
        <Backdrop
            open={!props.dataIsLoaded}  
            style={{
                zIndex: props.zIndex, //use higher z index for dialogs, so it will then block that dialog, but not block dialogs on top of a loading view (currently using 1500 in dialogs and 1000 in non-dialogs)
                color: '#FFFFFF',
                position: 'absolute',
                borderRadius: '25px',
            }}
        >
            <CircularProgress color='inherit' />
        </Backdrop>
    );
}

LoadDataBackdrop.defaultProps = {
    zIndex: undefined,
};