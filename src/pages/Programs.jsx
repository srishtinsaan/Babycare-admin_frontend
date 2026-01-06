import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function Programs() {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  const [programs, setPrograms] = useState([
    { _id: "", title: "", desc: "", price: "", seats: "", lessons: "", hours: "", teacher: "", role: "", imageFile: null, imageUrl: "", teacherImgFile: null, teacherImg: ""},
    { _id: "", title: "", desc: "", price: "", seats: "", lessons: "", hours: "", teacher: "", role: "", imageFile: null, imageUrl: "", teacherImgFile: null, teacherImg: ""},
    { _id: "", title: "", desc: "", price: "", seats: "", lessons: "", hours: "", teacher: "", role: "", imageFile: null, imageUrl: "", teacherImgFile: null, teacherImg: ""}
  ]);

  // Load for id
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
        setPrograms(data.data.programs || []);
      }
    } catch (err) {
      console.log("Error loading programs:", err);
    }
  }

  loadPrograms();
}, []);



  // UPDATE HEADING
  const updateHeading = async () => {
    if (!heading.trim()) {
    alert("Heading cannot be empty!");
    return;
  }

  try {
    const res = await fetch(
      "https://babycare-admin-backend-ulfg.onrender.com/programs/heading",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heading }),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Heading updated!");
      setHeading(data.data.heading || "");
    }
  } catch (error) {
    console.log("Error updating heading:", error);
  }
  };

  // UPDATE SUB-HEADING
  const updateSubHeading = async () => {
    if (!subHeading.trim()) {
    alert("Subheading cannot be empty!");
    return;
  }

  try {
    const res = await fetch(
      "https://babycare-admin-backend-ulfg.onrender.com/programs/subheading",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subHeading }),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Subheading updated!");
      setSubHeading(data.data.subHeading || "");
    }
  } catch (error) {
    console.log("Error updating subheading:", error);
  }
  };

  // UPDATE PROGRAM BOX
  const updateProgram = async (index) => {
  const program = programs[index];

  if (!program._id) {
    alert("Program ID missing");
    return;
  }

  try {
    const formData = new FormData();

    // Append text fields
    formData.append("title", program.title);
    formData.append("description", program.desc);
    formData.append("price", program.price);
    formData.append("seats", program.seats);
    formData.append("lessons", program.lessons);
    formData.append("hours", program.hours);
    formData.append("teacher_name", program.teacher);

    // Append program image if exists
    if (program.imageFile) {
      formData.append("image", program.imageFile);
    }

    // Append teacher image if exists
    if (program.teacherImgFile) {
      formData.append("teacherImg", program.teacherImgFile);
    }

    const res = await fetch(
      `https://babycare-admin-backend-ulfg.onrender.com/programs/item/${program._id}`,
      {
        method: "PATCH",
        body: formData
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Program updated successfully");

      // Update UI image previews
      const updated = [...programs];
      if (data.data.imageUrl) updated[index].imageUrl = data.data.imageUrl;
      if (data.data.teacherImg) updated[index].teacherImgUrl = data.data.teacherImg;
      setPrograms(updated);
    }
  } catch (error) {
    console.log("Error updating program:", error);
  }
};



  return (
    <div className="p-3">
      <table className="w-full border border-gray-300 border-collapse">
        <thead>
          <tr>
            <th className="border p-3">S. No.</th>
            <th className="border p-3">Field</th>
            <th className="border p-3">SubField</th>
            <th className="border p-3">New</th>
            <th className="border p-3">Action</th>
          </tr>
        </thead>

        <tbody>

          {/* HEADING */}
          <tr>
            <td className="border p-3">1</td>
            <td className="border p-3 font-semibold">Heading</td>
            <td className="border p-3"></td>
            <td className="border p-3">
              <textarea className="w-full border p-2" value={heading} onChange={(e) => setHeading(e.target.value)} />
            </td>
            <td className="border p-3"><Button onClick={updateHeading}>Update</Button></td>
          </tr>

          {/* SUBHEADING */}
          <tr>
            <td className="border p-3">2</td>
            <td className="border p-3 font-semibold">Sub Heading</td>
            <td className="border p-3"></td>
            <td className="border p-3">
              <textarea className="w-full border p-2" value={subHeading} onChange={(e) => setSubHeading(e.target.value)} />
            </td>
            <td className="border p-3"><Button onClick={updateSubHeading}>Update</Button></td>
          </tr>

          {/* PROGRAM BOXES */}
          {programs.map((p, i) => (
            <tr key={i}>
              <td className="border p-3">{i + 3}</td>
              <td className="border p-3 font-semibold">Program {i + 1}</td>

              <td className="border p-3">
  <div className="space-y-1 text-gray-700">
    <p><b>Title:</b></p>
    <p><b>Desc:</b></p>
    <p><b>Price:</b></p>
    <p><b>Seats:</b></p>
    <p><b>Lessons:</b></p>
    <p><b>Hours:</b></p>
    <p><b>Teacher:</b></p>
    <p><b>Program Image:</b></p>
    <p><b>Teacher Image:</b></p>
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

                <input type="text" placeholder="Price"
                  className="w-full border p-2 mb-1"
                  value={p.price}
                  onChange={(e) => {
                    const updated = [...programs];
                    updated[i].price = e.target.value;
                    setPrograms(updated);
                  }}
                />

                <input type="text" placeholder="Seats"
                  className="w-full border p-2 mb-1"
                  value={p.seats}
                  onChange={(e) => {
                    const updated = [...programs];
                    updated[i].seats = e.target.value;
                    setPrograms(updated);
                  }}
                />

                <input type="text" placeholder="Lessons"
                  className="w-full border p-2 mb-1"
                  value={p.lessons}
                  onChange={(e) => {
                    const updated = [...programs];
                    updated[i].lessons = e.target.value;
                    setPrograms(updated);
                  }}
                />

                <input type="text" placeholder="Hours"
                  className="w-full border p-2 mb-1"
                  value={p.hours}
                  onChange={(e) => {
                    const updated = [...programs];
                    updated[i].hours = e.target.value;
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

                <b>Program Image:</b>
                <input type="file" className="w-full" onChange={(e) => {
                  const updated = [...programs];
                  updated[i].imageFile = e.target.files[0];
                  setPrograms(updated);
                }} />

                <br />
                <b>Teacher Image:</b>
                <input type="file" className="w-full" onChange={(e) => {
                  const updated = [...programs];
                  updated[i].teacherImgFile = e.target.files[0];
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
