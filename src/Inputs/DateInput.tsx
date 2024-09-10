import React from 'react';
import FormControl from '@mui/material/FormControl';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import IconButton from '@mui/material/IconButton';
import { Clear } from '@mui/icons-material';
import type { JSX } from 'react';

type DateInputProps = {
    value: Date | null,
    onChange: (value: Date | null) => void,
    minWidth?: number | undefined,
    maxWidth?: number | undefined,
    padding?: string | undefined,
    disabled?: boolean | undefined,
    dense?: boolean | undefined,
    labelText?: string | undefined,
};

const defaultProps = {
    minWidth: 250,
    maxWidth: 5000,
    padding: '0px',
    dense: false,
    disabled: false,
    labelText: '',
};

export function DateInput(props: Readonly<DateInputProps>): JSX.Element {

    const minWidth: number = props.minWidth ?? defaultProps.minWidth;
    const maxWidth: number = props.maxWidth ?? defaultProps.maxWidth;
    const padding: string = props.padding ?? defaultProps.padding;
    const dense: boolean = props.dense ?? defaultProps.dense;
    const disabled: boolean = props.disabled ?? defaultProps.disabled;
    const labelText: string = props.labelText ?? defaultProps.labelText;
    
    function handleChange(value: Date | null): void {

        let newDate: Date | null = null;

        if (value !== null) {
            
            newDate = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate(), 0, 0, 0, 0));
        }

        props.onChange(newDate);
    }

    return (
        <FormControl
            style={{
                minWidth: minWidth,
                maxWidth: maxWidth,
                padding: padding,
            }}
        >
            <table>
                <tbody>
                    <tr>
                        <td style={{
                            width: '35px',
                        }}>
                            <IconButton 
                                onClick={(): void => handleChange(null)}
                                size='small'
                                aria-label='clear'
                                disabled={disabled}
                            >
                                <Clear fontSize='small' />
                            </IconButton>
                        </td>
                        <td>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <MobileDatePicker
                                    value={props.value}
                                    onChange={handleChange}
                                    disabled={disabled}
                                    format='yyyy-MM-dd'
                                    label={labelText}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    slotProps={{
                                        textField: {
                                            size: dense ? 'small' : undefined,
                                            style: {
                                                minWidth: minWidth === undefined ? undefined : minWidth - 35,
                                                maxWidth: maxWidth === undefined ? undefined : maxWidth - 35,
                                            },
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </td>
                    </tr>
                </tbody>
            </table>
        </FormControl>
    );
}