"use client";

import { createContext, type ReactNode, useContext, useMemo } from "react";
import type { Contact, Heading, Project } from "~/payload-types";

type ContextProvider = {
	projects: Project[];
	headings?: Heading | null;
	contacts: Contact[];
};

const contentProvider = createContext<ContextProvider>({
	projects: [],
	contacts: [],
	headings: null,
});

export const useContentProvider = () => useContext(contentProvider);

type Props = {
	data: {
		projects: Project[];
		headings: Heading[];
		contacts: Contact[];
	};
	children: ReactNode;
};
export function ContentProvider({ data, children }: Props) {
	const value: ContextProvider = useMemo(
		() => ({ ...data, headings: data.headings[0] }),
		[data],
	);
	return (
		<contentProvider.Provider value={value}>
			{children}
		</contentProvider.Provider>
	);
}
