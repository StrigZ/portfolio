"use server";

import { getPayloadClient } from "~/lib/payload/client";

export async function getProjects() {
	const payloadClient = await getPayloadClient();
	try {
		const { docs: projects } = await payloadClient.find({
			collection: "projects",
			depth: 3,
		});
		return projects ?? [];
	} catch (error) {
		console.error("getProjects: Failed to fetch projects: ", error);
		return [];
	}
}
