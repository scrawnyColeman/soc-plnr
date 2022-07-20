import React, {
  ChangeEventHandler,
  FormEventHandler,
  FunctionComponent,
  useEffect,
  useState,
} from "react";

import { useGetFollows, useFollowUser } from "hooks";
import { Card, Button, Spinner, Preview } from "atoms";
import { LabelledInput } from "molecules";
import { profilePic } from "assets";

export type SocialViewProps = {};

const SocialView: FunctionComponent<SocialViewProps> = ({}) => {
  const [email, setEmail] = useState<string>("");

  const [isFollowsLoading, follows, refreshFollows] = useGetFollows();
  const [isFollowingLoading, followUser] = useFollowUser();

  useEffect(() => {
    (async () => {
      refreshFollows();
    })();
  }, []);

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

  return isFollowsLoading ? (
    <Spinner />
  ) : (
    <>
      <Card className="h-72 overflow-y-auto w-full flex flex-col gap-2 md:w-[calc(50%-0.25rem)]">
        <h3 className="text-lg font-semibold">Followers:</h3>
        {Array.isArray(follows.followers) ? (
          follows.followers.map(({ follower }) => (
            <Preview
              identifier={follower.id}
              pathname="SOCIAL"
              title={follower.name}
              imagePath={profilePic.src}
            />
          ))
        ) : (
          <p className="">
            Looking a bit bare here. Why not create your first task?
          </p>
        )}
      </Card>
      <Card className="h-72 overflow-y-auto w-full flex flex-col gap-2 md:w-[calc(50%-0.25rem)]">
        <h3 className="text-lg font-semibold">Following:</h3>
        {Array.isArray(follows.following) ? (
          follows.following.map(({ following }) => (
            <Preview
              identifier={following.id}
              pathname="SOCIAL"
              title={following.name}
              imagePath={profilePic.src}
            />
          ))
        ) : (
          <p className="">
            Looking a bit bare here. Why not create your first task?
          </p>
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
            disabled={isFollowingLoading || !email}
            isLoading={isFollowingLoading}
          >
            Follow friend
          </Button>
        </form>
      </div>
    </>
  );
};

export default SocialView;
