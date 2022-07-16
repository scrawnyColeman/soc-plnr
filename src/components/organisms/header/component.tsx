import React, { FunctionComponent } from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button, Link, Nav } from "atoms";
import { links } from "./constants";

type HeaderProps = {};

const Header: FunctionComponent<HeaderProps> = ({}) => {
  const router = useRouter();

  const isActive = (pathname: string) => router.pathname === pathname;

  const { data: session, status } = useSession();

  const isAuthed = status === "authenticated";

  const right = isAuthed ? (
    <div className="flex items-center gap-3">
      <p className="invisible md:visible">
        Hey, {(session?.user?.name as string).split(" ")[0]}!
      </p>
      <Button className="p-1" onClick={() => signOut()}>
        <a>Log out</a>
      </Button>
    </div>
  ) : status === "loading" ? (
    <div>loading</div>
  ) : (
    <div className="flex items-center">
      <Button className="p-1" onClick={() => signIn("google")}>
        <a data-active={isActive("/signup")}>Log in</a>
      </Button>
    </div>
  );

  return (
    <Nav>
      <div className="flex gap-4">
        {links
          .filter((link) => link.authed === isAuthed)
          .map(({ path, text }) => (
            <Link key={path} isActive={isActive} href={path} text={text} />
          ))}
      </div>
      {right}
    </Nav>
  );
};

export default Header;
