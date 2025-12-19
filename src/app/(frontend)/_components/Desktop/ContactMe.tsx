import { buttonVariants } from "../ui/button";

type Props = {};
export default function ContactMe({}: Props) {
	return (
		<div className="flex h-full flex-col items-center justify-center py-4">
			<h1 className="bold mb-auto font-mono text-5xl tracking-wider">
				CONTACT ME
			</h1>
			<a
				className={buttonVariants({
					variant: "link",
					className: "mb-auto text-xl",
				})}
				href="mailto:i@strigz.dev"
			>
				i@strigz.dev
			</a>
		</div>
	);
}
