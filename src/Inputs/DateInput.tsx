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
    minWidth: number | undefined,
    maxWidth: number | undefined,
    padding: string,
    disabled: boolean,
    dense: boolean,
    labelText: string,
};

export function DateInput(props: Readonly<DateInputProps>): JSX.Element {

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
                minWidth: props.minWidth,
                maxWidth: props.maxWidth,
                padding: props.padding,
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
                                disabled={props.disabled}
                            >
                                <Clear fontSize='small' />
                            </IconButton>
                        </td>
                        <td>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <MobileDatePicker
                                    value={props.value}
                                    onChange={handleChange}
                                    disabled={props.disabled}
                                    format='yyyy-MM-dd'
                                    label={props.labelText}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    slotProps={{
                                        textField: {
                                            size: props.dense ? 'small' : undefined,
                                            style: {
                                                minWidth: props.minWidth === undefined ? undefined : props.minWidth - 35,
                                                maxWidth: props.maxWidth === undefined ? undefined : props.maxWidth - 35,
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

DateInput.defaultProps = {
    onKeyDown: (): void => {},
    minWidth: 250,
    maxWidth: 5000,
    padding: '0px',
    dense: false,
    disabled: false,
    labelText: '',
};