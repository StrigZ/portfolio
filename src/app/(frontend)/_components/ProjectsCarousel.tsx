"use client";

import type { Project } from "~/payload-types";
import ThreeDCarousel from "./3DCarousel";
import { SimpleCarousel } from "./SimpleCarousel";

type Props = { projects: Project[] };
export default function ProjectsCarousel({ projects }: Props) {
	return (
		<>
			<ThreeDCarousel
				className="relative hidden md:block"
				projects={projects}
			/>
			<SimpleCarousel className="relative md:hidden" projects={projects} />
		</>
	);
}
