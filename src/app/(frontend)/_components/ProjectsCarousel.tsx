"use client";

import type { Project } from "~/payload-types";
import ThreeDCarousel from "./3DCarousel";
import { SimpleCarousel } from "./SimpleCarousel";

type Props = { projects: Project[] };
export default function ProjectsCarousel({ projects }: Props) {
	return (
		<section className="w-full">
			<h2>Projects</h2>
			<ThreeDCarousel
				className="relative hidden w-full md:block"
				projects={projects}
			/>
			<SimpleCarousel
				className="relative w-full md:hidden"
				projects={projects}
			/>
		</section>
	);
}
