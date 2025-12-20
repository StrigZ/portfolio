import { getProjects } from "~/collections/projects/fetchers";
import DesktopPage from "./_components/_pages/Desktop/DesktopPage";
import MobilePage from "./_components/_pages/Mobile/MobilePage";

export default async function page() {
	const projects = await getProjects();

	return (
		<>
			<header className="fixed top-0 left-0"></header>
			<main className="relative h-full">
				<DesktopPage
					className="mx-auto hidden max-w-5xl md:block"
					projects={projects}
				/>
				<MobilePage className="h-full w-full md:hidden" projects={projects} />
			</main>
		</>
	);
}
