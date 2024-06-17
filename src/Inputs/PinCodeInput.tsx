import type { Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import React, { useCallback, useMemo, useState } from 'react';
import type { JSX } from 'react';

type PinCodeInputProps = {
    length: number,
    onComplete: (pin: string) => void,
};

export function PinCodeInput(props: Readonly<PinCodeInputProps>): JSX.Element {

    const currentTheme: Theme = useTheme();

    const [value, setValue] = useState<string>('');

    //needs to destructure function props that are to be called from within a dependency array for it to work correctly (has to do with this-binding)
    const destructuredPropsOnComplete: (password: string) => void = props.onComplete;

    const handleBackPress: (index: number, e: React.KeyboardEvent) => void = useCallback((index: number, e: React.KeyboardEvent) => {

        if (e.key === 'Backspace') {
            if (value.length > 0) {
                setValue(value.substring(0, value.length - 1));
                if (value.length !== props.length) {
                    handleFocusPrevious(e);
                }
            }
        }
    }, [props.length, value]);

    const handleDigitEntered: (index: number, e: React.ChangeEvent) => void = useCallback((index: number, e: React.ChangeEvent) => { //cannot use key events  for digits as chrome on android does not support it

        const newValue: string = (e.target as HTMLInputElement).value;

        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(newValue)) {
            if (index < props.length - 1) {
                setValue(value + newValue);
                handleFocusNext(e);
            } else if (index === props.length - 1) {
                destructuredPropsOnComplete(value.substring(0, index) + newValue);
                setValue(value.substring(0, index) + newValue);
                handleUnfocus(e);
            }
        }
    }, [destructuredPropsOnComplete, props.length, value]);

    const digitInputs: JSX.Element[] = useMemo<JSX.Element[]>(() => {

        const newDigitInputs: JSX.Element[] = [];

        for (let i: number = 0; i < props.length; i++) {

            newDigitInputs.push(
                <input
                    key={i}
                    value={value[i] !== undefined && value [i] !== '' ? '\u2022' : ''} //\u2022 is the "password dot"/bullet
                    type='password'
                    pattern='[0-9]'
                    inputMode='numeric'
                    maxLength={1}
                    onClick={(e: React.MouseEvent): void => handleFocusFirstEmpty(e, value.length, props.length)}
                    onChange={(e: React.ChangeEvent): void => handleDigitEntered(i, e)}
                    onKeyUp={(e: React.KeyboardEvent): void => handleBackPress(i, e)}
                    style={{
                        margin: '0px 7px',
                        padding: '10px',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderRadius: '8px',
                        width: '50px',
                        height: '50px',
                        textAlign: 'center',
                        fontSize: '50px',
                        caretColor: 'transparent',
                        backgroundColor: currentTheme.palette.background.paper,
                        color: currentTheme.palette.text.primary,
                    }}
                />,
            );
        }

        return newDigitInputs;
    }, [currentTheme.palette.background.paper, currentTheme.palette.text.primary, handleBackPress, handleDigitEntered, props.length, value]);

    function handleFocusNext(e: React.ChangeEvent): void {
        
        try {
            const form: HTMLFormElement | null = (e.target as HTMLInputElement).form;

            if (form === null) {
                return;
            }

            const index: number = Array.prototype.indexOf.call(form, e.target);
            (form.elements[index + 1] as HTMLInputElement).focus();
            e.preventDefault();
        } catch (err: unknown) {

        }
    }

    function handleFocusPrevious(e: React.KeyboardEvent): void {
        
        try {
            const form: HTMLFormElement | null = (e.target as HTMLInputElement).form;

            if (form === null) {
                return;
            }

            const index: number = Array.prototype.indexOf.call(form, e.target);
            (form.elements[index - 1] as HTMLInputElement).focus();
            e.preventDefault();
        } catch (err: unknown) {

        }
    }

    function handleFocusFirstEmpty(e: React.MouseEvent, valueLength: number, pinLength: number): void {
        
        try {

            const form: HTMLFormElement | null = (e.target as HTMLInputElement).form;

            if (form === null) {
                return;
            }

            (form.elements[Math.min(valueLength, pinLength - 1)] as HTMLInputElement).focus();
            e.preventDefault();
        } catch (err: unknown) {

        }
    }

    function handleUnfocus(e: React.ChangeEvent): void {
        
        try {
            (e.target as HTMLInputElement).blur();

            e.preventDefault();
        } catch (err: unknown) {

        }
    }

    return (
        <form style={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            {digitInputs}
        </form>
    );
}