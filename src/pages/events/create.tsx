import { EventType } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";

export default function EventCreatePage() {
  const [name, setname] = useState<string>("");
  const [from, setFrom] = useState<string>(new Date().toDateString());
  const [to, setTo] = useState<string>(new Date().toDateString());
  const [tag, setTag] = useState<EventType>(EventType.AIML);

  const router = useRouter();

  const eventCreateMutation = api.event.create.useMutation();
  const create = async () => {
    await eventCreateMutation.mutateAsync({
      name: name!,
      dateFrom: new Date(from!),
      dateTill: new Date(to!),
      tag: tag!,
    });
    router.push("/events");
  };
  return (
    <div className="flex items-center justify-center p-10">
      <form
        className="flex flex-col items-center justify-center gap-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="mb-10 text-3xl">Submit Event Details</h2>
        <input
          value={name}
          onChange={(e) => setname(e.target.value)}
          type="text"
          placeholder="name"
          className="border-b-2 text-xl"
        />
        <div className="flex gap-10">
          <h3 className="text-lg">Tag</h3>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value as EventType)}
          >
            <option value={EventType.AIML}>aiml</option>
            <option value={EventType.WEB}>web</option>
            <option value={EventType.ANDROID}>android</option>
          </select>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col gap-5">
            <h3 className="text-lg">From</h3>
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              type="date"
            />
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="text-lg">To</h3>
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              type="date"
            />
          </div>
        </div>
        <button
          onClick={create}
          className="rounded bg-indigo-600 py-2 px-5 text-white"
        >
          Create
        </button>
      </form>
    </div>
  );
}
