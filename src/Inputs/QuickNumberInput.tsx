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
    labelText?: string | undefined,
    value: string,
    onKeyDown?: ((e: React.KeyboardEvent) => void) | undefined,
    onBlur?: ((value: string) => void) | undefined,
    icon?: IconDefinition | null | undefined,
    minValue?: number | null | undefined,
    maxValue?: number | null | undefined,
    minWidth?: string | number | undefined,
    maxWidth?: string | number | undefined,
    padding?: string | undefined,
    variant?: string | undefined,
    dense?: boolean | undefined,
    disabled?: boolean | undefined,
    allowDecimals?: boolean | undefined,
    bold?: boolean | undefined,
    rerenderFlag?: Date | undefined,
    disabledColor?: string | null | undefined,
    fontSize?: string | undefined,
    height?: string | undefined,
    focusFlag?: number | null | undefined,
};

const defaultProps = {
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

export function QuickNumberInput(props: Readonly<QuickNumberInputProps>): JSX.Element {

    const labelText: string = props.labelText ?? defaultProps.labelText;
    const onKeyDown: (e: React.KeyboardEvent) => void = props.onKeyDown ?? defaultProps.onKeyDown;
    const onBlur: (value: string) => void = props.onBlur ?? defaultProps.onBlur;
    const icon: IconDefinition | null = props.icon ?? defaultProps.icon;
    const minValue: number | null = props.minValue === undefined ? defaultProps.minValue : props.minValue;
    const maxValue: number | null = props.maxValue === undefined ? defaultProps.maxValue : props.maxValue;
    const minWidth: string | number = props.minWidth ?? defaultProps.minWidth;
    const maxWidth: string | number = props.maxWidth ?? defaultProps.maxWidth;
    const padding: string = props.padding ?? defaultProps.padding;
    const variant: string = props.variant ?? defaultProps.variant;
    const dense: boolean = props.dense ?? defaultProps.dense;
    const disabled: boolean = props.disabled ?? defaultProps.disabled;
    const allowDecimals: boolean = props.allowDecimals ?? defaultProps.allowDecimals;
    const bold: boolean = props.bold ?? defaultProps.bold;
    const rerenderFlag: Date = props.rerenderFlag ?? defaultProps.rerenderFlag;
    const disabledColor: string | null = props.disabledColor ?? defaultProps.disabledColor;
    const fontSize: string = props.fontSize ?? defaultProps.fontSize;
    const height: string | undefined = props.height ?? defaultProps.height;
    const focusFlag: number | null = props.focusFlag ?? defaultProps.focusFlag;

    const [inputValue, setInputValue] = useState<string>(props.value);

    const focusRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    useEffect(() => {

        setInputValue(props.value);

    }, [props.value, rerenderFlag]);

    useEffect(() => {

        if (focusFlag !== null && focusFlag > 0) {
            focusRef.current?.focus();
        }
    }, [focusFlag]);

    function handleChange(e: React.ChangeEvent): void {

        const validationValue: string | null = validateNumberInput((e.target as HTMLInputElement).value, allowDecimals, minValue, maxValue);

        if (validationValue !== null) {
            setInputValue(validationValue);
        }
    }

    function handleBlur(): void {

        if (inputValue === props.value) { //dont update if value has not been changed (if this is not checked, it creates an issue for multiselection)
            return;
        }

        onBlur(inputValue);
    }

    function renderVariant(currentVariant: string): JSX.Element {

        switch (currentVariant) {
            case 'filled':
                return (
                    <FilledInput
                        value={inputValue.replace(',', '.')}
                        onChange={handleChange}
                        onKeyDown={onKeyDown}
                        onClick={(e: React.MouseEvent): void => e.stopPropagation()}
                        onBlur={handleBlur}
                        size={dense ? 'small' : undefined}
                        disabled={disabled}
                        startAdornment={
                            icon !== null 
                                ? <InputAdornment position='start'>
                                    <FontAwesomeIcon
                                        icon={icon}
                                    />
                                </InputAdornment>
                                : <div></div>
                        }
                        style={{
                            height: height,
                        }}
                        inputProps={{
                            inputMode: 'numeric',
                            style: {
                                fontSize: fontSize,
                                fontWeight: bold ? 'bold' : 'normal',
                                color: disabled ? (disabledColor ?? '') : '',
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
                        size={dense ? 'small' : undefined}
                        disabled={disabled}
                        startAdornment={
                            icon !== null 
                                ? <InputAdornment position='start'>
                                    <FontAwesomeIcon
                                        icon={icon}
                                    />
                                </InputAdornment>
                                : <div></div>
                        }
                        style={{
                            height: height,
                        }}
                        inputProps={{
                            inputMode: 'numeric',
                            style: {
                                fontSize: fontSize,
                                fontWeight: bold ? 'bold' : 'normal',
                                color: disabled ? (disabledColor ?? '') : '',
                            }, 
                        }}
                        label={labelText}
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
                        size={dense ? 'small' : undefined}
                        disabled={disabled}
                        startAdornment={
                            icon !== null 
                                ? <InputAdornment position='start'>
                                    <FontAwesomeIcon
                                        icon={icon}
                                    />
                                </InputAdornment>
                                : <div></div>
                        }
                        style={{
                            height: height,
                        }}
                        inputProps={{
                            inputMode: 'numeric',
                            style: {
                                fontSize: fontSize,
                                fontWeight: bold ? 'bold' : 'normal',
                                color: disabled ? (disabledColor ?? '') : '',
                            }, 
                        }}
                    />
                );
        }
    }

    return (
        <FormControl style={{
            minWidth: minWidth,
            maxWidth: maxWidth,
            padding: padding,
        }}>
            <InputLabel>{labelText}</InputLabel>
            {renderVariant(variant)}
        </FormControl>
    );
}