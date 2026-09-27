"use client";

import { useActionState, useEffect, useState } from "react";
import { submitRsvp, type RsvpState } from "./actions";
import { guests } from "./content";

const initialState: RsvpState = { status: "idle", message: "" };

export function RsvpForm() {
  const [state, formAction, pending] = useActionState(submitRsvp, initialState);
  const [sending, setSending] = useState(false);
  const busy = sending || pending;

  useEffect(() => {
    if (state.status === "error") setSending(false);
  }, [state]);

  if (state.status === "success") {
    return <p className="text-lg leading-8">{state.message}</p>;
  }

  return (
    <form
      action={formAction}
      onSubmit={() => setSending(true)}
      className="space-y-6 text-left text-lg"
      aria-busy={busy}
    >
      <fieldset disabled={busy} className="space-y-6 disabled:opacity-60">
        <label className="block">
          <span className="mb-2 block">Your name</span>
          <select
            name="name"
            required
            defaultValue=""
            className="w-full border border-current bg-transparent px-3 py-2"
          >
            <option value="" disabled>
              Choose your name
            </option>
            {guests.map((guest) => (
              <option key={guest} value={guest}>
                {guest}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="space-y-2">
          <legend>Evening dinner</legend>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input type="radio" name="dinner" value="yes" required />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="dinner" value="no" />
              No
            </label>
          </div>
        </fieldset>

        <fieldset className="space-y-2">
          <legend>Ceremony</legend>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input type="radio" name="ceremony" value="yes" required />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="ceremony" value="no" />
              No
            </label>
          </div>
        </fieldset>
      </fieldset>

      {state.status === "error" && !busy ? (
        <p role="alert" className="leading-8">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="border border-current px-5 py-2 disabled:opacity-60"
      >
        Send reply
      </button>
      {busy ? (
        <p aria-live="polite" className="leading-8">
          Sending your reply…
        </p>
      ) : null}
    </form>
  );
}
