import React, { FunctionComponent, ReactNode, useEffect } from "react";

import router from "next/router";
import { useSession } from "next-auth/react";

import { Spinner } from "atoms";
import { PathNames } from "src/constants";
import { Forbidden } from "src/components/organisms";

type RedirectorProps = {
  redirectPath: keyof typeof PathNames;
};

type ErrorScreenProps = {
  fallbackView?: ReactNode;
};

export type AuthWrapperProps = XOR<RedirectorProps, ErrorScreenProps> & {
  children: ReactNode;
};

const AuthWrapper: FunctionComponent<AuthWrapperProps> = ({
  redirectPath,
  fallbackView,
  children,
}) => {
  const { status } = useSession();

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
      if (Boolean(fallbackView)) {
        return <>{fallbackView}</>;
      }
      return <Forbidden />;
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
