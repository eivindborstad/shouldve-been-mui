import type { ButtonTypeMap } from '@mui/material/Button';
import Button from '@mui/material/Button';
import type { CircularProgressProps } from '@mui/material/CircularProgress';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';
import type { JSX } from 'react';

type SelfSustainingLoadingButtonProps = {
    width: string,
    height: string,
    text: string,
    onClick: () => Promise<void>,
    buttonColor: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    overrideColor: string | null,
    textColor: string | null,
    circularColor: CircularProgressProps['color'],
    circularSize: string,
    variant: ButtonTypeMap['props']['variant'],
    disabled: boolean,
    display: string,
    fontSize: string,
};

export function SelfSustainingLoadingButton(props: SelfSustainingLoadingButtonProps): JSX.Element {

    const [pending, setPending] = useState<boolean>(false);

    async function handleClick(): Promise<void> {
        setPending(true);
        await props.onClick();
        setPending(false);
    }

    return (
        <Button 
            variant={props.variant}
            color={props.buttonColor}
            onClick={handleClick}
            disabled={props.disabled}
            style={{
                minHeight: props.height,
                maxHeight: props.height,
                minWidth: props.width,
                maxWidth: props.width,
                lineHeight: 'normal',
                backgroundColor: props.overrideColor ?? undefined,
                color: props.textColor ?? undefined,
                display: props.display,
                fontSize: props.fontSize,
            }}
        >
            {pending
                ? <CircularProgress 
                    color={props.circularColor} 
                    size={props.circularSize}
                /> 
                : props.text
            }
        </Button>
    );
}

SelfSustainingLoadingButton.defaultProps = {
    buttonColor: 'primary',
    circularColor: 'error',
    circularSize: '30px',
    variant: 'contained',
    disabled: false,
    overrideColor: null,
    textColor: null,
    display: '',
    fontSize: '14px',
};