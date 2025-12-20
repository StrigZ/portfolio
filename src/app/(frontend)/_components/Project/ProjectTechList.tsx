import { cn } from "~/lib/utils";
import type { Project, Technology } from "~/payload-types";
import PayloadMedia from "../PayloadMedia";

type Props = { technologies?: Project["technologies"] };
export default function ProjectTechList({ technologies }: Props) {
	return (
		technologies && (
			<ul className="flex items-center justify-center gap-2">
				{technologies.map(({ id, technology }) => (
					<ProjectTechItem key={id} technology={technology} />
				))}
			</ul>
		)
	);
}

function ProjectTechItem({ technology }: { technology: Technology | number }) {
	if (typeof technology === "number") {
		throw new Error("ProjectTechItem: Technology is not accessible!");
	}

	return (
		<li className="flex flex-col items-center justify-center">
			<figure
				className={cn("relative h-8 w-8 overflow-hidden", {
					"rounded-full bg-white": technology.name === "NextJS",
				})}
			>
				<PayloadMedia media={technology.icon} />
			</figure>
			{/* Tooltip? Link? */}
			{/* <p>{tech.name}</p> */}
		</li>
	);
}
