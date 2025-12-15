import Autoplay from "embla-carousel-autoplay";

import { cn } from "~/lib/utils";
import type { Project } from "~/payload-types";
import ProjectsCarouselItem from "./ProjectsCarouselItem";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";

type Props = {
	projects: Project[];
	className?: string;
};
export function SimpleCarousel({ projects, className }: Props) {
	return (
		<Carousel
			className={cn("w-full", className)}
			opts={{
				align: "start",
				loop: true,
			}}
			plugins={[
				Autoplay({
					delay: 5000,
				}),
			]}
		>
			<CarouselContent className="-ml-4">
				{projects.map((project) => (
					<CarouselItem
						className="pl-4 sm:basis-1/2"
						key={project.id + Math.random()}
					>
						<div className="p-1">
							<ProjectsCarouselItem
								className="border border-red-400"
								project={project}
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
