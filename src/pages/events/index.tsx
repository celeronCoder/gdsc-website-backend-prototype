import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function EventsPage() {
  const { data, error, isLoading } = api.event.getAll.useQuery();
  const { data: user } = useSession();
  const router = useRouter();

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-10 text-indigo-500">
        Wait for a while we are loading...
      </div>
    );

  if (data)
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <h2 className="text-3xl">GDSC Events</h2>
        {user?.user ? (
          <div className="items-right flex w-full justify-end">
            <button
              className="rounded bg-indigo-400 py-2 px-5 text-white"
              onClick={() => router.push("/events/create")}
            >
              Create New Event
            </button>
          </div>
        ) : null}
        <div className="mt-10 flex flex-col items-center justify-around gap-10">
          {data.map((event) => (
            <div className="flex flex-col items-start justify-start gap-1 rounded border-2 border-black py-2 px-4 shadow-md">
              <h2 className="font-serif font-bold capitalize">{event.name}</h2>
              <p className="rounded-full bg-indigo-400 px-2 text-sm">
                {event.tag}
              </p>
              <p>
                {event.dateFrom.toLocaleDateString()} -{" "}
                {event.dateTill.toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center p-10 text-red-400">
        Error 404: Couldn't find the events
      </div>
    );
}
