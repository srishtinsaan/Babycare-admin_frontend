import { useState, useEffect } from "react";
import Button from "../components/Button";

const EMPTY_team = {
  _id: null,
  name: "",
  designation: "",
  imageFile: null,
  imageUrl: "",
};

function Teams() {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [teams, setteams] = useState([
    { ...EMPTY_team },
    { ...EMPTY_team },
    { ...EMPTY_team }
  ]);

  // ================= LOAD DATA =================
  useEffect(() => {
    async function loadteams() {
      try {
        const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/teams");
        const data = await res.json();

        if (data.success) {
          setHeading(data.data.heading || "");
          setSubHeading(data.data.subHeading || "");

          const apiteams = data.data.team || [];
          const filledteams = [...apiteams];

          while (filledteams.length < 3) {
            filledteams.push({ ...EMPTY_team });
          }

          setteams(filledteams.slice(0, 3));
        }
      } catch (err) {
        console.log("Load error:", err);
      }
    }

    loadteams();
  }, []);

  // ================= UPDATE HEADING =================
  const updateHeading = async () => {
    if (!heading.trim()) return alert("Heading required");

    const res = await fetch(
      "https://babycare-admin-backend-ulfg.onrender.com/teams/heading",
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
      "https://babycare-admin-backend-ulfg.onrender.com/teams/subheading",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subHeading })
      }
    );

    const data = await res.json();
    if (data.success) alert("SubHeading updated");
  };

  // ================= ADD / UPDATE TEAM =================
  const saveteam = async (index) => {
    const e = teams[index];

    if (!e.name.trim()) {
      alert("Name is required");
      return;
    }

    const formData = new FormData();

    formData.append("name", e.name);
    formData.append("designation", e.designation);

    if (e.imageFile) formData.append("image", e.imageFile);

    const url = e._id
      ? `https://babycare-admin-backend-ulfg.onrender.com/teams/item/${e._id}`
      : `https://babycare-admin-backend-ulfg.onrender.com/teams/item`;

    const method = e._id ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      body: formData
    });

    const data = await res.json();

    if (data.success) {
      alert(e._id ? "Team updated" : "Team added");
      window.location.reload();
    } else {
      alert(data.message || "Something went wrong");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
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

          {/* TEAM BOXES */}
          {teams.map((e, i) => (
            <tr key={i}>
              <td className="border p-3">{i + 3}</td>
              <td className="border p-3">Team {i + 1}</td>

              <td className="border p-3 space-y-1">
                <input
                  className="w-full border p-1"
                  placeholder="Name"
                  value={e.name}
                  onChange={(ev) => {
                    setteams((prev) =>
                      prev.map((item, idx) =>
                        idx === i ? { ...item, name: ev.target.value } : item
                      )
                    );
                  }}
                />

                <input
                  className="w-full border p-1"
                  placeholder="Profession"
                  value={e.designation}
                  onChange={(ev) => {
                    setteams((prev) =>
                      prev.map((item, idx) =>
                        idx === i
                          ? { ...item, designation: ev.target.value }
                          : item
                      )
                    );
                  }}
                />

                <input
                  type="file"
                  onChange={(ev) => {
                    setteams((prev) =>
                      prev.map((item, idx) =>
                        idx === i
                          ? { ...item, imageFile: ev.target.files[0] }
                          : item
                      )
                    );
                  }}
                />
              </td>

              <td className="border p-3">
                <Button onClick={() => saveteam(i)}>
                  {e._id ? "Update" : "Add"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
