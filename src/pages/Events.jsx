import { useState } from "react";
import Button from "../components/Button";

function Events() {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  // For 3 event boxes
  const [events, setEvents] = useState([
    { date: "", image: null, time: "", location: "", title: "", desc: "" },
    { date: "", image: null, time: "", location: "", title: "", desc: "" },
    { date: "", image: null, time: "", location: "", title: "", desc: "" }
  ]);

  function handleEventChange(index, field, value) {
    const updated = [...events];
    updated[index][field] = value;
    setEvents(updated);
  }

  function saveHeading() {}
  function saveSubHeading() {}
  function saveEvent(index) {}

  const rows = [
    {
      label: "Heading",
      current: <p>{heading || "No heading set"}</p>,
      input: (
        <textarea
          className="w-full h-20 p-2 border rounded resize-none"
          onChange={(e) => setHeading(e.target.value)}
        />
      ),
      button: <Button onClick={saveHeading}>Update</Button>
    },
    {
      label: "Subheading",
      current: <p>{subHeading || "No subheading set"}</p>,
      input: (
        <textarea
          className="w-full h-20 p-2 border rounded resize-none"
          onChange={(e) => setSubHeading(e.target.value)}
        />
      ),
      button: <Button onClick={saveSubHeading}>Update</Button>
    }
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto">

      {/* Heading + Subheading rows */}
      {rows.map((row, index) => (
        <div
          key={index}
          className="grid border p-3 grid-cols-3 gap-6 border-b py-6 items-center"
        >
          <h2 className="font-semibold">{row.label}</h2>
          <div>{row.current}</div>
          <div>
            {row.input}
            {row.button}
          </div>
        </div>
      ))}

      {/* EVENT BOXES */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Event Boxes</h2>

      {events.map((event, index) => (
        <div
          key={index}
          className="border p-6 rounded-xl mb-6 shadow-sm bg-white"
        >
          <h3 className="font-bold text-lg mb-4">
            Event Box {index + 1}
          </h3>

          <div className="grid grid-cols-3 gap-6 items-center py-4 border-b">
            <p className="font-semibold">Date</p>
            <p>{event.date || "Not set"}</p>

            <input
              type="text"
              className="border p-2 rounded"
              onChange={(e) =>
                handleEventChange(index, "date", e.target.value)
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-6 items-center py-4 border-b">
            <p className="font-semibold">Image</p>
            {event.image ? (
              <img
                src={URL.createObjectURL(event.image)}
                className="w-24 h-24 rounded object-cover"
              />
            ) : (
              <p>No image</p>
            )}

            <input
              type="file"
              onChange={(e) =>
                handleEventChange(index, "image", e.target.files[0])
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-6 items-center py-4 border-b">
            <p className="font-semibold">Time</p>
            <p>{event.time || "Not set"}</p>

            <input
              type="text"
              className="border p-2 rounded"
              onChange={(e) =>
                handleEventChange(index, "time", e.target.value)
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-6 items-center py-4 border-b">
            <p className="font-semibold">Location</p>
            <p>{event.location || "Not set"}</p>

            <input
              type="text"
              className="border p-2 rounded"
              onChange={(e) =>
                handleEventChange(index, "location", e.target.value)
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-6 items-center py-4 border-b">
            <p className="font-semibold">Title</p>
            <p>{event.title || "Not set"}</p>

            <input
              type="text"
              className="border p-2 rounded"
              onChange={(e) =>
                handleEventChange(index, "title", e.target.value)
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-6 items-center py-4">
            <p className="font-semibold">Description</p>
            <p>{event.desc || "Not set"}</p>

            <textarea
              className="border p-2 rounded h-20 resize-none"
              onChange={(e) =>
                handleEventChange(index, "desc", e.target.value)
              }
            ></textarea>
          </div>

          <div className="mt-4">
            <Button onClick={() => saveEvent(index)}>Save Event {index + 1}</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Events;
