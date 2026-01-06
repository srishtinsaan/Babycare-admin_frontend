import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function Home() {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [bgImage, setBgImage] = useState(null);
  const [file, setFile] = useState(null);


  // LOAD HOME DATA
  // ===========================================================
  const loadHomeData = async () => {
    try {
      const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/home", {cache: "no-store"});
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
        cache: "no-store"
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
        cache: "no-store"
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
        cache: "no-store"
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
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
