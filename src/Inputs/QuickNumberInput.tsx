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
import { validateNumberInput } from 'shouldve-been-js';

type QuickNumberInputProps = {
    labelText: string,
    value: string,
    onKeyDown: (e: React.KeyboardEvent) => void,
    onBlur: (value: string) => void,
    icon: IconDefinition | null,
    minValue: number | null,
    maxValue: number | null,
    minWidth: string | number | undefined,
    maxWidth: string | number | undefined,
    padding: string,
    variant: string,
    dense: boolean,
    disabled: boolean,
    allowDecimals: boolean,
    bold: boolean,
    rerenderFlag: Date,
    disabledColor: string | null,
    fontSize: string,
    height: string,
    focusFlag: number | null,
};

export function QuickNumberInput(props: Readonly<QuickNumberInputProps>): JSX.Element {

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

    function handleChange(e: React.ChangeEvent): void {

        const validationValue: string | null = validateNumberInput((e.target as HTMLInputElement).value, props.allowDecimals, props.minValue, props.maxValue);

        if (validationValue !== null) {
            setInputValue(validationValue);
        }
    }

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
                        value={inputValue.replace(',', '.')}
                        onChange={handleChange}
                        onKeyDown={props.onKeyDown}
                        onClick={(e: React.MouseEvent): void => e.stopPropagation()}
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
                            inputMode: 'numeric',
                            style: {
                                fontSize: props.fontSize,
                                fontWeight: props.bold ? 'bold' : 'normal',
                                color: props.disabled ? (props.disabledColor ?? '') : '',
                            }, 
                        }}
                    />
                );
            case 'outlined':
                return (
                    <OutlinedInput
                        value={inputValue.replace(',', '.')}
                        onChange={handleChange}
                        onKeyDown={props.onKeyDown}
                        onClick={(e: React.MouseEvent): void => e.stopPropagation()}
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
                            inputMode: 'numeric',
                            style: {
                                fontSize: props.fontSize,
                                fontWeight: props.bold ? 'bold' : 'normal',
                                color: props.disabled ? (props.disabledColor ?? '') : '',
                            }, 
                        }}
                        label={props.labelText}
                    />
                );
            default:
                return (
                    <Input
                        value={inputValue.replace(',', '.')}
                        onChange={handleChange}
                        onKeyDown={props.onKeyDown}
                        onClick={(e: React.MouseEvent): void => e.stopPropagation()}
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
                            inputMode: 'numeric',
                            style: {
                                fontSize: props.fontSize,
                                fontWeight: props.bold ? 'bold' : 'normal',
                                color: props.disabled ? (props.disabledColor ?? '') : '',
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

QuickNumberInput.defaultProps = {
    labelText: '',
    onKeyDown: (): void => {},
    onBlur: (): void => {},
    icon: null,
    minValue: 0,
    maxValue: null,
    minWidth: 250,
    maxWidth: 5000,
    padding: '0px',
    variant: 'standard',
    dense: false,
    disabled: false,
    allowDecimals: false,
    bold: false,
    rerenderFlag: new Date(),
    disabledColor: null,
    fontSize: '16px',
    height: '16px',
    focusFlag: null,
};