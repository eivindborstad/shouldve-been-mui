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
    labelText: string,
    value: string,
    onChange: (value: string) => void,
    onKeyDown: (e: React.KeyboardEvent) => void,
    onBlur: () => void,
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
    disabledColor: string | null,
    fontSize: string,
};

export function NumberInput(props: Readonly<NumberInputProps>): JSX.Element {

    function handleChange(e: React.ChangeEvent): void {

        const validationValue: string | null = validateNumberInput((e.target as HTMLInputElement).value, props.allowDecimals, props.minValue, props.maxValue);

        if (!props.disabled && validationValue !== null) {
            props.onChange(validationValue);
        }
    }

    function renderVariant(variant: string): JSX.Element {

        switch (variant) {
            case 'filled':
                return (
                    <FilledInput 
                        value={props.value.replace(',', '.')}
                        onChange={handleChange}
                        onKeyDown={props.onKeyDown}
                        onClick={(e: React.MouseEvent): void => e.stopPropagation()}
                        onBlur={props.onBlur}
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
                        inputProps={{
                            inputMode: 'numeric',
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
                        value={props.value.replace(',', '.')}
                        onChange={handleChange}
                        onKeyDown={props.onKeyDown}
                        onClick={(e: React.MouseEvent): void => e.stopPropagation()}
                        onBlur={props.onBlur}
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
                        inputProps={{
                            inputMode: 'numeric',
                            style: {
                                fontWeight: props.bold ? 'bold' : 'normal',
                                color: props.disabled ? (props.disabledColor ?? '') : '',
                                fontSize: props.fontSize,
                            }, 
                        }}
                        label={props.labelText}
                    />
                );
            default:
                return (
                    <Input 
                        value={props.value.replace(',', '.')}
                        onChange={handleChange}
                        onKeyDown={props.onKeyDown}
                        onClick={(e: React.MouseEvent): void => e.stopPropagation()}
                        onBlur={props.onBlur}
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
                        inputProps={{
                            inputMode: 'numeric',
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

NumberInput.defaultProps = {
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