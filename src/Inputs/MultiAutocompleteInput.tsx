import type { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import type { SyntheticEvent, JSX } from 'react';
import React, { useEffect, useMemo, useRef } from 'react';

type MultiAutocompleteInputProps = {
    labelText: string,
    values: string[],
    onKeyDown: (e: React.KeyboardEvent) => void,
    onChange: (values: string[]) => void,
    options: { label: string, id: string }[],
    padding: string,
    dense: boolean,
    disabled: boolean,
    width: string | number | undefined,
    rerenderFlag: number,
    fontSize: string,
    focusFlag: number | null,
};

export function MultiAutocompleteInput(props: MultiAutocompleteInputProps): JSX.Element {

    const focusRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    const valueOptions: ({ label: string, id: string } | null)[] = useMemo<({ label: string, id: string } | null)[]>(() => {

        return props.options.filter((option: { label: string, id: string }) => props.values.includes(option.id));
    }, [props.options, props.values]);

    useEffect(() => {

        if (props.focusFlag !== null && props.focusFlag > 0) {
            focusRef.current?.focus();
        }
    }, [props.focusFlag]);

    return (
        <FormControl style={{
            padding: props.padding,
        }}>
            <InputLabel>{props.labelText}</InputLabel>
            <Autocomplete
                multiple={true}
                disablePortal={false}
                value={valueOptions}
                options={props.options}
                isOptionEqualToValue={(option: { label: string, id: string } | null, value: { label: string, id: string } | null): boolean => option?.id === value?.id}
                onChange={(e: SyntheticEvent, values: ({ label: string, id: string } | null)[]): void => props.onChange(values.map((value: { label: string, id: string } | null) => value?.id ?? ''))}
                sx={{ width: props.width }}
                disabled={props.disabled}
                renderInput={(params: AutocompleteRenderInputParams): JSX.Element => <TextField {...params} size={props.dense ? 'small' : undefined} />}
            />
        </FormControl>
    );
}

MultiAutocompleteInput.defaultProps = {
    labelText: '',
    onKeyDown: (): void => {},
    onChange: (): void => {},
    width: 250,
    padding: '0px',
    dense: false,
    disabled: false,
    rerenderFlag: 0,
    fontSize: '16px',
    focusFlag: null,
};