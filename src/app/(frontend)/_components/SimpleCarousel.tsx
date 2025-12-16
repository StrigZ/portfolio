"use client";

import Autoplay from "embla-carousel-autoplay";
import { MoveLeft, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import type { Project } from "~/payload-types";
import ProjectsCarouselItem from "./ProjectsCarouselItem";
import { Button } from "./ui/button";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem as CarouselItemWrapper,
} from "./ui/carousel";

type Props = {
	projects: Project[];
	className?: string;
};
export function SimpleCarousel({ projects, className }: Props) {
	const [api, setApi] = useState<CarouselApi>();

	useEffect(() => {
		if (!api) {
			return;
		}
	}, [api]);

	return (
		<Carousel
			className={cn("flex w-full flex-col gap-4", className)}
			opts={{
				align: "start",
				loop: true,
			}}
			plugins={[
				Autoplay({
					delay: 5000,
				}),
			]}
			setApi={setApi}
		>
			<CarouselContent className="sm:-ml-2 md:-ml-4 -ml-1 w-full">
				{projects.map((project) => (
					<CarouselItemWrapper
						className="w-full pl-1 sm:basis-1/2 sm:pl-4 md:pl-4"
						// TODO: remove Math.random() when done testing
						key={project.id + Math.random()}
					>
						<div className="p-1">
							<ProjectsCarouselItem project={project} />
						</div>
					</CarouselItemWrapper>
				))}
			</CarouselContent>
			<div className="flex items-center justify-center gap-4">
				<Button
					className="cursor-pointer"
					onClick={() => api?.scrollPrev()}
					variant="ghost"
				>
					<MoveLeft /> Prev
				</Button>
				<Button
					className="cursor-pointer"
					onClick={() => api?.scrollNext()}
					variant="ghost"
				>
					Next <MoveRight />{" "}
				</Button>
			</div>
		</Carousel>
	);
}
