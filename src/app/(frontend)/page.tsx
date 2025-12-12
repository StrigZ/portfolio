import Image from "next/image";
import { getProjects } from "~/collections/projects/fetchers";
import { ThemeButton } from "./_components/ThemeButton";

export default async function HomePage() {
	const projects = await getProjects();

	return (
		<>
			<ul>
				{projects.map(({ title, id, featuredImage }) => (
					<li key={id}>
						<h1>{title}</h1>
						{!(typeof featuredImage === "number") && (
							<Image
								alt={featuredImage.alt}
								height={300}
								src={featuredImage.url ?? featuredImage.blurDataUrl}
								width={300}
							/>
						)}
					</li>
				))}
			</ul>
			<ThemeButton />
		</>
	);
}
