"use client";

import Image from "next/image";
import { useMemo } from "react";
import { v4 as uuid } from "uuid";
import { cn } from "~/lib/utils";
import type { Project } from "~/payload-types";
import use3DCarousel from "../../_hooks/use-3d-carousel";
import CarouselNavButtons from "../CarouselNavButtons";
import ProjectsItem from "../ProjectsItem";
export type Props = {
	projects: Project[];
	radius: string;
	className?: string;
};

export default function ThreeDCarousel({ projects, className, radius }: Props) {
	const {
		handlers,
		selectedIndex,
		getContainerStyle,
		getSlideStyle,
		next,
		prev,
		normalizeIndex,
		updateSelectedIndex,
		updateRotationIndex,
	} = use3DCarousel({
		totalSlides: projects.length,
		radius,
	});

	// TODO: remove random when done testing
	const carouselItems = useMemo(
		() => projects.map((project) => ({ ...project, id: uuid() })),
		[projects],
	);

	return (
		<div
			className={cn(
				"relative flex touch-none select-none flex-col gap-4",
				className,
			)}
		>
			<div
				className="transform-3d pointer-events-none absolute inset-x-0 top-0"
				{...handlers}
			>
				<ul
					className="transform-3d pointer-events-none absolute inset-x-0 top-0 transition-transform duration-1000"
					style={getContainerStyle()}
				>
					{carouselItems.map((project, index) => {
						if (typeof project.featuredImage === "number")
							throw new Error("carouselItems: Media is not accessible!");

						const { blurDataUrl, url, alt } = project.featuredImage;
						return (
							// biome-ignore lint/a11y/useKeyWithClickEvents: I don't see a way to implement this logic with keyboard
							<li
								className={cn(
									"group pointer-events-auto absolute aspect-4/3 overflow-hidden rounded-md border-2 border-white shadow-aa transition-transform duration-1000",
									{
										"cursor-pointer": index !== selectedIndex,
									},
								)}
								key={project.id}
								onClick={() => {
									updateRotationIndex(index);
									updateSelectedIndex(index);
								}}
								style={{
									...getSlideStyle(index),
									left: "calc(50% - (var(--slide-width) / 2))",
									width: "var(--slide-width)",
								}}
							>
								<Image
									alt={alt ?? ""}
									draggable={false}
									fill
									src={url ?? blurDataUrl}
								/>

								<div
									className={cn(
										"absolute inset-0 select-none bg-black/70 text-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100",
										{
											"pointer-events-none **:overflow-hidden": ![
												normalizeIndex(selectedIndex - 1),
												selectedIndex,
												normalizeIndex(selectedIndex + 1),
											].includes(index),
										},
									)}
								>
									<ProjectsItem className="h-full" project={project} />,
								</div>
							</li>
						);
					})}
				</ul>
			</div>
			<CarouselNavButtons
				className="pointer-events-none absolute inset-x-0 bottom-2 w-full justify-between gap-6"
				onNext={next}
				onPrev={prev}
			/>
		</div>
	);
}
