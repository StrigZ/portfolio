import { Link } from "lucide-react";
import Image from "next/image";
import { cn } from "~/lib/utils";
import type { Project } from "~/payload-types";
import { buttonVariants } from "./ui/button";

type Props = { project: Project; className?: string };
export default function ProjectsCarouselItem({ project, className }: Props) {
	return (
		<article
			className={cn("flex h-full w-full flex-col gap-4 px-4 py-2", className)}
		>
			<h3 className="text-start text-2xl">{project.title}</h3>
			<p className="overflow-y-auto text-start text-sm">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae ratione
				nostrum, tempore voluptatibus mollitia ipsa nam? Non at aut, laboriosam
				illo tempore nesciunt aspernatur sapiente qui temporibus ex? Magnam
				dolorem numquam rem modi, qui et nam laboriosam tenetur, nemo
				perferendis quam neque esse nihil ullam, reiciendis tempore id molestias
				harum. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere
				praesentium cumque harum tempora deleniti assumenda quibusdam natus
				autem unde, similique eos distinctio et provident, nemo soluta incidunt,
				numquam perferendis nam facilis nulla dignissimos consequatur eius. Nam
				deleniti, laudantium vero possimus saepe culpa ipsum illo fuga
				temporibus voluptatum quis sunt quo.
			</p>

			<ul className="flex items-center justify-center gap-2">
				{project.technologies?.map((tech) => {
					if (typeof tech.icon === "number") {
						throw new Error("ProjectsCarouselItem: Media is not accessible!");
					}

					return (
						<li
							className="flex flex-col items-center justify-center gap-1 border border-rose-200 p-1"
							key={tech.id}
						>
							<figure className="relative h-8 w-8">
								<Image
									alt={tech.icon.alt}
									fill
									src={tech.icon.url ?? tech.icon.blurDataUrl}
								/>
							</figure>
							{/* Tooltip? Link? */}
							{/* <p>{tech.name}</p> */}
						</li>
					);
				})}
			</ul>

			<div className="mt-auto flex w-full items-center justify-between gap-2">
				<a
					className={buttonVariants({
						className: "flex flex-1 items-center justify-center gap-2",
					})}
					href={project.demo_url}
					rel="noreferrer noopener"
					target="_blank"
				>
					DEMO <Link size={16} />
				</a>
				<a
					className={buttonVariants({
						variant: "outline",
						className: "flex flex-1 items-center justify-center gap-2",
					})}
					href={project.source_url}
					rel="noreferrer noopener"
					target="_blank"
				>
					Source <Link size={16} />
				</a>
			</div>
		</article>
	);
}
