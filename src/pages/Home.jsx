import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function Home() {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [bgImage, setBgImage] = useState(null);
  const [file, setFile] = useState(null);
  const [leftBtn, setLeftBtn] = useState("");
  const [rightBtn, setRightBtn] = useState("");

  // LOAD HOME DATA
  // ===========================================================
  const loadHomeData = async () => {
    try {
      const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/home");
      const data = await res.json();

      if (data.success) {
        setHeading(data.data.heading || "");
        setSubHeading(data.data.subHeading || "");
        setLeftBtn(data.data.leftBtn || "");
        setRightBtn(data.data.rightBtn || "");
        setBgImage(data.data.bgImage || null);
      }
    } catch (error) {
      console.log("Error loading home:", error);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  // UPDATE HEADING
  // ===========================================================
  const updateHeading = async () => {
    if (!heading.trim()) return alert("Heading cannot be empty!");

    try {
      const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/home/heading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heading }),
      });

      const data = await res.json();
      if (data.success) alert("Heading updated!");
    } catch (error) {
      console.log("Error updating heading:", error);
    }
  };

  // UPDATE SUBHEADING
  // ===========================================================
  const updateSubHeading = async () => {
    if (!subHeading.trim()) return alert("Sub-heading cannot be empty!");

    try {
      const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subHeading }),
      });

      const data = await res.json();
      if (data.success) alert("Sub-heading updated!");
    } catch (error) {
      console.log("Error updating subheading:", error);
    }
  };

  // UPDATE BACKGROUND IMAGE
  // ===========================================================
  const updateBgImage = async () => {
    if (!file) {
      alert("Select an image first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/home", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert("Background image updated!");
        setBgImage(data.data.bgImage);
      }
    } catch (error) {
      console.log("Error uploading background image:", error);
    }
  };

  // UPDATE LEFT BUTTON TEXT
  // ===========================================================
  const updateLeftBtn = async () => {
    if (!leftBtn.trim()) return alert("Left button text cannot be empty!");

    try {
      const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leftBtn }),
      });

      const data = await res.json();
      if (data.success) alert("Left button text updated!");
    } catch (error) {
      console.log("Error updating left button text:", error);
    }
  };

  // UPDATE RIGHT BUTTON TEXT
  // ===========================================================
  const updateRightBtn = async () => {
    if (!rightBtn.trim()) return alert("Right button text cannot be empty!");

    try {
      const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rightBtn }),
      });

      const data = await res.json();
      if (data.success) alert("Right button text updated!");
    } catch (error) {
      console.log("Error updating right button text:", error);
    }
  };

  // ROWS
  // ===========================================================
  const rows = [
    {
      label: "Heading",
      current: <p>{heading}</p>,
      input: (
        <textarea
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="w-full h-20 p-2 border rounded resize-none"
        />
      ),
      button: <Button onClick={updateHeading}>Update</Button>,
    },

    {
      label: "Sub-Heading",
      current: <p>{subHeading}</p>,
      input: (
        <textarea
          value={subHeading}
          onChange={(e) => setSubHeading(e.target.value)}
          className="w-full h-20 p-2 border rounded resize-none"
        />
      ),
      button: <Button onClick={updateSubHeading}>Update</Button>,
    },

    {
      label: "Background Image",
      current: bgImage ? (
        <img src={bgImage} className="w-32 h-32 mx-auto rounded object-cover" />
      ) : (
        <p>No image uploaded</p>
      ),
      input: <input type="file" onChange={(e) => setFile(e.target.files[0])} />,
      button: <Button onClick={updateBgImage}>Update</Button>,
    },

    {
      label: "Left Button Text",
      current: <p>{leftBtn}</p>,
      input: (
        <input
          type="text"
          value={leftBtn}
          onChange={(e) => setLeftBtn(e.target.value)}
          className="w-full p-2 border rounded"
        />
      ),
      button: <Button onClick={updateLeftBtn}>Update</Button>,
    },

    {
      label: "Right Button Text",
      current: <p>{rightBtn}</p>,
      input: (
        <input
          type="text"
          value={rightBtn}
          onChange={(e) => setRightBtn(e.target.value)}
          className="w-full p-2 border rounded"
        />
      ),
      button: <Button onClick={updateRightBtn}>Update</Button>,
    },
  ];

  return (
    <div className="p-3">
      <table className="w-full border border-gray-300 border-collapse">
        <thead>
          <tr>
            <th className="border p-3">S. No.</th>
            <th className="border p-3">Data Field</th>
            <th className="border p-3">Current Data</th>
            <th className="border p-3">New Data</th>
            <th className="border p-3">Update</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border p-3 text-center">{index + 1}</td>
              <td className="border p-3 font-semibold">{row.label}</td>
              <td className="border p-3 text-center">{row.current}</td>
              <td className="border p-3 text-center">{row.input}</td>
              <td className="border p-3 text-center">{row.button}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
