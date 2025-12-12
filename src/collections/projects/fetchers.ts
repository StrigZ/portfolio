import { getPayloadClient } from "~/lib/payload/client";

export async function getProjects() {
	const payloadClient = await getPayloadClient();
	try {
		const { docs: projects } = await payloadClient.find({
			collection: "projects",
			select: {
				title: true,
				demo_url: true,
				source_url: true,
				technologies: true,
				featuredImage: true,
			},
		});
		return projects ?? [];
	} catch (error) {
		console.error("getProjects: Failed to fetch projects: ", error);
		return [];
	}
}
