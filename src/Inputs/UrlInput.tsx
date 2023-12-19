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
    labelText: string,
    protocol: string,
    url: string,
    onProtocolChange: (value: string) => void,
    onUrlChange: (value: string) => void,
    onKeyDown: (e: React.KeyboardEvent) => void,
    minWidth: string | number | undefined,
    maxWidth: string | number | undefined,
};

export function UrlInput(props: UrlInputProps): JSX.Element {

    function handleProtocolChange(e: SelectChangeEvent): void {

        props.onProtocolChange((e.target as HTMLInputElement).value);
    }

    function handleUrlChange(e: React.ChangeEvent): void {

        props.onUrlChange((e.target as HTMLInputElement).value);
    }

    return (
        <FormControl style={{
            minWidth: props.minWidth,
            maxWidth: props.maxWidth,
        }}>
            <InputLabel>{props.labelText}</InputLabel>
            <Input
                value={props.url}
                onChange={handleUrlChange}
                onKeyDown={props.onKeyDown}
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

UrlInput.defaultProps = {
    labelText: 'URL',
    onKeyDown: (): void => {},
    minWidth: '250px',
    maxWidth: '5000px',
};