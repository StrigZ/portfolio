import { cn } from "~/lib/utils";
import { buttonVariants } from "../../ui/button";

type Props = { className?: string };
export default function ContactMe({ className }: Props) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center py-4",
				className,
			)}
		>
			<h1 className="bold mb-auto font-mono text-4xl tracking-wider sm:text-5xl">
				CONTACT ME
			</h1>
			<ul className="mb-auto flex flex-col gap-2 text-center">
				<li>
					<a
						className={buttonVariants({
							variant: "link",
							className: "text-lg!",
						})}
						href="mailto:i@strigz.dev"
						rel="noreferrer noopener"
						target="_blank"
					>
						i@strigz.dev
					</a>
				</li>
				<li>
					<a
						className={buttonVariants({
							variant: "link",
							className: "text-lg!",
						})}
						href="https://github.com/StrigZ"
						rel="noreferrer noopener"
						target="_blank"
					>
						GitHub
					</a>
				</li>
			</ul>
		</div>
	);
}
