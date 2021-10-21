import LinearProgress from '@material-ui/core/LinearProgress';
import * as React from 'react';
import { useEffect, useState } from 'react';

export default function LoadingBar({ estimateSeconds, ...props }) {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const interval = 200
        const steps = estimateSeconds * 5
        const diff = 100 / steps;
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 100;
                }
                return Math.min(oldProgress + diff, 100);
            });
        }, interval);

        return () => {
            clearInterval(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <LinearProgress variant="determinate" value={progress} {...props} />
}