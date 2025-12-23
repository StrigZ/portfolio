"use server";

import { getPayloadClient } from "~/lib/payload/client";

export async function getContacts({
	locale = "ru",
}: {
	locale?: "en" | "all" | "ru";
}) {
	const payloadClient = await getPayloadClient();
	try {
		const { docs: contacts } = await payloadClient.find({
			collection: "contacts",
			locale,
			depth: 3,
		});
		return contacts ?? [];
	} catch (error) {
		console.error("getContacts: Failed to fetch contacts: ", error);
		return [];
	}
}
