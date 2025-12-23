import Link from "next/link";
import type { Locale } from "payload";
import { cn } from "~/lib/utils";

type Props = { locales: Locale[]; activeLocale: "en" | "ru" };
export default function LocaleSwitcher({ locales, activeLocale }: Props) {
	return (
		<ul className="flex items-center overflow-hidden rounded-md md:flex-col">
			{locales.map(({ code }) => (
				<li key={code}>
					<Link
						className={cn(
							"flex aspect-square h-9 w-9 items-center justify-center border bg-background text-center",
							{
								"border-none bg-muted": code === activeLocale,
							},
						)}
						href={`/?locale=${code}`}
					>
						{code}
					</Link>
				</li>
			))}
		</ul>
	);
}
