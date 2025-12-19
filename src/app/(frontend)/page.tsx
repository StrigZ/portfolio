import { getProjects } from "~/collections/projects/fetchers";
import DesktopPage from "./_components/Desktop/DesktopPage";
import Projects from "./_components/Projects";
import { ThemeButton } from "./_components/ThemeButton";

export default async function page() {
	const projects = await getProjects();

	return (
		<>
			<header className="fixed top-0 left-0">
				<ThemeButton />
			</header>
			<main className="relative flex h-full flex-col items-center justify-center">
				<DesktopPage
					className="hidden md:block"
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
					]}
				/>
				{/* <Projects /> */}
			</main>
		</>
	);
}
