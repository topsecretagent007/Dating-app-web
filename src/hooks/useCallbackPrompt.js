import { useEffect } from "react";
import { unstable_useBlocker } from "react-router-dom";

export function usePrompt(when = true, onConfirm) {
    const blocker = unstable_useBlocker(when);

    useEffect(() => {
        if (when) window.onbeforeunload = () => "Are you sure?";

        return () => {
            window.onbeforeunload = null;
        };
    }, [when]);

    useEffect(() => {
        if (blocker.state === "blocked") {
            const closePrompt = (state) => {
                onConfirm();
                if (!state) {
                    blocker.reset();
                } else {
                    blocker.proceed();
                }
            };
            closePrompt(true)
        }
    }, [blocker]);
}
