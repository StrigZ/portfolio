import type { CollectionConfig } from "payload";
import { getPlaiceholder } from "plaiceholder";

export const Media: CollectionConfig = {
	slug: "media",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "alt",
			type: "text",
			required: true,
		},
		{
			name: "blurDataUrl",
			type: "text",
			required: true,
			admin: { hidden: true },
		},
	],
	upload: true,
	hooks: {
		beforeChange: [
			async ({ operation, data, req }) => {
				if (operation !== "create") return data;

				const mimeType = req.file?.mimetype;
				if (!mimeType) return data;
				if (!mimeType.startsWith("image/") || mimeType === "image/svg+xml")
					return data;

				const buffer = req.file?.data;
				if (!buffer) return data;

				const { base64 } = await getPlaiceholder(buffer);
				if (!base64) return data;
				data.blurDataUrl = base64;

				return data;
			},
		],
	},
};
