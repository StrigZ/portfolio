import { Link } from "lucide-react";
import Image from "next/image";
import { cn } from "~/lib/utils";
import type { Project } from "~/payload-types";
import { buttonVariants } from "./ui/button";

type Props = { project: Project; className?: string };
export default function ProjectsItem({ project, className }: Props) {
	if (typeof project.featuredImage === "number") {
		throw new Error("ProjectsItem: Media is not accessible!");
	}

	return (
		<article
			className={cn(
				"flex select-none flex-col overflow-hidden rounded-lg",
				className,
			)}
		>
			<figure className="relative h-1/2 w-full shrink-0 md:hidden">
				<Image
					alt={project.featuredImage.alt}
					className="shrink-0 object-cover object-top sm:object-fill sm:object-center"
					fill
					src={project.featuredImage.url ?? project.featuredImage.blurDataUrl}
				/>
				<div className="absolute bottom-0 left-0 w-full bg-black/25 p-4 py-2">
					<h3 className="w-full text-start text-2xl">{project.title}</h3>
				</div>
			</figure>
			<div className="flex h-1/2 flex-col gap-4 p-4 md:h-full">
				<h3 className="hidden w-full text-start text-2xl md:inline">
					{project.title}
				</h3>
				<p className="scrollbar-thumb scrollbar-thin mb-auto max-h-full overflow-y-auto text-start text-sm">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
					ratione nostrum, tempore voluptatibus mollitia ipsa nam? Non at aut,
					laboriosam illo tempore nesciunt aspernatur sapiente qui temporibus
					ex? Magnam dolorem numquam rem modi, qui et nam laboriosam tenetur,
					nemoLorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem
					ipsum, dolor sit amet consectetur adipisicing elit. Vitae ratione
					nostrum, tempore voluptatibus mollitia ipsa nam? Non at aut,
					laboriosam illo tempore nesciunt aspernatur sapiente qui temporibus
					ex? Magnam dolorem numquam rem modi, qui et nam laboriosam tenetur,
					nemoLorem ipsum, dolor sit amet consectetur adipisicing elit.
				</p>

				<ul className="flex items-center justify-center gap-2">
					{project.technologies?.map((tech) => {
						if (typeof tech.icon === "number") {
							throw new Error("ProjectsItem: Media is not accessible!");
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

				<div className="flex w-full justify-between gap-2">
					<a
						className={buttonVariants({
							className:
								"flex flex-1 items-center justify-center gap-2 hover:underline",
						})}
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
