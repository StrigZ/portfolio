import { buttonVariants } from "../ui/button";

export default function ContactMe() {
	return (
		<div className="flex h-full flex-col items-center justify-center py-4">
			<h1 className="bold mb-auto font-mono text-5xl tracking-wider">
				CONTACT ME
			</h1>
			<ul className="mb-auto flex flex-col gap-2">
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
