"use client"

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
	const router = useRouter();
	const pathname = usePathname();
	const chapters = [16, 17, 18, 19, 20];

	return (
		<nav className="bg-gray-800 p-4">
			<div className="container mx-auto flex space-x-4">
				{chapters.map((num) => (
					<Link key={num} href={`/${num}`} className={`px-4 py-2 rounded-md text-white ${pathname === `/${num}` ? "bg-blue-500" : "hover:bg-gray-700"}`}>
						Chapter {num}
					</Link>
				))}
			</div>
		</nav>
	);
};

export default Navbar;