import Image, { type ImageProps } from "next/image";
import { cn } from "~/lib/utils";
import type { Media } from "~/payload-types";

type Props = { media: Media | number; className?: string; hasBlur?: boolean };
export default function PayloadMedia({ media, className, hasBlur }: Props) {
	if (typeof media === "number") {
		throw new Error("PayloadMedia: Media is not accessible!");
	}

	if (!media.url) {
		throw new Error("PayloadMedia: url is missing!");
	}

	if (hasBlur && !media.blurDataUrl) {
		throw new Error("PayloadMedia: blurDataUrl is missing!");
	}

	const blurProps: Partial<ImageProps> | undefined =
		hasBlur && media.blurDataUrl
			? {
					placeholder: "blur",
					blurDataURL: media.blurDataUrl,
				}
			: undefined;

	return (
		<Image
			alt={media.alt}
			className={cn("shrink-0", className)}
			draggable={false}
			fill
			src={media.url}
			{...blurProps}
		/>
	);
}
