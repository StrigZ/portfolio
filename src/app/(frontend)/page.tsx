import { getProjects } from "~/collections/projects/fetchers";
import DesktopPage from "./_components/_pages/Desktop/DesktopPage";
import MobilePage from "./_components/_pages/Mobile/MobilePage";
import { ThemeButton } from "./_components/ThemeButton";

export default async function page() {
	const projects = await getProjects();

	return (
		<>
			<header className="fixed inset-x-0 top-0 z-50 p-2 md:inset-x-auto md:inset-y-0 md:left-0">
				<ThemeButton />
			</header>
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
