"use client";

import { useMemo } from "react";
import type { Project } from "~/payload-types";
import ProjectsItem from "./ProjectsItem";
import Carousel, { type CarouselItem } from "./ui/3d-carousel";

type Props = { projects: Project[]; className?: string };
export default function ThreeDCarousel({ projects, className }: Props) {
	const carouselItems: CarouselItem[] = useMemo(
		() =>
			projects.map((project, i) => {
				if (typeof project.featuredImage === "number")
					throw new Error("carouselItems: Media is not accessible!");

				const { blurDataUrl, url, alt } = project.featuredImage;

				return {
					// TODO: use id when done testing
					id: i.toString(),
					image: url ?? blurDataUrl,
					alt,
					content: <ProjectsItem project={project} />,
				};
			}),
		[projects],
	);

	return <Carousel className={className} items={carouselItems} slideOnClick />;
}
