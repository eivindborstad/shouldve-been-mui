import type { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import type { JSX } from 'react';

type TutorialDialogButtonProps = {
    size: SizeProp,
    dialog: (controller: boolean, onClose: () => void) => JSX.Element,    
};

export function TutorialDialogButton(props: TutorialDialogButtonProps): JSX.Element {

    const [controller, setController] = useState<boolean>(false);

    function handleOpen(): void {

        setController(true);
    }

    function handleClose(): void {

        setController(false);
    }

    return (
        <>
            <IconButton
                onClick={handleOpen}
            >
                <FontAwesomeIcon 
                    icon={faQuestionCircle} 
                    size={props.size} 
                />
            </IconButton>

            {props.dialog(controller, handleClose)}
        </>
    );
}

TutorialDialogButton.defaultProps = {
    size: 'lg',
};