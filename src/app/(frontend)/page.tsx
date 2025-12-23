import { getContacts } from "~/collections/Contacts/fetchers";
import { getHeadings } from "~/collections/Headings/fetchers";
import { getProjects } from "~/collections/projects/fetchers";
import DesktopPage from "./_components/_pages/Desktop/DesktopPage";
import MobilePage from "./_components/_pages/Mobile/MobilePage";
import Header from "./_components/Header";
import { ContentProvider } from "./_providers/content-provider";

export default async function page({
	searchParams,
}: {
	searchParams: Promise<{ locale?: "en" | "ru" }>;
}) {
	const { locale } = await searchParams;

	const [projects, headings, contacts] = await Promise.all([
		getProjects({ locale }),
		getHeadings({ locale }),
		getContacts({ locale }),
	]);
	return (
		<ContentProvider data={{ contacts, headings, projects }}>
			<Header locale={locale} />
			<main className="relative h-full">
				<DesktopPage className="mx-auto hidden max-w-5xl md:block" />
				<MobilePage className="h-full w-full md:hidden" />
			</main>
		</ContentProvider>
	);
}
