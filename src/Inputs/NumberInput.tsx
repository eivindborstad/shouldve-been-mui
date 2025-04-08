import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import React from 'react';
import type { JSX } from 'react';
import { validateNumberInput } from 'shouldve-been-js';

type NumberInputProps = {
    labelText?: string | undefined,
    value: string,
    onChange: (value: string) => void,
    onKeyDown?: ((e: React.KeyboardEvent) => void) | undefined,
    onBlur?: (() => void) | undefined,
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
    disabledColor?: string | null | undefined,
    fontSize?: string | undefined,
};

const defaultProps = {
    labelText: 'Number',
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
    disabledColor: null,
    fontSize: '12px',
};

export function NumberInput(props: Readonly<NumberInputProps>): JSX.Element {

    const labelText: string = props.labelText ?? defaultProps.labelText;
    const onKeyDown: (e: React.KeyboardEvent) => void = props.onKeyDown ?? defaultProps.onKeyDown;
    const onBlur: () => void = props.onBlur ?? defaultProps.onBlur;
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
    const disabledColor: string | null = props.disabledColor ?? defaultProps.disabledColor;
    const fontSize: string = props.fontSize ?? defaultProps.fontSize;

    function handleChange(e: React.ChangeEvent): void {

        const validationValue: string | null = validateNumberInput((e.target as HTMLInputElement).value, allowDecimals, minValue, maxValue);

        if (!disabled && validationValue !== null) {
            props.onChange(validationValue);
        }
    }

    function renderVariant(currentVariant: string): JSX.Element {

        switch (currentVariant) {
            case 'filled':
                return (
                    <FilledInput 
                        value={props.value.replace(',', '.')}
                        onChange={handleChange}
                        onKeyDown={onKeyDown}
                        onClick={(e: React.MouseEvent): void => e.stopPropagation()}
                        onBlur={onBlur}
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
                        inputProps={{
                            inputMode: 'numeric',
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
                        value={props.value.replace(',', '.')}
                        onChange={handleChange}
                        onKeyDown={onKeyDown}
                        onClick={(e: React.MouseEvent): void => e.stopPropagation()}
                        onBlur={onBlur}
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
                        inputProps={{
                            inputMode: 'numeric',
                            style: {
                                fontWeight: bold ? 'bold' : 'normal',
                                color: disabled ? (disabledColor ?? '') : '',
                                fontSize: fontSize,
                            }, 
                        }}
                        label={labelText}
                    />
                );
            default:
                return (
                    <Input 
                        value={props.value.replace(',', '.')}
                        onChange={handleChange}
                        onKeyDown={onKeyDown}
                        onClick={(e: React.MouseEvent): void => e.stopPropagation()}
                        onBlur={onBlur}
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
                        inputProps={{
                            inputMode: 'numeric',
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