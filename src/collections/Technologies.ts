import type { CollectionConfig } from "payload";

export const Technologies: CollectionConfig = {
	slug: "technology",
	admin: { useAsTitle: "name" },
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "icon",
			type: "upload",
			relationTo: "media",
			required: true,
		},
	],
};
