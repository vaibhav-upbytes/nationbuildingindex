import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/data/", label: "Data" },
  { href: "/methodology/", label: "Methodology" },
  { href: "/sources/", label: "Sources" },
];

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-lg font-semibold text-slate-950">
          NamoVsMMS
        </Link>
        <div className="flex flex-wrap gap-2 text-sm font-medium text-slate-700">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 hover:bg-slate-100 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
