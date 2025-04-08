import React from 'react';
import type { Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import type { JSX } from 'react';

type ErrorMessageProps = {
    message: string | null,
    maxWidth: string | number | undefined,
};

export function ErrorMessage(props: Readonly<ErrorMessageProps>): JSX.Element {

    const currentTheme: Theme = useTheme();

    return (
        <>
            {props.message !== null && 
                <p 
                    style={{
                        color: currentTheme.palette.error.main,
                        fontWeight: 'bold',
                        wordWrap: 'normal',
                        maxWidth: props.maxWidth,
                        margin: 'auto',
                    }}
                >
                    {props.message}
                </p>
            }
        </>
    );
}