import type { Project } from "~/payload-types";
import { CarouselItem } from "./ui/carousel";

type Props = { project: Project };
export default function ProjectsCarouselItem({ project }: Props) {
	return <CarouselItem>{project.id}</CarouselItem>;
}
