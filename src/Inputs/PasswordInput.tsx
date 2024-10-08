import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import type { JSX } from 'react';

type PasswordInputProps = {
    password: string,
    labelText?: string | undefined,
    onPasswordChange: (password: string) => void,
    onKeyDown?: ((e: React.KeyboardEvent) => void) | undefined,
    minWidth?: string | number | undefined,
    maxWidth?: string | number | undefined,
};

const defaultProps = {
    labelText: 'Password',
    onKeyDown: (): void => {},
    minWidth: '250px',
    maxWidth: '5000px',
};

export function PasswordInput(props: Readonly<PasswordInputProps>): JSX.Element {

    const labelText: string = props.labelText ?? defaultProps.labelText;
    const onKeyDown: (e: React.KeyboardEvent) => void = props.onKeyDown ?? defaultProps.onKeyDown;
    const minWidth: string | number = props.minWidth ?? defaultProps.minWidth;
    const maxWidth: string | number = props.maxWidth ?? defaultProps.maxWidth;

    const [showPassword, setShowPassword] = useState<boolean>(false);

    function handleChange(e: React.ChangeEvent): void {

        props.onPasswordChange((e.target as HTMLInputElement).value);
    }

    function handleClickShowPassword(): void {

        setShowPassword(!showPassword);
    }

    function handleMouseDownPassword(e: React.MouseEvent): void {

        e.preventDefault();
    }

    return (
        <FormControl style={{
            minWidth: minWidth,
            maxWidth: maxWidth,
        }}>
            <InputLabel>{labelText}</InputLabel>
            <Input
                type={showPassword ? 'text' : 'password'}
                value={props.password}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                startAdornment={
                    <InputAdornment position='start'>
                        <FontAwesomeIcon icon={faKey} />
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}