import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import type { JSX } from 'react';
import { LoadingButton } from '../entry';

type ConfirmDialogProps = {
    controller: boolean,
    onClose: (confirm: boolean) => Promise<void>,
    title: string,
    text: string,
    noText: string,
    yesText: string,
    loadingConfirm: boolean,
};

export function ConfirmDialog(props: Readonly<ConfirmDialogProps>): JSX.Element {

    const [pending, setPending] = useState<boolean>(false);

    async function handleConfirmCloseAsync(): Promise<void> {

        setPending(true);

        await props.onClose(true);

        setPending(false);
    }

    return (
        <Dialog 
            open={props.controller} 
            onClose={async (): Promise<void> => props.onClose(false)}
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={async (): Promise<void> => props.onClose(false)}
                    color='error'
                    variant='contained'
                    style={{
                        minWidth: '90px',
                        maxWidth: '90px',
                        minHeight: '32px',
                        maxHeight: '32px',
                    }}
                >
                    {props.noText}
                </Button>
                {props.loadingConfirm
                    ? <LoadingButton 
                        width='90px'
                        height='32px'
                        text={props.yesText}
                        controller={pending}
                        onClick={handleConfirmCloseAsync}
                        buttonColor='primary'
                        circularColor='error'
                        circularSize='30px'
                        variant='contained'
                    />
                    : <Button
                        onClick={async (): Promise<void> => props.onClose(true)}
                        color='primary'
                        variant='contained'
                        style={{
                            width: '90px',
                            height: '32px',
                            lineHeight: 'normal',
                            marginRight: '10px',
                        }}
                    >
                        {props.yesText}
                    </Button>
                }
            </DialogActions>
        </Dialog>
    );
}