"use client";

import { useContentProvider } from "~/app/(frontend)/_providers/content-provider";
import { cn } from "~/lib/utils";
// import PayloadMedia from "../../PayloadMedia";
import { buttonVariants } from "../../ui/button";

type Props = { className?: string };
export default function ContactMe({ className }: Props) {
	const { contacts, headings } = useContentProvider();
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center py-4",
				className,
			)}
		>
			<h1 className="bold mb-auto font-mono text-4xl tracking-wider sm:text-5xl">
				{headings?.contactMe.toUpperCase()}
			</h1>
			<ul className="mb-auto flex flex-col gap-2 text-center">
				{contacts.map(({ id, name, icon, link }) => (
					<li key={id}>
						<a
							className={buttonVariants({
								variant: "link",
								className:
									"justify-start! flex items-center gap-1 p-0! text-lg!",
							})}
							href={link}
							rel="noreferrer noopener"
							target="_blank"
						>
							{/* <div className="relative h-8 w-8">
								<PayloadMedia media={icon} />
							</div> */}
							{name}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
