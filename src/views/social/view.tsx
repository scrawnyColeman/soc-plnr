import React, {
  ChangeEventHandler,
  FormEventHandler,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";

import { useGetFollows, useFollowUser } from "hooks";
import { Card, Button, Spinner } from "atoms";
import { Layout } from "organisms";

import { profilePic } from "assets";
import { LabelledInput } from "molecules/labelledInput";

export type SocialViewProps = {};

const SocialView: FunctionComponent<SocialViewProps> = ({}) => {
  const session = useSession();
  const [email, setEmail] = useState<string>("");

  const [loading, follows, refreshFollows] = useGetFollows();
  const [isFollowing, followUser] = useFollowUser();

  useEffect(() => {
    (async () => {
      if (session !== null) {
        refreshFollows();
      }
    })();
  }, [session]);

  const isLoading = session === null || loading;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (typeof email === "string" && Boolean(email.length)) {
      // TODO - append new user to state instead of refetching
      await followUser({ email });
      await refreshFollows();
    }
    return;
  };

  return (
    <Layout className="p-6 w-full h-100 flex flex-wrap  gap-2">
      <Card className=" w-full flex flex-col gap-2 mt-2">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3>Followers:</h3>
              <div className="flex flex-wrap gap-4">
                {follows.followers.map(({ follower }) => (
                  <span
                    className="flex items-center h-10 gap-2"
                    key={`followedBy-${follower.id}`}
                    title={follower.email}
                  >
                    <img
                      className="rounded-full"
                      width={48}
                      height={48}
                      src={follower.image || profilePic.src}
                    />
                    <p>{follower.name}</p>
                  </span>
                ))}
              </div>
            </div>
            <hr className="my-1" />
            <div className="flex flex-col gap-2">
              <h3>Following</h3>
              <div className="flex flex-wrap gap-4">
                {follows.following.map(({ following }) => (
                  <span
                    className="flex items-center h-10 gap-2"
                    key={`following-${following.id}`}
                    title={following.email}
                  >
                    <img
                      className="rounded-full"
                      width={48}
                      height={48}
                      src={following.image || profilePic.src}
                    />
                    <p>{following.name}</p>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>
      <div className="flex flex-col justify-center items-center gap-3 w-full mt-3">
        <form
          className="w-full flex flex-col items-start gap-3 md:flex-row md:items-end"
          onSubmit={handleSubmit}
        >
          <LabelledInput
            wrapperClassName="w-full md:w-auto"
            value={email}
            placeholder="example@mail.com"
            onChange={handleChange}
            autoFocus
            id="email"
          >
            Enter your friends email to follow and sync up with their day
          </LabelledInput>
          <Button
            className="py-2 w-full md:w-auto"
            type="submit"
            disabled={isFollowing || !email}
            isLoading={isFollowing}
          >
            Follow friend
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default SocialView;
