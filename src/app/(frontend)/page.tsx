import { getProjects } from "~/collections/projects/fetchers";
import ProjectsCarousel from "./_components/ProjectsCarousel";
import { ThemeButton } from "./_components/ThemeButton";

export default async function page() {
	const projects = await getProjects();

	return (
		<>
			<header>
			<ThemeButton />
			</header>
			<main className="flex items-center justify-center">
				<ProjectsCarousel
					projects={[
						...projects,
					]}
				/>
			</main>
		</>
	);
}
