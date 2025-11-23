import {useState} from 'react'

function Home() {

  const [file, setFile] = useState(null);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", file);

    await fetch("https://babycare-nu.vercel.app", {
      method: "POST",
      body: formData
    });
    alert("Uploaded!");
  };

  const deleteImage = async () => {
    await fetch("https://babycare-nu.vercel.app", 
      { 
        method: "DELETE" 
      }
    );
    alert("Deleted!");
  };



  return (
    <div className="home-container">
      <h1>Admin Panel</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />

      <button onClick={uploadImage}>Upload Image</button>
      <br /><br />

      <button onClick={deleteImage}>Delete Image</button>

    </div>
  )
}

export default Home
