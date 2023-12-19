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
};

export function SortLabel(props: SortLabelProps): JSX.Element {

    function handleSortChange(columnId: string): void {
        
        const isAsc = props.activeSort === columnId && props.sortDirection === 'asc';
        props.setSortDirection(isAsc ? 'desc' : 'asc');
        props.setActiveSort(columnId);
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