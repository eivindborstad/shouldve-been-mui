import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import React, { useEffect, useRef, useState } from 'react';
import type { JSX } from 'react';

type QuickTextInputProps = {
    labelText: string,
    value: string,
    onKeyDown: (e: React.KeyboardEvent) => void,
    onBlur: (value: string) => void,
    icon: IconDefinition | null,
    padding: string,
    variant: string,
    dense: boolean,
    disabled: boolean,
    minWidth: string | number | undefined,
    maxWidth: string | number | undefined,
    bold: boolean,
    rerenderFlag: Date,
    disabledColor: string | null,
    fontSize: string,
    focusFlag: number | null,
    height: string | undefined,
    maxLength: number | null,
    multiline: boolean,
    minRows: number,
};

export function QuickTextInput(props: Readonly<QuickTextInputProps>): JSX.Element {

    const [inputValue, setInputValue] = useState<string>(props.value);

    const focusRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    useEffect(() => {

        setInputValue(props.value);

    }, [props.value, props.rerenderFlag]);

    useEffect(() => {

        if (props.focusFlag !== null && props.focusFlag > 0) {
            focusRef.current?.focus();
        }
    }, [props.focusFlag]);

    function handleBlur(): void {

        if (inputValue === props.value) { //dont update if value has not been changed (if this is not checked, it creates an issue for multiselection)
            return;
        }

        props.onBlur(inputValue);
    }

    function renderVariant(variant: string): JSX.Element {

        switch (variant) {
            case 'filled':
                return (
                    <FilledInput 
                        inputRef={focusRef}
                        value={inputValue}
                        onChange={(e: React.ChangeEvent): void => setInputValue((e.target as HTMLInputElement).value)}
                        onClick={(e: React.MouseEvent): void => e.stopPropagation()}
                        onKeyDown={props.onKeyDown}
                        onBlur={handleBlur}
                        size={props.dense ? 'small' : undefined}
                        disabled={props.disabled}
                        startAdornment={
                            props.icon !== null 
                                ? <InputAdornment position='start'>
                                    <FontAwesomeIcon 
                                        icon={props.icon}
                                    />
                                </InputAdornment>
                                : <div></div>
                        }
                        style={{
                            height: props.height,
                        }}
                        inputProps={{
                            maxLength: props.maxLength ?? undefined,
                            style: {
                                fontWeight: props.bold ? 'bold' : 'normal',
                                color: props.disabled ? (props.disabledColor ?? '') : '',
                                fontSize: props.fontSize,
                            }, 
                        }}
                    />
                );
            case 'outlined':
                return (
                    <OutlinedInput 
                        inputRef={focusRef}
                        value={inputValue}
                        onChange={(e: React.ChangeEvent): void => setInputValue((e.target as HTMLInputElement).value)}
                        onClick={(e: React.MouseEvent): void => e.stopPropagation()}
                        onKeyDown={props.onKeyDown}
                        onBlur={handleBlur}
                        size={props.dense ? 'small' : undefined}
                        disabled={props.disabled}
                        startAdornment={
                            props.icon !== null 
                                ? <InputAdornment position='start'>
                                    <FontAwesomeIcon 
                                        icon={props.icon}
                                    />
                                </InputAdornment>
                                : <div></div>
                        }
                        style={{
                            height: props.height,
                        }}
                        inputProps={{
                            maxLength: props.maxLength ?? undefined,
                            style: {
                                fontWeight: props.bold ? 'bold' : 'normal',
                                color: props.disabled ? (props.disabledColor ?? '') : '',
                                fontSize: props.fontSize,
                            }, 
                        }}
                        label={props.labelText}
                        multiline={props.multiline}
                        minRows={props.multiline ? props.minRows : undefined}
                    />
                );
            default:
                return (
                    <Input 
                        inputRef={focusRef}
                        value={inputValue}
                        onChange={(e: React.ChangeEvent): void => setInputValue((e.target as HTMLInputElement).value)}
                        onClick={(e: React.MouseEvent): void => e.stopPropagation()}
                        onKeyDown={props.onKeyDown}
                        onBlur={handleBlur}
                        size={props.dense ? 'small' : undefined}
                        disabled={props.disabled}
                        startAdornment={
                            props.icon !== null 
                                ? <InputAdornment position='start'>
                                    <FontAwesomeIcon 
                                        icon={props.icon}
                                    />
                                </InputAdornment>
                                : <div></div>
                        }
                        style={{
                            height: props.height,
                        }}
                        inputProps={{
                            maxLength: props.maxLength ?? undefined,
                            style: {
                                fontWeight: props.bold ? 'bold' : 'normal',
                                color: props.disabled ? (props.disabledColor ?? '') : '',
                                fontSize: props.fontSize,
                            }, 
                        }}
                    />
                );
        }
    }

    return (
        <FormControl style={{
            minWidth: props.minWidth,
            maxWidth: props.maxWidth,
            padding: props.padding,
        }}>
            <InputLabel>{props.labelText}</InputLabel>
            {renderVariant(props.variant)}
        </FormControl>
    );
}

QuickTextInput.defaultProps = {
    labelText: '',
    onKeyDown: (): void => {},
    onBlur: (): void => {},
    icon: null,
    minWidth: 250,
    maxWidth: 5000,
    padding: '0px',
    variant: 'standard',
    dense: false,
    disabled: false,
    bold: false,
    rerenderFlag: new Date(),
    disabledColor: null,
    fontSize: '16px',
    height: undefined,
    focusFlag: null,
    maxLength: null,
    multiline: false,
    minRows: 1,
};