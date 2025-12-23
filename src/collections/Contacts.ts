import type { CollectionConfig } from "payload";

export const Contacts: CollectionConfig = {
	slug: "contacts",
	admin: { useAsTitle: "name" },
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "link",
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
