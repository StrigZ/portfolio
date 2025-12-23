"use server";

import { getPayloadClient } from "~/lib/payload/client";

export async function getHeadings({
	locale = "ru",
}: {
	locale?: "en" | "all" | "ru";
}) {
	const payloadClient = await getPayloadClient();
	try {
		const { docs: headings } = await payloadClient.find({
			collection: "headings",
			locale,
			depth: 3,
		});
		return headings ?? [];
	} catch (error) {
		console.error("getHeadings: Failed to fetch headings: ", error);
		return [];
	}
}
