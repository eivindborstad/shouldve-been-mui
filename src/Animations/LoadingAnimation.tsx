import type { Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useMemo, useState } from 'react';
import type { JSX } from 'react';
import { modulo } from 'shouldve-been-js';

type LoadingAnimationProps = {
    initialStateGenerator: () => boolean[][],
    noChangeBehavior: string,
    loop: boolean,
    frameMilliSeconds: number,
    cellSize: number,
};

export function LoadingAnimation(props: LoadingAnimationProps): JSX.Element {

    const [grid, setGrid] = useState<boolean[][]>([]);
    const [hasTerminated, setHasTerminated] = useState<boolean>(false);
    const [latestUpdateMillis, setLatestUpdateMillis] = useState<number>(0);

    const currentTheme: Theme = useTheme();

    //needs to destructure function props that are to be called from within a useEffect for the dependency array to work correctly (has to do with this-binding)
    const destructuredPropsInitialStateGenerator: () => boolean[][] = props.initialStateGenerator;

    const tableContent: JSX.Element[] = useMemo<JSX.Element[]>(() => grid.map((row: boolean[], i: number) => {
        return (
            <tr
                key={i}
            >
                {row.map((cell: boolean, j: number) => {
                    return (
                        <td
                            key={j}
                            style={{
                                backgroundColor: cell ? currentTheme.palette.text.primary : currentTheme.palette.background.default,
                                width: props.cellSize,
                                height: props.cellSize,
                            }}
                        >
                        </td>
                    );
                })}
            </tr>
        );
    }), [currentTheme.palette.background.default, currentTheme.palette.text.primary, grid, props.cellSize]);

    useEffect(() => {

        function update(): void {

            if (hasTerminated) {
                return;
            }

            if (grid.length === 0) {
                setGrid(destructuredPropsInitialStateGenerator());
                return;
            }

            let gridsAreStillIdentical: boolean = true;

            const newGrid: boolean[][] = [];

            for (let i: number = 0; i < grid.length; i++) {
                
                const newRow: boolean[] = [];

                for (let j: number = 0; j < grid[i].length; j++) {

                    let livingNeighbours = 0;

                    if (props.loop) {
                        try {
                            if (grid[modulo(i - 1, grid.length)][j]) {
                                livingNeighbours++;
                            } 
                            
                            if (grid[modulo(i + 1, grid.length)][j]) {
                                livingNeighbours++;
                            } 
                            
                            if (grid[i][modulo(j - 1, grid[i].length)]) {
                                livingNeighbours++;
                            } 
                            
                            if (grid[i][modulo(j + 1, grid[i].length)]) {
                                livingNeighbours++;
                            } 
                            
                            if (grid[modulo(i - 1, grid.length)][modulo(j - 1, grid[i].length)]) {
                                livingNeighbours++;
                            } 
                            
                            if (grid[modulo(i - 1, grid.length)][modulo(j + 1, grid[i].length)]) {
                                livingNeighbours++;
                            } 
                            
                            if (grid[modulo(i + 1, grid.length)][modulo(j - 1, grid[i].length)]) {
                                livingNeighbours++;
                            }
                            
                            if (grid[modulo(i + 1, grid.length)][modulo(j + 1, grid[i].length)]) {
                                livingNeighbours++;
                            }
                        } catch (e: unknown) {
                            
                        }
                    } else {

                        if (i > 0 && grid[i - 1][j]) {
                            livingNeighbours++;
                        } 
                        
                        if (i < grid.length - 1 && grid[i + 1][j]) {
                            livingNeighbours++;
                        } 
                        
                        if (j > 0 && grid[i][j - 1]) {
                            livingNeighbours++;
                        } 
                        
                        if (j < grid[i].length - 1 && grid[i][j + 1]) {
                            livingNeighbours++;
                        } 
                        
                        if (i > 0 && j > 0 && grid[i - 1][j - 1]) {
                            livingNeighbours++;
                        } 
                        
                        if (i > 0 && j < grid[i].length - 1 && grid[i - 1][j + 1]) {
                            livingNeighbours++;
                        } 
                        
                        if (i < grid.length - 1 && j > 0 && grid[i + 1][j - 1]) {
                            livingNeighbours++;
                        }
                        
                        if (i < grid.length - 1 && j < grid[i].length - 1 && grid[i + 1][j + 1]) {
                            livingNeighbours++;
                        }
                    }

                    if (grid[i][j] && (livingNeighbours === 2 || livingNeighbours === 3)) {
                        newRow.push(true);
                    } else if (!grid[i][j] && livingNeighbours === 3) {
                        newRow.push(true);
                    } else {
                        newRow.push(false);
                    }

                    if (newRow[j] !== grid[i][j]) {
                        gridsAreStillIdentical = false;
                    }
                }

                newGrid.push(newRow);
            }

            if (gridsAreStillIdentical) {
                if (props.noChangeBehavior === 'restart') {
                    setGrid(destructuredPropsInitialStateGenerator());
                } else {
                    setHasTerminated(true);
                }
            } else {
                setGrid(newGrid);
            }
        }

        function shouldUpdate(): void {

            const currentMillis: number = new Date().getTime();

            if (Math.floor(latestUpdateMillis / props.frameMilliSeconds) < Math.floor(currentMillis / props.frameMilliSeconds)) {
                
                setLatestUpdateMillis(currentMillis);
                update();
            }
        }

        shouldUpdate();
        const interval: NodeJS.Timeout = setInterval(shouldUpdate, Math.ceil(props.frameMilliSeconds / 5));
         
        return () => clearInterval(interval);
    }, [hasTerminated, grid, latestUpdateMillis, props.noChangeBehavior, props.frameMilliSeconds, props.loop, destructuredPropsInitialStateGenerator]);

    return (
        <span>
            <table style={{
                display: 'inline-table',
                border: '1px',
            }}>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        </span>
    );
}