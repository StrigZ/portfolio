import { Link } from "lucide-react";
import { cn } from "~/lib/utils";
import type { Project as TProject } from "~/payload-types";
import PayloadMedia from "../PayloadMedia";
import { buttonVariants } from "../ui/button";
import ProjectTechList from "./ProjectTechList";

type Props = { project: TProject; className?: string };
export default function Project({ project, className }: Props) {
	return (
		<article
			className={cn(
				"flex select-none flex-col overflow-hidden rounded-lg",
				className,
			)}
		>
			<figure className="relative h-1/2 w-full shrink-0 md:hidden">
				<PayloadMedia
					className="object-cover object-top sm:object-fill sm:object-center"
					hasBlur
					media={project.coverImage}
				/>
				<div className="absolute bottom-0 left-0 w-full bg-black/25 p-4 py-2">
					<h3 className="w-full text-start text-2xl">{project.title}</h3>
				</div>
			</figure>

			<div className="flex h-1/2 flex-col gap-2 p-2 md:h-full xl:gap-4 xl:p-4">
				<h3 className="hidden w-full text-start text-2xl md:inline">
					{project.title}
				</h3>
				<p className="scrollbar-thumb scrollbar-thin mb-auto max-h-full overflow-y-auto text-start text-sm">
					{project.description}
				</p>

				{project.technologies && (
					<ProjectTechList technologies={project.technologies} />
				)}

				<div className="flex w-full justify-between gap-2">
					<a
						className={buttonVariants({
							className:
								"flex flex-1 items-center justify-center gap-2 hover:underline",
						})}
						draggable={false}
						href={project.demo_url}
						rel="noreferrer noopener"
						target="_blank"
					>
						Live <Link size={16} />
					</a>
					<a
						className={buttonVariants({
							variant: "outline",
							className:
								"flex flex-1 items-center justify-center gap-2 hover:underline",
						})}
						draggable={false}
						href={project.source_url}
						rel="noreferrer noopener"
						target="_blank"
					>
						Source <Link size={16} />
					</a>
				</div>
			</div>
		</article>
	);
}
