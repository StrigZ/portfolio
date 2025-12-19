"use client";

import { cn } from "~/lib/utils";

type Props = { radius: string; className?: string };
export default function RotatingHeading({ radius, className }: Props) {
	return (
		<div className={cn("relative", className)}>
			<div
				className="transform-3d absolute inset-0 w-full"
				style={{
					transform: `translateZ(calc(${radius} * -1))`,
				}}
			>
				<div className="transform-3d absolute inset-0 animate-[rotate_20s_linear_infinite]">
					{[0, 120, 240].map((deg, i) => (
						<h2
							className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 font-bold text-6xl"
							// biome-ignore lint/suspicious/noArrayIndexKey: this array is fixed.
							key={i}
							style={{
								transform: `rotateY(${deg}deg) translateZ(${radius})`,
							}}
						>
							Projects
						</h2>
					))}
				</div>
			</div>
		</div>
	);
}
