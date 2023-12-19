import type { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import type { FilterOptionsState } from '@mui/material/useAutocomplete';
import type { JSX } from 'react';
import React, { useEffect, useMemo, useRef } from 'react';

type AutocompleteInputProps = {
    labelText: string,
    value: string,
    onKeyDown: (e: React.KeyboardEvent) => void,
    onChange: (value: string) => void,
    options: { label: string, id: string, disabled: boolean }[],
    padding: string,
    dense: boolean,
    disabled: boolean,
    width: string | number | undefined,
    rerenderFlag: number,
    fontSize: string,
    focusFlag: number | null,
    limit: number | null,
};

export function AutocompleteInput(props: AutocompleteInputProps): JSX.Element {

    const focusRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    const filterOptions: (options: { label: string, id: string, disabled: boolean }[], state: FilterOptionsState<{ label: string, id: string, disabled: boolean }>) => { label: string, id: string, disabled: boolean }[] = useMemo<(options: { label: string, id: string, disabled: boolean }[], state: FilterOptionsState<{ label: string, id: string, disabled: boolean }>) => { label: string, id: string, disabled: boolean }[]>(() => createFilterOptions({
        limit: props.limit ?? undefined,
    }), [props.limit]);

    const valueOption: { label: string, id: string, disabled: boolean } | null = useMemo<{ label: string, id: string, disabled: boolean } | null>(() => {

        return props.options.find((option: { label: string, id: string, disabled: boolean }) => props.value === option.id) ?? null;
    }, [props.options, props.value]);

    useEffect(() => {

        if (props.focusFlag !== null && props.focusFlag > 0) {
            focusRef.current?.focus();
        }
    }, [props.focusFlag]);

    return (
        <FormControl style={{
            padding: props.padding,
        }}>
            <Autocomplete
                multiple={false}
                disablePortal={false}
                value={valueOption}
                options={props.options}
                isOptionEqualToValue={(option: { label: string, id: string, disabled: boolean } | null, value: { label: string, id: string, disabled: boolean } | null): boolean => option?.id === value?.id}
                onChange={(e: React.SyntheticEvent, value: { label: string, id: string, disabled: boolean } | null): void => props.onChange(value?.id ?? '')}
                sx={{ width: props.width }}
                disabled={props.disabled}
                renderInput={(params: AutocompleteRenderInputParams): JSX.Element => <TextField {...params} size={props.dense ? 'small' : undefined} label={props.labelText} />}
                filterOptions={filterOptions}
                getOptionDisabled={(option: { label: string, id: string, disabled: boolean }): boolean => option.disabled}
            />
        </FormControl>
    );
}

AutocompleteInput.defaultProps = {
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