import { cn } from "~/lib/utils";
import type { Project } from "~/payload-types";
import ContactMe from "../Desktop/ContactMe";
import { SimpleCarousel } from "./SimpleCarousel";

type Props = { projects: Project[]; className?: string };
export default function MobilePage({ projects, className }: Props) {
	return (
		<div className={cn("flex flex-col justify-between gap-8 pt-4", className)}>
			<div className="flex min-h-screen flex-col items-center justify-center gap-4">
				<h2 className="text-center font-mono text-4xl tracking-wider sm:text-5xl">
					PROJECTS
				</h2>
				<SimpleCarousel projects={projects} />
			</div>
			<ContactMe className="min-h-screen" />
		</div>
	);
}
