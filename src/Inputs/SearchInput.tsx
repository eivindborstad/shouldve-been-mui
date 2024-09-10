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
    padding?: string | undefined,
    dense?: boolean | undefined,
    disabled?: boolean | undefined,
    minWidth?: string | number | undefined,
    maxWidth?: string | number | undefined,
};

const defaultProps = {
    minWidth: 250,
    maxWidth: 5000,
    padding: '0px',
    dense: false,
    disabled: false,
};

export function SearchInput(props: Readonly<SearchInputProps>): JSX.Element {

    const minWidth: string | number = props.minWidth ?? defaultProps.minWidth;
    const maxWidth: string | number = props.maxWidth ?? defaultProps.maxWidth;
    const padding: string = props.padding ?? defaultProps.padding;
    const dense: boolean = props.dense ?? defaultProps.dense;
    const disabled: boolean = props.disabled ?? defaultProps.disabled;

    return (
        <FormControl style={{
            minWidth: minWidth,
            maxWidth: maxWidth,
            padding: padding,
        }}>
            <OutlinedInput
                value={props.value}
                onChange={(e: React.ChangeEvent): void => props.onChange((e.target as HTMLInputElement).value)}
                onClick={(e: React.MouseEvent): void => e.stopPropagation()}
                size={dense ? 'small' : undefined}
                disabled={disabled}
                startAdornment={
                    <InputAdornment position='start'>
                        <FontAwesomeIcon icon={faSearch} />
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}