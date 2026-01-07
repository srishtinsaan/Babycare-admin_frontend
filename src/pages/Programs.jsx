import { useState, useEffect } from "react";
import Button from "../components/Button";

const EMPTY_PROGRAM = {
  _id: null,
  title: "",
  description: "",
  price: "",
  seats: "",
  lessons: "",
  hours: "",
  teacher_name: "",
  imageFile: null,
  teacherImgFile: null,
  imageUrl: "",
  teacherImg: ""
};

export default function Programs() {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [programs, setPrograms] = useState([
    { ...EMPTY_PROGRAM },
    { ...EMPTY_PROGRAM },
    { ...EMPTY_PROGRAM }
  ]);

  // ================= LOAD DATA =================
  useEffect(() => {
    async function loadPrograms() {
      try {
        const res = await fetch(
          "https://babycare-admin-backend-ulfg.onrender.com/programs"
        );
        const data = await res.json();

        if (data.success) {
          setHeading(data.data.heading || "");
          setSubHeading(data.data.subHeading || "");

          const apiPrograms = data.data.programs || [];

          if (apiPrograms.length === 0) {
            setPrograms([
              { ...EMPTY_PROGRAM },
              { ...EMPTY_PROGRAM },
              { ...EMPTY_PROGRAM }
            ]);
          } else {
            setPrograms(apiPrograms);
          }
        }
      } catch (err) {
        console.log("Load error:", err);
      }
    }

    loadPrograms();
  }, []);

  // ================= UPDATE HEADING =================
  const updateHeading = async () => {
    if (!heading.trim()) return alert("Heading required");

    const res = await fetch(
      "https://babycare-admin-backend-ulfg.onrender.com/programs/heading",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heading })
      }
    );

    const data = await res.json();
    if (data.success) alert("Heading updated");
  };

  // ================= UPDATE SUBHEADING =================
  const updateSubHeading = async () => {
    if (!subHeading.trim()) return alert("SubHeading required");

    const res = await fetch(
      "https://babycare-admin-backend-ulfg.onrender.com/programs/subheading",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subHeading })
      }
    );

    const data = await res.json();
    if (data.success) alert("SubHeading updated");
  };

  // ================= ADD / UPDATE PROGRAM =================
  const saveProgram = async (index) => {
    const p = programs[index];

    if (!p.title.trim()) {
      alert("Title is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", p.title);
    formData.append("description", p.description);
    formData.append("price", p.price);
    formData.append("seats", p.seats);
    formData.append("lessons", p.lessons);
    formData.append("hours", p.hours);
    formData.append("teacher_name", p.teacher_name);

    if (p.imageFile) formData.append("image", p.imageFile);
    if (p.teacherImgFile) formData.append("teacherImg", p.teacherImgFile);

    const url = p._id
      ? `https://babycare-admin-backend-ulfg.onrender.com/programs/item/${p._id}`
      : `https://babycare-admin-backend-ulfg.onrender.com/programs/item`;

    const method = p._id ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      body: formData
    });

    const data = await res.json();

    if (data.success) {
      alert(p._id ? "Program updated" : "Program added");
      window.location.reload();
    } else {
      alert(data.message || "Something went wrong");
    }
  };

  // ================= UI =================
  return (
    <div className="p-3">
      <table className="w-full border border-gray-300 border-collapse">
        <thead>
          <tr>
            <th className="border p-3">#</th>
            <th className="border p-3">Field</th>
            <th className="border p-3">Data</th>
            <th className="border p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {/* HEADING */}
          <tr>
            <td className="border p-3">1</td>
            <td className="border p-3">Heading</td>
            <td className="border p-3">
              <textarea
                className="w-full border p-2"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
            </td>
            <td className="border p-3">
              <Button onClick={updateHeading}>Update</Button>
            </td>
          </tr>

          {/* SUBHEADING */}
          <tr>
            <td className="border p-3">2</td>
            <td className="border p-3">Sub Heading</td>
            <td className="border p-3">
              <textarea
                className="w-full border p-2"
                value={subHeading}
                onChange={(e) => setSubHeading(e.target.value)}
              />
            </td>
            <td className="border p-3">
              <Button onClick={updateSubHeading}>Update</Button>
            </td>
          </tr>

          {/* PROGRAMS */}
          {programs.map((p, i) => (
            <tr key={i}>
              <td className="border p-3">{i + 3}</td>
              <td className="border p-3">Program {i + 1}</td>

              <td className="border p-3 space-y-1">
                <input className="w-full border p-1" placeholder="Title" value={p.title}
                  onChange={e => {
                    setPrograms(prev =>
  prev.map((item, idx) =>
    idx === i ? { ...item, title: e.target.value } : item
  )
);

                  }} />

                <textarea className="w-full border p-1" placeholder="Description" value={p.description}
                  onChange={e => {
                    setPrograms(prev =>
  prev.map((item, idx) =>
    idx === i ? { ...item, description: e.target.value } : item
  )
);
                  }} />

                <input className="w-full border p-1" placeholder="Price" value={p.price}
                  onChange={e => {
                    setPrograms(prev =>
  prev.map((item, idx) =>
    idx === i ? { ...item, price: e.target.value } : item
  )
);
                  }} />

                <input className="w-full border p-1" placeholder="Seats" value={p.seats}
                  onChange={e => {
                    setPrograms(prev =>
  prev.map((item, idx) =>
    idx === i ? { ...item, seats: e.target.value } : item
  )
);
                  }} />

                <input className="w-full border p-1" placeholder="Lessons" value={p.lessons}
                  onChange={e => {
                    setPrograms(prev =>
  prev.map((item, idx) =>
    idx === i ? { ...item, lessons: e.target.value } : item
  )
);
                  }} />

                <input className="w-full border p-1" placeholder="Hours" value={p.hours}
                  onChange={e => {
setPrograms(prev =>
  prev.map((item, idx) =>
    idx === i ? { ...item, hours: e.target.value } : item
  )
);                  }} />

                <input className="w-full border p-1" placeholder="Teacher Name" value={p.teacher_name}
                  onChange={e => {
setPrograms(prev =>
  prev.map((item, idx) =>
    idx === i ? { ...item, teacher_name: e.target.value } : item
  )
);                  }} />

                <input type="file" onChange={e => {
setPrograms(prev =>
  prev.map((item, idx) =>
    idx === i ? { ...item, imageFile: e.target.value } : item
  )
);                }} />

                <input type="file" onChange={e => {
setPrograms(prev =>
  prev.map((item, idx) =>
    idx === i ? { ...item, teacherImgFile: e.target.value } : item
  )
);                }} />
              </td>

              <td className="border p-3">
                <Button onClick={() => saveProgram(i)}>
                  {p._id ? "Update" : "Add"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
