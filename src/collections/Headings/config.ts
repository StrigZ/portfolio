import type { CollectionConfig } from "payload";

export const Headings: CollectionConfig = {
	slug: "headings",
	fields: [
		{
			name: "contactMe",
			type: "text",
			required: true,
			localized: true,
		},
		{
			name: "projects",
			type: "text",
			required: true,
			localized: true,
		},
	],
};
