import React from 'react';
import type { Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import type { JSX } from 'react';

type WarningMessageProps = {
    message: string | null,
    maxWidth: string | number | undefined,
};

export function WarningMessage(props: WarningMessageProps): JSX.Element {

    const currentTheme: Theme = useTheme();

    return (
        <>
            {props.message !== null && 
                <p 
                    style={{
                        color: currentTheme.palette.warning.main, 
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

WarningMessage.defaultProps = {
    maxWidth: undefined,
};