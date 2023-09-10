import { useState } from "react";
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

export function TheChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ me: boolean; text: string }[]>([
    { me: false, text: "Hello, how can I help you?" },
  ]);
  const [message, setMessage] = useState("");

  return (
    <div className="fixed right-0 bottom-0 p-8">
      {open === true ? (
        <div className="w-screen max-w-sm flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-xl ring-1 ring-gray-900/5">
          <div className="p-4 bg-gray-50 relative">
            <p className="text-gray-900 font-semibold text-center text-lg">
              Let's chat
            </p>

            <button
              type="button"
              className="absolute right-0 inset-y-0 mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-600"
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Close chatbot</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <ul className="h-screen max-h-72 space-y-6 overflow-auto p-4">
            {messages.map((message) => (
              <li
                className={clsx("relative flex gap-x-4", {
                  "flex-row-reverse": message.me === true,
                })}
              >
                <img
                  src={
                    message.me === true
                      ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      : "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  }
                  alt=""
                  className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                />
                <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                  <div className="flex justify-between gap-x-4">
                    <div className="py-0.5 text-xs leading-5 text-gray-500">
                      <span className="font-medium text-gray-900">
                        {message.me === true ? "Me" : "Customer support"}
                      </span>
                    </div>
                    <time
                      dateTime="2023-01-23T15:56"
                      className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                    >
                      now
                    </time>
                  </div>
                  <p className="text-sm leading-6 text-gray-500">
                    {message.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              const normalizedMessage = message.trim();
              if (normalizedMessage.length === 0) {
                setMessage("");
                return;
              }

              setMessages((messages) => [
                ...messages,
                { me: true, text: normalizedMessage },
              ]);
              setMessage("");
            }}
            className="p-4 bg-gray-50 grid grid-cols-[1fr,auto] gap-x-2"
          >
            <input
              type="text"
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="How can I spend my money?"
            />

            <div>
              <button
                type="submit"
                className="rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PaperAirplaneIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          type="button"
          className="rounded-full bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={() => {
            setOpen(true);
          }}
        >
          Let's chat
        </button>
      )}
    </div>
  );
}
