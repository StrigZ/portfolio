"use client";

import { useMemo, useRef } from "react";
import type { Project } from "~/payload-types";
import ProjectsItem from "./ProjectsItem";
import Carousel, {
	type CarouselItem,
	type CarouselRef,
} from "./ui/3d-carousel";

type Props = { projects: Project[]; className?: string };
export default function ThreeDCarousel({ projects, className }: Props) {
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
					content: <ProjectsItem project={project} />,
				};
			}),
		[projects],
	);
	return (
		<Carousel
			className={className}
			items={carouselItems}
			itemWidth={450}
			ref={carouselRef}
			slideOnClick
		/>
	);
}
