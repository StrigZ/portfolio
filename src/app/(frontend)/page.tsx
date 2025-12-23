import { getProjects } from "~/collections/projects/fetchers";
import DesktopPage from "./_components/_pages/Desktop/DesktopPage";
import MobilePage from "./_components/_pages/Mobile/MobilePage";
import Header from "./_components/Header";

export default async function page({
	searchParams,
}: {
	searchParams: Promise<{ locale?: "en" | "ru" }>;
}) {
	const { locale } = await searchParams;
	const projects = await getProjects({ locale });

	return (
		<>
			<Header locale={locale} />
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
