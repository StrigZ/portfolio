"use client";

import { useMemo, useRef } from "react";
import {
	Carousel,
	type CarouselItem,
	type CarouselRef,
} from "react-round-carousel";
import type { Project } from "~/payload-types";
import ProjectsCarouselItem from "./ProjectsCarouselItem";

type Props = { projects: Project[] };
export default function ProjectsCarousel({ projects }: Props) {
	const carouselRef = useRef<CarouselRef>(null);

	const carouselItems: CarouselItem[] = useMemo(
		() =>
			projects.map((project) => {
				if (typeof project.featuredImage === "number")
					throw new Error("carouselItems: Media is not accessible!");

				const { blurDataUrl, url, alt } = project.featuredImage;

				return {
					image: url ?? blurDataUrl,
					alt,
					content: <ProjectsCarouselItem project={project} />,
				};
			}),
		[projects],
	);

	return (
		<Carousel
			items={carouselItems}
			itemWidth={444}
			ref={carouselRef}
			showControls={false}
			slideOnClick
		/>
	);
}
