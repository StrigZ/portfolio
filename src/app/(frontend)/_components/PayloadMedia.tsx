import Image from "next/image";
import { cn } from "~/lib/utils";
import type { Media } from "~/payload-types";

type Props = { media: Media | number; className?: string };
export default function PayloadMedia({ media, className }: Props) {
	if (typeof media === "number") {
		throw new Error("PayloadMedia: Media is not accessible!");
	}

	return (
		<Image
			alt={media.alt}
			className={cn("shrink-0", className)}
			fill
			src={media.url ?? media.blurDataUrl}
		/>
	);
}
