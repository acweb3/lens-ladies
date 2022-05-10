import { useEffect } from "react";

export const useDocumentListener = (
	eventListenerTypes,
	callback,
	deps,
	options
) => {
	// On event listener types or callback change, append event listeners to window
	// and remove stale event listeners.
	useEffect(() => {
		if (Array.isArray(eventListenerTypes)) {
			eventListenerTypes.forEach((eventListenerType) => {
				document.addEventListener(eventListenerType, callback, options);
			});
		} else {
			document.addEventListener(eventListenerTypes, callback, options);
		}

		// Remove stale event listeners on unmount.
		return () => {
			if (Array.isArray(eventListenerTypes)) {
				eventListenerTypes.forEach((eventListenerType) => {
					document.removeEventListener(eventListenerType, callback);
				});
			} else {
				document.removeEventListener(eventListenerTypes, callback);
			}
		};
	}, [eventListenerTypes, callback, ...deps, options]);
};
