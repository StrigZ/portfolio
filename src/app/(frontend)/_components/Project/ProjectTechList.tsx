import type { Project } from "~/payload-types";
import PayloadMedia from "../PayloadMedia";

type Props = { technologies: Project["technologies"] };
export default function ProjectTechList({ technologies }: Props) {
	return (
		technologies && (
			<ul className="flex items-center justify-center gap-2">
				{technologies.map((tech) => (
					<li
						className="flex flex-col items-center justify-center gap-1 border border-rose-200 p-1"
						key={tech.id}
					>
						<figure className="relative h-8 w-8">
							<PayloadMedia media={tech.icon} />
						</figure>
						{/* Tooltip? Link? */}
						{/* <p>{tech.name}</p> */}
					</li>
				))}
			</ul>
		)
	);
}
