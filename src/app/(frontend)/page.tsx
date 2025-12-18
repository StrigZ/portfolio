import { getProjects } from "~/collections/projects/fetchers";
import Projects from "./_components/Projects";
import { ThemeButton } from "./_components/ThemeButton";

export default async function page() {
	const projects = await getProjects();

	return (
		<>
			<header>
				<ThemeButton />
			</header>
			<main className="flex items-center justify-center">
				<Projects
					projects={[
						...projects,
						...projects,
						...projects,
						...projects,
						...projects,
						...projects,
						...projects,
						...projects,
						...projects,
						...projects,
						...projects,
					]}
				/>
			</main>
		</>
	);
}
