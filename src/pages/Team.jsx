import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function Team() {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  const [team, setTeam] = useState([
    { name: "", role: "", image: "", file: null },
    { name: "", role: "", image: "", file: null },
    { name: "", role: "", image: "", file: null },
    { name: "", role: "", image: "", file: null }
  ]);

  // ================================
  // LOAD TEAM DATA
  // ================================
  const loadTeamData = async () => {
    try {
      const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/team");
      const data = await res.json();

      if (data.success) {
        setHeading(data.data.heading);
        setSubHeading(data.data.subHeading);
        setTeam(data.data.team);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadTeamData();
  }, []);

  // ================================
  // UPDATE HEADING
  // ================================
  const updateHeading = async () => {
    await fetch("https://babycare-admin-backend-ulfg.onrender.com/team/heading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ heading })
    });
    alert("Heading updated!");
  };

  // ================================
  // UPDATE SUB HEADING
  // ================================
  const updateSubHeading = async () => {
    await fetch("https://babycare-admin-backend-ulfg.onrender.com/team/subheading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subHeading })
    });
    alert("Sub Heading updated!");
  };

  // ================================
  // UPDATE TEAM MEMBER
  // ================================
  const updateTeamMember = async (index) => {
    const member = team[index];
    const formData = new FormData();

    Object.keys(member).forEach((key) => {
      if (key === "file") {
        if (member.file) formData.append("image", member.file);
      } else {
        formData.append(key, member[key]);
      }
    });

    formData.append("index", index);

    const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/team/update", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    if (data.success) {
      alert(`Team Member ${index + 1} updated!`);
      loadTeamData();
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
              <textarea className="w-full border p-2"
                value={heading}
                onChange={(e) => setHeading(e.target.value)} />
            </td>
            <td className="border p-3">
              <Button onClick={updateHeading}>Update</Button>
            </td>
          </tr>

          {/* SUB HEADING */}
          <tr>
            <td className="border p-3">2</td>
            <td className="border p-3 font-semibold">Sub Heading</td>
            <td className="border p-3">{subHeading}</td>
            <td className="border p-3">
              <textarea className="w-full border p-2"
                value={subHeading}
                onChange={(e) => setSubHeading(e.target.value)} />
            </td>
            <td className="border p-3">
              <Button onClick={updateSubHeading}>Update</Button>
            </td>
          </tr>

          {/* TEAM MEMBERS */}
          {team.map((m, i) => (
            <tr key={i}>
              <td className="border p-3">{i + 3}</td>
              <td className="border p-3 font-semibold">Team Member {i + 1}</td>

              <td className="border p-3">
                <div className="space-y-1 text-gray-700">
                  <p><b>Name:</b> {m.name}</p>
                  <p><b>Role:</b> {m.role}</p>
                </div>
              </td>

              <td className="border p-3">

                <input type="text" placeholder="Name"
                  className="w-full border p-2 mb-1"
                  value={m.name}
                  onChange={(e) => {
                    const updated = [...team];
                    updated[i].name = e.target.value;
                    setTeam(updated);
                  }}
                />

                <input type="text" placeholder="Role"
                  className="w-full border p-2 mb-1"
                  value={m.role}
                  onChange={(e) => {
                    const updated = [...team];
                    updated[i].role = e.target.value;
                    setTeam(updated);
                  }}
                />

                <input type="file" className="w-full"
                  onChange={(e) => {
                    const updated = [...team];
                    updated[i].file = e.target.files[0];
                    setTeam(updated);
                  }} />
              </td>

              <td className="border p-3">
                <Button onClick={() => updateTeamMember(i)}>Update</Button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}
