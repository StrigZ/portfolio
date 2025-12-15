"use client";

import type { Project } from "~/payload-types";
import ThreeDCarousel from "./3DCarousel";
import { SimpleCarousel } from "./SimpleCarousel";

type Props = { projects: Project[] };
export default function ProjectsCarousel({ projects }: Props) {
	return (
		<>
			<ThreeDCarousel className="hidden md:block" projects={projects} />
			<SimpleCarousel className="md:hidden" projects={projects} />
		</>
	);
}
