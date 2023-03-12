import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: _, status } = useSession();

  return (
    <div>
      <div>
        {status === "unauthenticated" ? (
          <button onClick={async () => void (await signIn("github"))}>
            login
          </button>
        ) : status === "loading" ? (
          <button>wait while I think</button>
        ) : (
          <button onClick={async () => void (await signOut())}>logout</button>
        )}
      </div>
      <Link href="/events">see all events</Link>
    </div>
  );
};

export default Home;
