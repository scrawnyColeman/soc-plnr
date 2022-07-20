import React, { FunctionComponent } from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

import { Button, Link, Nav } from "atoms";
import { links } from "./constants";

type HeaderProps = {};

const Header: FunctionComponent<HeaderProps> = ({}) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const isActive = (pathname: string) => router.pathname === pathname;

  const isLoading = status === "loading";
  const isAuthed = status === "authenticated";

  const right = isAuthed ? (
    <>
      <p className="invisible md:visible md:mr-0">
        Hey, {(session?.user?.name as string).split(" ")[0]}!
      </p>
      <Button size="SM" onClick={() => signOut()}>
        <a>
          <FaSignOutAlt />
        </a>
      </Button>
    </>
  ) : isLoading ? (
    <div>loading</div>
  ) : (
    <Button size="SM" onClick={() => signIn("google")}>
      <a>
        <FaSignInAlt />
      </a>
    </Button>
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
      <div className="flex items-center gap-2">{right}</div>
    </Nav>
  );
};

export default Header;
