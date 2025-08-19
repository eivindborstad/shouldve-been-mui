import type { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import type { FilterOptionsState } from '@mui/material/useAutocomplete';
import type { JSX } from 'react';
import React, { useEffect, useMemo, useRef } from 'react';

type AutocompleteInputProps = {
    labelText?: string | undefined,
    value: string,
    onChange?: ((value: string) => void) | undefined,
    options: { label: string, id: string, disabled: boolean }[],
    padding?: string | undefined,
    dense?: boolean | undefined,
    disabled?: boolean | undefined,
    width?: string | number | undefined,
    focusFlag?: number | null | undefined,
    limit: number | null,
    backgroundColor?: string | undefined,
    allowArbitraryValues?: boolean | undefined,
};

const defaultProps = {
    labelText: '',
    onChange: (): void => {},
    width: 250,
    padding: '0px',
    dense: false,
    disabled: false,
    focusFlag: null,
    backgroundColor: undefined,
    allowArbitraryValues: false,
};

export function AutocompleteInput(props: Readonly<AutocompleteInputProps>): JSX.Element {

    const labelText: string = props.labelText ?? defaultProps.labelText;
    const onChange: (value: string) => void = props.onChange ?? defaultProps.onChange;
    const width: string | number = props.width ?? defaultProps.width;
    const padding: string = props.padding ?? defaultProps.padding;
    const dense: boolean = props.dense ?? defaultProps.dense;
    const disabled: boolean = props.disabled ?? defaultProps.disabled;
    const focusFlag: number | null = props.focusFlag ?? defaultProps.focusFlag;
    const backgroundColor: string | undefined = props.backgroundColor ?? defaultProps.backgroundColor;
    const allowArbitraryValues: boolean = props.allowArbitraryValues ?? defaultProps.allowArbitraryValues;

    const focusRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    const filterOptions: (options: { label: string, id: string, disabled: boolean }[], state: FilterOptionsState<{ label: string, id: string, disabled: boolean }>) => { label: string, id: string, disabled: boolean }[] = useMemo<(options: { label: string, id: string, disabled: boolean }[], state: FilterOptionsState<{ label: string, id: string, disabled: boolean }>) => { label: string, id: string, disabled: boolean }[]>(() => createFilterOptions({
        limit: props.limit ?? undefined,
    }), [props.limit]);

    const valueOption: string | { label: string, id: string, disabled: boolean } | null = useMemo<string | { label: string, id: string, disabled: boolean } | null>(() => {

        const existingOptionmatch: { label: string, id: string, disabled: boolean } | null = props.options.find((option: { label: string, id: string, disabled: boolean }) => props.value === option.id) ?? null;

        if (existingOptionmatch !== null) {
            return existingOptionmatch;
        } else if (allowArbitraryValues) {
            return props.value;
        } else {
            return null;
        }
    }, [allowArbitraryValues, props.options, props.value]);

    useEffect(() => {

        if (focusFlag !== null && focusFlag > 0) {
            focusRef.current?.focus();
        }
    }, [focusFlag]);

    return (
        <FormControl style={{
            padding: padding,
        }}>
            <Autocomplete
                multiple={false}
                disablePortal={false}
                value={valueOption}
                options={props.options}
                isOptionEqualToValue={(option: { label: string, id: string, disabled: boolean } | null, value: { label: string, id: string, disabled: boolean } | null): boolean => option?.id === value?.id}
                onChange={(e: React.SyntheticEvent, value: string | { label: string, id: string, disabled: boolean } | null): void => {
                    if (typeof value === 'string') {
                        onChange(value);
                    } else {
                        onChange(value?.id ?? '');
                    }
                }}
                onKeyDown={(e: React.KeyboardEvent): void => {
                    if (allowArbitraryValues) {
                        onChange((e.target as HTMLInputElement).value);
                    }
                }}
                sx={{ 
                    width: width,
                    backgroundColor: backgroundColor,
                }}
                disabled={disabled}
                renderInput={(params: AutocompleteRenderInputParams): JSX.Element => <TextField {...params} size={dense ? 'small' : undefined} label={labelText} />}
                filterOptions={filterOptions}
                getOptionDisabled={(option: { label: string, id: string, disabled: boolean }): boolean => option.disabled}
                freeSolo={allowArbitraryValues}
                autoSelect={allowArbitraryValues}
            />
        </FormControl>
    );
}