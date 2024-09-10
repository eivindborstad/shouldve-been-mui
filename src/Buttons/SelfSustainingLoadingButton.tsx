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
    overrideColor?: string | null | undefined,
    textColor?: string | null | undefined,
    circularColor?: CircularProgressProps['color'] | undefined,
    circularSize?: string | undefined,
    variant?: ButtonTypeMap['props']['variant'] | undefined,
    disabled?: boolean | undefined,
    display?: string | undefined,
    fontSize?: string | undefined,
};

const defaultProps = {
    //circularColor: 'error', //doesn't understand the type of the defaultProp, so must be hardcoded below
    circularSize: '30px',
    //variant: 'contained', //doesn't understand the type of the defaultProp, so must be hardcoded below
    disabled: false,
    overrideColor: null,
    textColor: null,
    display: '',
    fontSize: '14px',
};

export function SelfSustainingLoadingButton(props: Readonly<SelfSustainingLoadingButtonProps>): JSX.Element {

    const circularColor: CircularProgressProps['color'] = props.circularColor ?? 'error';  //doesn't understand the type of the defaultProp, so must be hardcoded here
    const circularSize: string = props.circularSize ?? defaultProps.circularSize;
    const variant: ButtonTypeMap['props']['variant'] = props.variant ?? 'contained';  //doesn't understand the type of the defaultProp, so must be hardcoded here
    const disabled: boolean = props.disabled ?? defaultProps.disabled;
    const overrideColor: string | null = props.overrideColor ?? defaultProps.overrideColor;
    const textColor: string | null = props.textColor ?? defaultProps.textColor;
    const display: string = props.display ?? defaultProps.display;
    const fontSize: string = props.fontSize ?? defaultProps.fontSize;

    const [pending, setPending] = useState<boolean>(false);

    async function handleClick(): Promise<void> {
        setPending(true);
        await props.onClick();
        setPending(false);
    }

    return (
        <Button 
            variant={variant}
            color={props.buttonColor}
            onClick={handleClick}
            disabled={disabled}
            style={{
                minHeight: props.height,
                maxHeight: props.height,
                minWidth: props.width,
                maxWidth: props.width,
                lineHeight: 'normal',
                backgroundColor: overrideColor ?? undefined,
                color: textColor ?? undefined,
                display: display,
                fontSize: fontSize,
            }}
        >
            {pending
                ? <CircularProgress 
                    color={circularColor} 
                    size={circularSize}
                /> 
                : props.text
            }
        </Button>
    );
}