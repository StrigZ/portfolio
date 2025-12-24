"use client";

import { useContentProvider } from "~/app/(frontend)/_providers/content-provider";
import { cn } from "~/lib/utils";
import ContactMe from "../Desktop/ContactMe";
import { SimpleCarousel } from "./SimpleCarousel";

type Props = { className?: string };
export default function MobilePage({ className }: Props) {
	const { headings } = useContentProvider();

	return (
		<div
			className={cn(
				"flex snap-y snap-mandatory flex-col justify-between gap-8 overflow-auto pt-4",
				className,
			)}
		>
			<div className="flex min-h-screen snap-center flex-col items-center justify-center py-4">
				<h2 className="mb-auto text-center font-mono text-4xl tracking-wider sm:text-5xl">
					{headings?.projects.toUpperCase()}
				</h2>
				<SimpleCarousel className="mb-auto" />
			</div>
			<ContactMe className="min-h-screen snap-center" />
		</div>
	);
}
