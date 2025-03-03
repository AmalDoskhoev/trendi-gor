import type {Metadata} from "next";
import localFont from "next/font/local";
import "./styles/index.scss";
import {Toaster} from "@/shared/ui/toaster";
import {ThemeProvider} from "@/shared/providers";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Trendi gor",
	description: "Одевайтесь стильно, вместе с Trendi gor",
};

export default function RootLayout({
									   children,
								   }: Readonly<{
	children: React.ReactNode;
}>)
{
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
		<body
			className={`${geistSans.variable} ${geistMono.variable} antialiased`}
		>
		<Toaster/>
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			{children}
		</ThemeProvider>
		</body>
		</html>
	);
}
