import "./_styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "./_providers/theme-provider";

export const metadata: Metadata = {
	title: "StrigZ's Portfolio",
	description: "Collection of my works.",
	icons: [
		icon: [
			{ rel: "icon", url: "/favicon.ico" },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },	     
		],
		apple: [
			{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
		],
	],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html className={`${geist.variable}`} lang="en" suppressHydrationWarning>
			<body className="h-screen px-1 sm:px-2 md:overflow-hidden md:px-4">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					disableTransitionOnChange
					enableSystem
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
