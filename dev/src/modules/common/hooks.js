import { useEffect } from 'react';

// Code comes from https://www.debuggr.io/react-update-unmounted-component/
function useAbortableEffect(effect, dependencies) {
    const status = {}; // mutable status object
    useEffect(() => {
        status.aborted = false;
        // pass the mutable object to the effect callback
        // store the returned value for cleanup
        const cleanUpFn = effect(status);
        return () => {
            // mutate the object to signal the consumer
            // this effect is cleaning up
            status.aborted = true;
            if (typeof cleanUpFn === "function") {
                // run the cleanup function
                cleanUpFn();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencies]);
}

export {
    useAbortableEffect
};
