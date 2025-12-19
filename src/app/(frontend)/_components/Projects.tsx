"use client";

import type { Project } from "~/payload-types";
import { SimpleCarousel } from "./SimpleCarousel";

type Props = { projects: Project[] };
export default function Projects({ projects }: Props) {
	return (
		<section className="relative w-full overflow-hidden">
			<h2 className="md:hidden">Projects</h2>

			<SimpleCarousel
				className="relative w-full md:hidden"
				projects={projects}
			/>
		</section>
	);
}
