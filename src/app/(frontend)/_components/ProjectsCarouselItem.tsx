import { cn } from "~/lib/utils";
import type { Project } from "~/payload-types";

type Props = { project: Project; className?: string };
export default function ProjectsCarouselItem({ project, className }: Props) {
	return (
		<div className={cn("border border-purple-600 p-1", className)}>
			{project.title}
		</div>
	);
}
