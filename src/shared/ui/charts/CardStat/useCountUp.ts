import { useEffect, useState } from 'react';

export const useCountUp = (target: number, duration = 1000, stepTime = 16) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const steps = duration / stepTime;
        const increment = target / steps;

        const interval = setInterval(() => {
            start += increment;
            if (start >= target) {
                start = target;
                clearInterval(interval);
            }
            setValue(Math.round(start));
        }, stepTime);

        return () => clearInterval(interval);
    }, [target, duration, stepTime]);

    return value;
};
