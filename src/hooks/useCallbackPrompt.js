import { useEffect } from "react";
import { unstable_useBlocker } from "react-router-dom";

import ReactDOM from 'react-dom'
import SaveDataModal from "../component/modal/savedatamodal";

export function usePrompt(when = true, onConfirm) {
    const blocker = unstable_useBlocker(when);

    useEffect(() => {
        // message in latest Chrome will be ignored anyway - it uses its own
        if (when) window.onbeforeunload = () => "Are you sure?";

        return () => {
            window.onbeforeunload = null;
        };
    }, [when]);

    useEffect(() => {
        if (blocker.state === "blocked") {
            const element = document.createElement("div");
            element.setAttribute("id", "prompt-dialog-container");
            element.setAttribute("aria-hidden", "true");

            const closePrompt = (state) => {
                if (element) {
                    ReactDOM.unmountComponentAtNode(element);
                }
                if (!state) {
                    document.body.removeChild(element);
                    blocker.reset();
                } else {
                    blocker.proceed();
                }
            };

            document.body.appendChild(element);
            // just a modal with message "You have unsaved changes in this report. Do you want to save your changes?" and 2 buttons [Yes] and [No]
            ReactDOM.render(<SaveDataModal onSaveModal={() => (onConfirm(), closePrompt(true))} onCloseModal={() => (closePrompt(false))} />, element);
        }
    }, [blocker]);
}
