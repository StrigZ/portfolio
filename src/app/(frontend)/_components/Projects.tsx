"use client";

import type { Project } from "~/payload-types";
import ThreeDCarousel from "./3DCarousel";
import RotatingHeading from "./RotatingHeading";
import { SimpleCarousel } from "./SimpleCarousel";

type Props = { projects: Project[] };
export default function Projects({ projects }: Props) {
	return (
		<section className="relative w-full overflow-hidden">
			<RotatingHeading className="hidden md:block" len={projects.length} />
			<h2 className="md:hidden">Projects</h2>

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
