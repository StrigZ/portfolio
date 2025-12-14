import { getProjects } from "~/collections/projects/fetchers";
import ProjectsCarousel from "./_components/ProjectsCarousel";
import { ThemeButton } from "./_components/ThemeButton";

export default async function page() {
	const projects = await getProjects();

	return (
		<>
			<ProjectsCarousel projects={projects} />
			<ThemeButton />
		</>
	);
}
