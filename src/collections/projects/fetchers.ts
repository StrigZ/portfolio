"use server";

import { getPayloadClient } from "~/lib/payload/client";

export async function getProjects({
	locale = "ru",
}: {
	locale?: "en" | "all" | "ru";
}) {
	const payloadClient = await getPayloadClient();
	try {
		const { docs: projects } = await payloadClient.find({
			collection: "projects",
			locale,
			depth: 3,
		});
		return projects ?? [];
	} catch (error) {
		console.error("getProjects: Failed to fetch projects: ", error);
		return [];
	}
}
