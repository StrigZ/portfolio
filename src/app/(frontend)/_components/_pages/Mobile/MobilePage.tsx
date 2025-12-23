"use client";

import { useContentProvider } from "~/app/(frontend)/_providers/content-provider";
import { cn } from "~/lib/utils";
import ContactMe from "../Desktop/ContactMe";
import { SimpleCarousel } from "./SimpleCarousel";

type Props = { className?: string };
export default function MobilePage({ className }: Props) {
	const { headings } = useContentProvider();

	return (
		<div className={cn("flex flex-col justify-between gap-8 pt-4", className)}>
			<div className="flex min-h-screen flex-col items-center justify-center gap-4">
				<h2 className="text-center font-mono text-4xl tracking-wider sm:text-5xl">
					{headings?.projects.toUpperCase()}
				</h2>
				<SimpleCarousel />
			</div>
			<ContactMe className="min-h-screen" />
		</div>
	);
}
