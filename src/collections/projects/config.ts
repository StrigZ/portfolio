import type { CollectionConfig, FieldHook } from "payload";
import { slugify } from "payload/shared";
import type { Project } from "~/payload-types";

const generateSlugHook: FieldHook<Project, string> = ({ value, data }) => {
	return slugify((value ?? data?.title)?.trim()) ?? "";
};

export const Projects: CollectionConfig = {
	slug: "projects",
	fields: [
		{ name: "title", required: true, type: "text" },
		{ name: "description", required: true, type: "text" },
		{
			name: "slug",
			type: "text",
			required: true,
			unique: true,
			hooks: { beforeValidate: [generateSlugHook] },
			admin: { hidden: true },
		},
		{
			name: "coverImage",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{ name: "demo_url", required: true, type: "text" },
		{
			name: "technologies",
			type: "array",
			fields: [
				{
					name: "technology",
					type: "relationship",
					relationTo: "technology",
					required: true,
				},
			],
		},
		{ name: "source_url", required: true, type: "text" },
	],
};
