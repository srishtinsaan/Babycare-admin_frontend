import { useState } from "react";

function About({label, page, currentImage }) {
  const [file, setFile] = useState(null);

  const submitImage = async () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("page", page);
    formData.append("label", label);

    await fetch("http://localhost:8000/upload-image", {
      method: "POST",
      body: formData,
    });

    alert("Updated!");
  };

  return (
<table className="home-container">
      <tbody>      
        <tr>
      <td>{label}</td>
      <td><img src={currentImage} width="120" /></td>
      <td>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={submitImage}>Upload</button>
      </td>
    </tr>
      </tbody>
    </table>
  )
}

export default About
