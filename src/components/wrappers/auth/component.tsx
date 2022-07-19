import React, { FunctionComponent, ReactNode, useEffect } from "react";

import router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { Spinner } from "atoms";
import { Forbidden } from "organisms";
import { PageVisibility, PathNames } from "src/constants";

type RedirectorProps = {
  redirectPath: keyof typeof PathNames;
};

type ErrorScreenProps = {
  blurredView?: ReactNode;
};

export type AuthWrapperProps = XOR<RedirectorProps, ErrorScreenProps> & {
  children: ReactNode;
};

const AuthWrapper: FunctionComponent<AuthWrapperProps> = ({
  redirectPath,
  blurredView,
  children,
}) => {
  const { status } = useSession();
  const { pathname } = useRouter();

  const visibility = PageVisibility[pathname as keyof typeof PathNames];

  useEffect(() => {
    if (typeof redirectPath === "string") {
      router.push(PathNames[redirectPath]);
    }
  }, [redirectPath]);

  switch (status) {
    case "authenticated": {
      return <>{children}</>;
    }
    case "unauthenticated": {
      if (visibility === "BLURRED") {
        return blurredView ? (
          <>{blurredView}</>
        ) : (
          <div>Building in progress</div>
        );
      } else if (visibility === "PUBLIC") {
        return <>{children}</>;
      } else {
        return <Forbidden />;
      }
    }
    case "loading": {
      return (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <Spinner />
        </div>
      );
    }
  }
};
export default AuthWrapper;
