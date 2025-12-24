import { useEffect, useState } from "react";

export function useTabVisibility() {
	const [isTabActive, setIsTabActive] = useState(true);

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.hidden) {
				setIsTabActive(false);
			} else {
				setIsTabActive(true);
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	return isTabActive;
}
