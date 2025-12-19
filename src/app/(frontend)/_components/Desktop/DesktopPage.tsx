"use client";

import type { Project } from "~/payload-types";
import useSlideRadius from "../../_hooks/use-slide-radius";
import ThreeDCarousel from "../3DCarousel";
import RotatingHeading from "../RotatingHeading";

type Props = { projects: Project[]; className?: string };
export default function DesktopPage({ className, projects }: Props) {
	const { radius } = useSlideRadius({ len: projects.length });

	return (
		<div className="flex h-full w-full flex-col pb-24">
			<section className="h-1/2"></section>
			<section className="flex h-1/2 w-full flex-col gap-8">
				<RotatingHeading className="perspective-distant" radius={radius} />
				<ThreeDCarousel
					className="perspective-distant h-full w-full"
					projects={projects}
					radius={radius}
				/>
			</section>
		</div>
	);
}
