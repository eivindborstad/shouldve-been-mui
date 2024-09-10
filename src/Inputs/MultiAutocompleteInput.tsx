import type { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import type { SyntheticEvent, JSX } from 'react';
import React, { useEffect, useMemo, useRef } from 'react';

type MultiAutocompleteInputProps = {
    labelText?: string | undefined,
    values: string[],
    onChange?: ((values: string[]) => void) | undefined,
    options: { label: string, id: string }[],
    padding?: string | undefined,
    dense?: boolean | undefined,
    disabled?: boolean | undefined,
    width?: string | number | undefined,
    focusFlag?: number | null | undefined,
    backgroundColor?: string | undefined,
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
};

export function MultiAutocompleteInput(props: Readonly<MultiAutocompleteInputProps>): JSX.Element {

    const labelText: string = props.labelText ?? defaultProps.labelText;
    const onChange: (values: string[]) => void = props.onChange ?? defaultProps.onChange;
    const width: string | number = props.width ?? defaultProps.width;
    const padding: string = props.padding ?? defaultProps.padding;
    const dense: boolean = props.dense ?? defaultProps.dense;
    const disabled: boolean = props.disabled ?? defaultProps.disabled;
    const focusFlag: number | null = props.focusFlag ?? defaultProps.focusFlag;
    const backgroundColor: string | undefined = props.backgroundColor ?? defaultProps.backgroundColor;

    const focusRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    const valueOptions: ({ label: string, id: string } | null)[] = useMemo<({ label: string, id: string } | null)[]>(() => {

        return props.options.filter((option: { label: string, id: string }) => props.values.includes(option.id));
    }, [props.options, props.values]);

    useEffect(() => {

        if (focusFlag !== null && focusFlag > 0) {
            focusRef.current?.focus();
        }
    }, [focusFlag]);

    return (
        <FormControl style={{
            padding: padding,
        }}>
            <InputLabel>{labelText}</InputLabel>
            <Autocomplete
                multiple={true}
                disablePortal={false}
                value={valueOptions}
                options={props.options}
                isOptionEqualToValue={(option: { label: string, id: string } | null, value: { label: string, id: string } | null): boolean => option?.id === value?.id}
                onChange={(e: SyntheticEvent, values: ({ label: string, id: string } | null)[]): void => onChange(values.map((value: { label: string, id: string } | null) => value?.id ?? ''))}
                sx={{ 
                    width: width,
                    backgroundColor: backgroundColor,
                }}
                disabled={disabled}
                renderInput={(params: AutocompleteRenderInputParams): JSX.Element => <TextField {...params} size={dense ? 'small' : undefined} />}
            />
        </FormControl>
    );
}