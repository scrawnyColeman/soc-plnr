// Header.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { links } from "./constants";

type HeaderProps = {};

const Header: React.FunctionComponent<HeaderProps> = ({}) => {
  const router = useRouter();

  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  const isAuthed = status === "authenticated";

  const right = isAuthed ? (
    <div className="flex gap-3">
      <p>
        {session?.user?.name} ({session?.user?.email})
      </p>
      <Link href="/create">
        <button className="hover:text-purple-400">
          <a>New post</a>
        </button>
      </Link>
      <button className="hover:text-purple-500" onClick={() => signOut()}>
        <a>Log out</a>
      </button>
    </div>
  ) : status === "loading" ? (
    <div>loading</div>
  ) : (
    <div className="right">
      <Link href="/api/auth/signin">
        <a data-active={isActive("/signup")}>Log in</a>
      </Link>
    </div>
  );

  return (
    <nav className="w-100 flex justify-between items-center p-3 bg-slate-700 text-violet-100">
      <div className="flex gap-2">
        {links
          .filter((link) => link.authed === isAuthed)
          .map((link) => (
            <Link href={link.path}>
              <a
                className={`hover:text-purple-700 ${
                  isActive(link.path) ? "text-purple-300" : ""
                }`}
                data-active={isActive("/")}
              >
                {link.text}
              </a>
            </Link>
          ))}
      </div>
      {right}
    </nav>
  );
};

export default Header;
