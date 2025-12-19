import { MoveLeft, MoveRight } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";

type Props = {
	onNext: () => void;
	onPrev: () => void;
	className?: string;
};
export default function CarouselNavButtons({
	onNext,
	onPrev,
	className,
}: Props) {
	return (
		<div className={cn("flex items-center justify-center gap-4", className)}>
			<Button
				className="pointer-events-auto cursor-pointer"
				onClick={onPrev}
				variant="ghost"
			>
				<MoveLeft /> Prev
			</Button>
			<Button
				className="pointer-events-auto cursor-pointer"
				onClick={onNext}
				variant="ghost"
			>
				Next <MoveRight />
			</Button>
		</div>
	);
}
