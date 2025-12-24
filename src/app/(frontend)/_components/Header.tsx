import payloadConfig from "~/payload.config";
import LocaleSwitcher from "./LocaleSwitcher";
import { ThemeButton } from "./ThemeButton";

type Props = { locale?: "en" | "ru" };
export default async function Header({ locale }: Props) {
	const { localization } = await payloadConfig;

	return (
		<header className="absolute inset-x-0 top-0 z-50 flex justify-between gap-4 p-2 md:fixed md:inset-x-auto md:left-0 md:flex-col md:justify-start">
			<ThemeButton />
			{localization && (
				<LocaleSwitcher
					activeLocale={locale ?? "ru"}
					locales={localization.locales}
				/>
			)}
		</header>
	);
}
