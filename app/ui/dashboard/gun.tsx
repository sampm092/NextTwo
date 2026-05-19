import Link from "next/link";
import clsx from "clsx";

interface Gun {
  label: string;
  href: string;
}

export default function GunComponent({ guns }: { guns: Gun[] }) {
  return (
    <div>
      <h1>
        {guns.map((gun, index) => (
          <li key={gun.href}>
            <Link href={gun.href}>{gun.label}</Link>
            {index < guns.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </h1>
    </div>
  );
}
