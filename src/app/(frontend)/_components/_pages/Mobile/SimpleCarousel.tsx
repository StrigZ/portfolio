"use client";

import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import type { Project as TProject } from "~/payload-types";
import CarouselNavButtons from "../../CarouselNavButtons";
import Project from "../../Project/Project";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem as CarouselItemWrapper,
} from "../../ui/carousel";

type Props = {
	projects: TProject[];
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
					stopOnInteraction: true,
					stopOnMouseEnter: true,
				}),
			]}
			setApi={setApi}
		>
			<CarouselContent className="ml-0 w-full sm:-ml-2 md:-ml-4">
				{projects.map((project) => (
					<CarouselItemWrapper
						className="w-full pl-0 sm:basis-1/2 sm:pl-4 md:pl-4"
						key={project.id}
					>
						<div className="p-1">
							<Project
								className="h-[500px] shadow-white/50 shadow-xs"
								project={project}
							/>
						</div>
					</CarouselItemWrapper>
				))}
			</CarouselContent>
			<CarouselNavButtons
				onNext={() => api?.scrollNext()}
				onPrev={() => api?.scrollPrev()}
			/>
		</Carousel>
	);
}
