import React from 'react';
import type { Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import type { JSX } from 'react';

type SuccessMessageProps = {
    message: string | null,
    maxWidth: string | number | undefined,
};

export function SuccessMessage(props: Readonly<SuccessMessageProps>): JSX.Element {

    const currentTheme: Theme = useTheme();

    return (
        <>
            {props.message !== null && 
                <p 
                    style={{
                        color: currentTheme.palette.success.main, 
                        fontWeight: 'bold',
                        wordWrap: 'normal',
                        maxWidth: props.maxWidth,
                    }}
                >
                    {props.message}
                </p>
            }
        </>
    );
}

SuccessMessage.defaultProps = {
    maxWidth: undefined,
};