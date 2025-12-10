import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function Blogs() {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  const [programs, setPrograms] = useState([
    { title: "", desc: "", price: "", seats: "", lessons: "", hours: "", teacher: "", role: "", image: "", file: null },
    { title: "", desc: "", price: "", seats: "", lessons: "", hours: "", teacher: "", role: "", image: "", file: null },
    { title: "", desc: "", price: "", seats: "", lessons: "", hours: "", teacher: "", role: "", image: "", file: null }
  ]);

  // ================================
  // LOAD DATA
  // ================================
  const loadProgramData = async () => {
    try {
      const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/programs");
      const data = await res.json();

      if (data.success) {
        setHeading(data.data.heading);
        setSubHeading(data.data.subHeading);
        setPrograms(data.data.programs);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadProgramData();
  }, []);

  // ================================
  // UPDATE HEADING
  // ================================
  const updateHeading = async () => {
    await fetch("https://babycare-admin-backend-ulfg.onrender.com/programs/heading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ heading })
    });
    alert("Heading updated!");
  };

  // ================================
  // UPDATE SUB-HEADING
  // ================================
  const updateSubHeading = async () => {
    await fetch("https://babycare-admin-backend-ulfg.onrender.com/programs/subheading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subHeading })
    });
    alert("Sub Heading updated!");
  };

  // ================================
  // UPDATE A PROGRAM BOX
  // ================================
  const updateProgram = async (index) => {
    const program = programs[index];
    const formData = new FormData();

    Object.keys(program).forEach((key) => {
      if (key === "file") {
        if (program.file) formData.append("image", program.file);
      } else {
        formData.append(key, program[key]);
      }
    });

    formData.append("index", index);

    const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/programs/update", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    if (data.success) {
      alert(`Program ${index + 1} updated!`);
      loadProgramData();
    }
  };

  return (
    <div className="p-3">
      <table className="w-full border border-gray-300 border-collapse">
        <thead>
          <tr>
            <th className="border p-3">S. No.</th>
            <th className="border p-3">Field</th>
            <th className="border p-3">Current</th>
            <th className="border p-3">New</th>
            <th className="border p-3">Action</th>
          </tr>
        </thead>

        <tbody>

          {/* HEADING */}
          <tr>
            <td className="border p-3">1</td>
            <td className="border p-3 font-semibold">Heading</td>
            <td className="border p-3">{heading}</td>
            <td className="border p-3">
              <textarea className="w-full border p-2" value={heading} onChange={(e) => setHeading(e.target.value)} />
            </td>
            <td className="border p-3"><Button onClick={updateHeading}>Update</Button></td>
          </tr>

          {/* SUBHEADING */}
          <tr>
            <td className="border p-3">2</td>
            <td className="border p-3 font-semibold">Sub Heading</td>
            <td className="border p-3">{subHeading}</td>
            <td className="border p-3">
              <textarea className="w-full border p-2" value={subHeading} onChange={(e) => setSubHeading(e.target.value)} />
            </td>
            <td className="border p-3"><Button onClick={updateSubHeading}>Update</Button></td>
          </tr>

          {/* PROGRAM BOXES */}
          {programs.map((p, i) => (
            <tr key={i}>
              <td className="border p-3">{i + 3}</td>
              <td className="border p-3 font-semibold">Blog {i + 1}</td>

              <td className="border p-3">
  <div className="space-y-1 text-gray-700">
    <p><b>Title:</b></p>
    <p><b>Desc:</b></p>
    <p><b>Teacher:</b></p>
    <p><b>Role:</b></p>
  </div>
</td>


              <td className="border p-3">

                <input type="text" placeholder="Title"
                  className="w-full border p-2 mb-1"
                  value={p.title}
                  onChange={(e) => {
                    const updated = [...programs];
                    updated[i].title = e.target.value;
                    setPrograms(updated);
                  }}
                />

                <textarea placeholder="Description"
                  className="w-full border p-2 mb-1"
                  value={p.desc}
                  onChange={(e) => {
                    const updated = [...programs];
                    updated[i].desc = e.target.value;
                    setPrograms(updated);
                  }}
                />

                
                

                <input type="text" placeholder="Teacher Name"
                  className="w-full border p-2 mb-1"
                  value={p.teacher}
                  onChange={(e) => {
                    const updated = [...programs];
                    updated[i].teacher = e.target.value;
                    setPrograms(updated);
                  }}
                />

                <input type="text" placeholder="Teacher Role"
                  className="w-full border p-2 mb-1"
                  value={p.role}
                  onChange={(e) => {
                    const updated = [...programs];
                    updated[i].role = e.target.value;
                    setPrograms(updated);
                  }}
                />

                <input type="file" className="w-full" onChange={(e) => {
                  const updated = [...programs];
                  updated[i].file = e.target.files[0];
                  setPrograms(updated);
                }} />
              </td>

              <td className="border p-3">
                <Button onClick={() => updateProgram(i)}>Update</Button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}
