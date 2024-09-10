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
    labelText?: string | undefined,
    value: string,
    onKeyDown?: ((e: React.KeyboardEvent) => void) | undefined,
    onBlur?: ((value: string) => void) | undefined,
    icon?: IconDefinition | null | undefined,
    padding?: string | undefined,
    variant?: string | undefined,
    dense?: boolean | undefined,
    disabled?: boolean | undefined,
    minWidth?: string | number | undefined,
    maxWidth?: string | number | undefined,
    bold?: boolean | undefined,
    rerenderFlag?: Date | undefined,
    disabledColor?: string | null | undefined,
    fontSize?: string | undefined,
    focusFlag?: number | null | undefined,
    height?: string | undefined,
    maxLength?: number | null | undefined,
    multiline?: boolean | undefined,
    minRows?: number | undefined,
};

const defaultProps = {
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

export function QuickTextInput(props: Readonly<QuickTextInputProps>): JSX.Element {

    const labelText: string = props.labelText ?? defaultProps.labelText;
    const onKeyDown: (e: React.KeyboardEvent) => void = props.onKeyDown ?? defaultProps.onKeyDown;
    const onBlur: (value: string) => void = props.onBlur ?? defaultProps.onBlur;
    const icon: IconDefinition | null = props.icon ?? defaultProps.icon;
    const minWidth: string | number = props.minWidth ?? defaultProps.minWidth;
    const maxWidth: string | number = props.maxWidth ?? defaultProps.maxWidth;
    const padding: string = props.padding ?? defaultProps.padding;
    const variant: string = props.variant ?? defaultProps.variant;
    const dense: boolean = props.dense ?? defaultProps.dense;
    const disabled: boolean = props.disabled ?? defaultProps.disabled;
    const bold: boolean = props.bold ?? defaultProps.bold;
    const rerenderFlag: Date = props.rerenderFlag ?? defaultProps.rerenderFlag;
    const disabledColor: string | null = props.disabledColor ?? defaultProps.disabledColor;
    const fontSize: string = props.fontSize ?? defaultProps.fontSize;
    const height: string | undefined = props.height ?? defaultProps.height;
    const focusFlag: number | null = props.focusFlag ?? defaultProps.focusFlag;
    const maxLength: number | null = props.maxLength ?? defaultProps.maxLength;
    const multiline: boolean = props.multiline ?? defaultProps.multiline;
    const minRows: number = props.minRows ?? defaultProps.minRows;

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
                        inputRef={focusRef}
                        value={inputValue}
                        onChange={(e: React.ChangeEvent): void => setInputValue((e.target as HTMLInputElement).value)}
                        onClick={(e: React.MouseEvent): void => e.stopPropagation()}
                        onKeyDown={onKeyDown}
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
                            maxLength: maxLength ?? undefined,
                            style: {
                                fontWeight: bold ? 'bold' : 'normal',
                                color: disabled ? (disabledColor ?? '') : '',
                                fontSize: fontSize,
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
                        onKeyDown={onKeyDown}
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
                            maxLength: maxLength ?? undefined,
                            style: {
                                fontWeight: bold ? 'bold' : 'normal',
                                color: disabled ? (disabledColor ?? '') : '',
                                fontSize: fontSize,
                            }, 
                        }}
                        label={labelText}
                        multiline={multiline}
                        minRows={multiline ? minRows : undefined}
                    />
                );
            default:
                return (
                    <Input 
                        inputRef={focusRef}
                        value={inputValue}
                        onChange={(e: React.ChangeEvent): void => setInputValue((e.target as HTMLInputElement).value)}
                        onClick={(e: React.MouseEvent): void => e.stopPropagation()}
                        onKeyDown={onKeyDown}
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
                            maxLength: maxLength ?? undefined,
                            style: {
                                fontWeight: bold ? 'bold' : 'normal',
                                color: disabled ? (disabledColor ?? '') : '',
                                fontSize: fontSize,
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