import TableSortLabel from '@mui/material/TableSortLabel';
import React from 'react';
import type { JSX } from 'react';

type SortLabelProps = {
    children: JSX.Element | string | never[],
    activeSort: string,
    setActiveSort: (value: string) => void,
    sortDirection: 'asc' | 'desc',
    setSortDirection: (value: 'asc' | 'desc') => void,
    columnId: string,
    onSorted?: ((activeSort: string, sortDirection: 'asc' | 'desc') => void) | undefined,
};

const defaultProps = {
    onSorted: undefined,
};

export function SortLabel(props: Readonly<SortLabelProps>): JSX.Element {

    const onSorted: ((activeSort: string, sortDirection: 'asc' | 'desc') => void) | undefined = props.onSorted ?? defaultProps.onSorted;

    function handleSortChange(columnId: string): void {
        
        const isAsc = props.activeSort === columnId && props.sortDirection === 'asc';
        props.setSortDirection(isAsc ? 'desc' : 'asc');
        props.setActiveSort(columnId);

        if (onSorted !== undefined) {
            onSorted(columnId, isAsc ? 'desc' : 'asc');
        }
    }

    return (
        <TableSortLabel
            active={props.activeSort === props.columnId}
            direction={props.activeSort === props.columnId ? props.sortDirection : 'asc'}
            onClick={(): void => handleSortChange(props.columnId)}
        >
            {props.children}
        </TableSortLabel>
    );
}