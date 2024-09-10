import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import React from 'react';
import type { JSX } from 'react';
import { getAmongAllowedValues } from 'shouldve-been-js';

type UrlInputProps = {
    labelText?: string | undefined,
    protocol: string,
    url: string,
    onProtocolChange: (value: string) => void,
    onUrlChange: (value: string) => void,
    onKeyDown?: ((e: React.KeyboardEvent) => void) | undefined,
    minWidth?: string | number | undefined,
    maxWidth?: string | number | undefined,
};

const defaultProps = {
    labelText: 'URL',
    onKeyDown: (): void => {},
    minWidth: '250px',
    maxWidth: '5000px',
};

export function UrlInput(props: Readonly<UrlInputProps>): JSX.Element {

    const labelText: string = props.labelText ?? defaultProps.labelText;
    const onKeyDown: (e: React.KeyboardEvent) => void = props.onKeyDown ?? defaultProps.onKeyDown;
    const minWidth: string | number = props.minWidth ?? defaultProps.minWidth;
    const maxWidth: string | number = props.maxWidth ?? defaultProps.maxWidth;

    function handleProtocolChange(e: SelectChangeEvent): void {

        props.onProtocolChange((e.target as HTMLInputElement).value);
    }

    function handleUrlChange(e: React.ChangeEvent): void {

        props.onUrlChange((e.target as HTMLInputElement).value);
    }

    return (
        <FormControl style={{
            minWidth: minWidth,
            maxWidth: maxWidth,
        }}>
            <InputLabel>{labelText}</InputLabel>
            <Input
                value={props.url}
                onChange={handleUrlChange}
                onKeyDown={onKeyDown}
                startAdornment={
                    <div>
                        <FormControl>
                            <Select
                                value={getAmongAllowedValues(props.protocol, ['http://', 'https://'], '')}
                                onChange={handleProtocolChange}
                                variant='standard'
                                disableUnderline={true}
                                size='small'
                            >
                                <MenuItem value='http://'>http://</MenuItem>
                                <MenuItem value='https://'>https://</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                }
            />
        </FormControl>
    );
}