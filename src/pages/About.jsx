import { useState, useEffect } from "react";
import Button from "../components/Button"

export default function About() {

  // states
  const [rightImage, setRightImage] = useState(null);       // URL for preview
  const [rightImageFile, setRightImageFile] = useState(null); // File selected for upload

  const [bgImage, setBgImage] = useState(null); // URL of the background image
  const [bgImageFile, setBgImageFile] = useState(null); // File selected for upload

  const [heading, setHeading] = useState("");      // textarea ke liye
  const [currentHeading, setCurrentHeading] = useState(""); // current column ke liye

  const [subheading, setSubHeading] = useState("");
const [currentSubheading, setCurrentSubheading] = useState("");

const [paragraph, setParagraph] = useState("");
const [currentParagraph, setCurrentParagraph] = useState("");


  // LOAD HEADIMG
  const loadHeading = async () => {
  try {
    const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/about/heading");
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
      "https://babycare-admin-backend-ulfg.onrender.com/about/heading",
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
    const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/about/subheading");
    const data = await res.json();

    if (data.success) {
      setSubHeading(data.data.subheading || "");
      setCurrentSubheading(data.data.subheading || "");
    }
  } catch (err) {
    console.log("Error loading subheading:", err);
  }
};


// UPLOAD SUBHEADING

  const saveSubheading = async () => {
  if (!subheading.trim()) {
    alert("Subheading cannot be empty!");
    return;
  }

  try {
    const res = await fetch(
      "https://babycare-admin-backend-ulfg.onrender.com/about/subheading",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subheading }),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Subheading updated!");
      setSubHeading(data.data.subheading || "");
      setCurrentSubheading(data.data.subheading || "");
    }
  } catch (error) {
    console.log("Error updating subheading:", error);
  }
};

  // LOAD RIGHT IMAGE
const loadRightImage = async () => {
  try {
    const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/about/right-image");
    const data = await res.json();

    if (data.success) {
      setRightImage(data.data.rightImageUrl); // Set URL for preview
    }
  } catch (err) {
    console.log("Error loading right image:", err);
  }
};

// UPLOAD RIGHT IMAGE
const uploadRightImage = async () => {
  if (!rightImageFile) { // use file state for upload
    alert("Select an image first!");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("image", rightImageFile); // append the selected file

    const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/about/right-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Right image updated!");
      setRightImage(data.data.rightImageUrl); // update preview
    }
  } catch (error) {
    console.log("Error uploading right image:", error);
  }
};


  // LOAD BACKGROUND IMAGE
const loadBgImage = async () => {
  try {
    const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/about/bg-image");
    const data = await res.json();

    if (data.success) {
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

    const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/about/bg-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Background image updated!");
      setBgImage(data.data.bgImageUrl); // Update preview
    }
  } catch (error) {
    console.log("Error uploading background image:", error);
  }
};


  // LOAD PARAGRAPH
  // ===========================================================
  const loadParagraph = async () => {
    try {
      const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/about/paragraph");
      const data = await res.json();

      if (data.success) {
        setParagraph(data.data.paragraph || "");
        setCurrentParagraph(data.data.paragraph || "")
      }
    } catch (err) {
      console.log("Error loading paragraph:", err);
    }
  };


  // UPDATE PARAGRAPH
  // ===========================================================
  const saveParagraph = async () => {
    if (!paragraph.trim()) {
      alert("Paragraph cannot be empty!");
      return;
    }

    try {
      const res = await fetch(
        "https://babycare-admin-backend-ulfg.onrender.com/about/paragraph",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paragraph }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Paragraph updated!");
        setParagraph(data.data.paragraph || "");
        setCurrentParagraph(data.data.paragraph || "")
      } else {
        alert("Failed to update paragraph");
      }
    } catch (error) {
      console.log("Error saving paragraph:", error);
    }
  };
  

  // useEffect
  useEffect(() => {
  loadHeading();
  loadSubheading();
  loadRightImage();
  loadParagraph();
  loadBgImage()
}, []);


  // ROWS

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
      current: <p>{currentSubheading || "No heading set"}</p>,
      input: (
        <textarea
          value={subheading}
          onChange={(e) => setSubHeading(e.target.value)}
          className="w-full h-28 p-2 border rounded resize-none"
        />
      ),
      button: <Button onClick={saveSubheading}>Update</Button>,
    },

    {
      label: "Paragraph",
      current: <p>{currentParagraph || "No paragraph set"}</p>,
      input: (
        <textarea
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
          className="w-full h-28 p-2 border rounded resize-none"
        />
      ),
      button: <Button onClick={saveParagraph}>Update</Button>,
    },

    {
      label: "Right Image",
      current: rightImage ? (
        <img src={rightImage} className="w-32 h-32 mx-auto rounded object-cover" />
      ) : (
        <p>No image uploaded</p>
      ),
      input: <input type="file" onChange={(e) => setRightImageFile(e.target.files[0])} />,
      button: <Button onClick={uploadRightImage}>Update</Button>,
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
    <div className="p-2">

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
        <td className="border p-3 font-semibold">{index + 1}</td>
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


