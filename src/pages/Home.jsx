import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function Home() {
  const [heading, setHeading] = useState("");      // textarea 
  const [currentHeading, setCurrentHeading] = useState(""); // current column 
  
  const [subHeading, setSubHeading] = useState("");
  const [currentSubheading, setCurrentSubheading] = useState("");

  const [bgImage, setBgImage] = useState(null); // URL of the background image
  const [bgImageFile, setBgImageFile] = useState(null);
  
  // LOAD HEADIMG
  const loadHeading = async () => {
  try {
    const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/home");
    const data = await res.json();

    if (data.success) {
      setHeading(data.data.heading || "");
      setCurrentHeading(data.data.heading || "");
    }
  } catch (err) {
    console.log("Error loading heading:", err);
  }
};

  // UPDATE HEADING
  const saveHeading = async () => {
  if (!heading.trim()) {
    alert("Heading cannot be empty!");
    return;
  }

  try {
    const res = await fetch(
      "https://babycare-admin-backend-ulfg.onrender.com/home/heading",
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
      setCurrentHeading(data.data.heading || "");
    }
  } catch (error) {
    console.log("Error updating heading:", error);
  }
};

  // LOAD SUBHEADING
  const loadSubheading = async () => {
  try {
    const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/home");
    const data = await res.json();

    if (data.success) {
      setSubHeading(data.data.subHeading || "");
      setCurrentSubheading(data.data.subHeading || "");
    }
  } catch (err) {
    console.log("Error loading subheading:", err);
  }
};


// UPLOAD SUBHEADING

  const saveSubheading = async () => {
  if (!subHeading.trim()) {
    alert("Subheading cannot be empty!");
    return;
  }

  try {
    const res = await fetch(
      "https://babycare-admin-backend-ulfg.onrender.com/home/subheading",
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
      setCurrentSubheading(data.data.subHeading || "");
    }
  } catch (error) {
    console.log("Error updating subheading:", error);
  }
};

// LOAD BACKGROUND IMAGE
const loadBgImage = async () => {
  try {
    const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/home");
    const data = await res.json();

    if (data.success && data.data?.bgImageUrl) {
      setBgImage(data.data.bgImageUrl); // Set the URL for preview
    }
  } catch (err) {
    console.log("Error loading background image:", err);
  }
};

// UPLOAD BACKGROUND IMAGE
const uploadBgImage = async () => {
  if (!bgImageFile) {
    alert("Select an image first!");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("image", bgImageFile);

    const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/home/bg-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success && data.data?.bgImageUrl) {
        alert("Background image updated!");
        setBgImage(data.data.bgImageUrl);
    } else {
        console.log("Upload response:", data);
        alert("Failed to update background image");
    }
  } catch (error) {
    console.log("Error uploading background image:", error);
  }
};


// useEffect
  useEffect(() => {
  loadHeading();
  loadSubheading();
  loadBgImage()
}, []);
  
  // ROWS
  // ===========================================================
  const rows = [
    {
          label: "Heading",
          current: <p>{currentHeading || "No heading set"}</p>,
          input: (
            <textarea
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full h-28 p-2 border rounded resize-none"
            />
          ),
          button: <Button onClick={saveHeading}>Update</Button>,
      },
    
        {
          label: "Sub-Heading",
          current: <p>{currentSubheading || "No subheading set"}</p>,
          input: (
            <textarea
              value={subHeading}
              onChange={(e) => setSubHeading(e.target.value)}
              className="w-full h-28 p-2 border rounded resize-none"
            />
          ),
          button: <Button onClick={saveSubheading}>Update</Button>,
        },
    

    {
          label: "Background Image",
          current: bgImage ? (
            <img src={bgImage} className="w-32 h-32 mx-auto rounded object-cover" />
          ) : (
            <p>No image uploaded</p>
          ),
          input: <input type="file" onChange={(e) => setBgImageFile(e.target.files[0])} />,
          button: <Button onClick={uploadBgImage}>Update</Button>,
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
