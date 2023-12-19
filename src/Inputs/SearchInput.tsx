import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import React from 'react';
import type { JSX } from 'react';

type SearchInputProps = {
    value: string,
    onChange: (value: string) => void,
    padding: string,
    dense: boolean,
    disabled: boolean,
    minWidth: string | number | undefined,
    maxWidth: string | number | undefined,
};

export function SearchInput(props: SearchInputProps): JSX.Element {

    return (
        <FormControl style={{
            minWidth: props.minWidth,
            maxWidth: props.maxWidth,
            padding: props.padding,
        }}>
            <OutlinedInput
                value={props.value}
                onChange={(e: React.ChangeEvent): void => props.onChange((e.target as HTMLInputElement).value)}
                onClick={(e: React.MouseEvent): void => e.stopPropagation()}
                size={props.dense ? 'small' : undefined}
                disabled={props.disabled}
                startAdornment={
                    <InputAdornment position='start'>
                        <FontAwesomeIcon icon={faSearch} />
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}

SearchInput.defaultProps = {
    minWidth: 250,
    maxWidth: 5000,
    padding: '0px',
    dense: false,
    disabled: false,
};