import type { Project } from "~/payload-types";
import ProjectsCarouselItem from "./ProjectsCarouselItem";
import {
	Carousel,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";

type Props = { projects: Project[] };
export default function ProjectsCarousel({ projects }: Props) {
	return (
		<Carousel>
			<CarouselContent>
				{projects.map((project) => (
					<ProjectsCarouselItem key={project.id} project={project} />
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
