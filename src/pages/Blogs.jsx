import { useState, useEffect } from "react";
import Button from "../components/Button";

const EMPTY_BLOG = {
  _id: null,
  title: "",
  description: "",
  location : "",
  date : "",
  time : "",
  imageFile: null,
  imageUrl: "",
};

function blogs() {
  const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("");
    const [blogs, setblogs] = useState([
      { ...EMPTY_BLOG },
      { ...EMPTY_BLOG },
      { ...EMPTY_BLOG }
    ]);
  
  // ================= LOAD DATA =================
    useEffect(() => {
      async function loadblogs() {
        try {
          const res = await fetch(
            "https://babycare-admin-backend-ulfg.onrender.com/blogs"
          );
          const data = await res.json();
  
          if (data.success) {
            setHeading(data.data.heading || "");
            setSubHeading(data.data.subHeading || "");
  
            const apiblogs = data.data.blog || [];
  
            const filledblogs = [...apiblogs];
  
  while (filledblogs.length < 3) {
    filledblogs.push({ ...EMPTY_BLOG });
  }
  
  setblogs(filledblogs.slice(0, 3));
          }
        } catch (err) {
          console.log("Load error:", err);
        }
      }
  
      loadblogs();
    }, []);

  // ================= UPDATE HEADING =================
  const updateHeading = async () => {
    if (!heading.trim()) return alert("Heading required");

    const res = await fetch(
      "https://babycare-admin-backend-ulfg.onrender.com/blogs/heading",
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
      "https://babycare-admin-backend-ulfg.onrender.com/blogs/subheading",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subHeading })
      }
    );

    const data = await res.json();
    if (data.success) alert("SubHeading updated");
  };

   // ================= ADD / UPDATE PROGRAM =================
  const saveblog = async (index) => {
    const e = blogs[index];

    if (!e.title.trim()) {
      alert("Title is required");
      return;
    }

    const formData = new FormData();

formData.append("title", e.title);
formData.append("description", e.description);    

    if(e.date){
      formData.append("date", e.date)
    }
    if(e.time){
      formData.append("time", e.time)
    }
    if(e.location){
      formData.append("location", e.location)
    }


    if (e.imageFile) formData.append("image", e.imageFile);

    const url = e._id
      ? `https://babycare-admin-backend-ulfg.onrender.com/blogs/item/${e._id}`
      : `https://babycare-admin-backend-ulfg.onrender.com/blogs/item`;

    const method = e._id ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      body: formData
    });

    const data = await res.json();

    if (data.success) {
      alert(e._id ? "blog updated" : "blog added");
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
        {/* ROWS (Heading/Subheading rows) */}
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

        {/* blog BOXES */}
        {blogs.map((e, i) => (
                    <tr key={i}>
                      <td className="border p-3">{i + 3}</td>
                      <td className="border p-3">Blog {i + 1}</td>
        
                      <td className="border p-3 space-y-1">

                        <input className="w-full border p-1" placeholder="Title" value={e.title}
                          onChange={e => {
                            setblogs(prev =>
          prev.map((item, idx) =>
            idx === i ? { ...item, title: e.target.value } : item
          )
        );
        
                          }} />
        
                        <textarea className="w-full border p-1" placeholder="Description" value={e.description}
                          onChange={e => {
                            setblogs(prev =>
          prev.map((item, idx) =>
            idx === i ? { ...item, description: e.target.value } : item
          )
        );
                          }} />
        
                        <input className="w-full border p-1"  placeholder="Date" value={e.date}
                          onChange={e => {
                            setblogs(prev =>
          prev.map((item, idx) =>
            idx === i ? { ...item, date: e.target.value } : item
          )
        );
                          }} />
        
                        <input className="w-full border p-1"  placeholder="Time" value={e.time}
                          onChange={e => {
                            setblogs(prev =>
          prev.map((item, idx) =>
            idx === i ? { ...item, time: e.target.value } : item
          )
        );
                          }} />
        
                        <input className="w-full border p-1"  placeholder="Location" value={e.location}
                          onChange={e => {
                            setblogs(prev =>
          prev.map((item, idx) =>
            idx === i ? { ...item, location: e.target.value } : item
          )
        );
                          }} />
        
                        
        
                        <input type="file" onChange={e => {
        setblogs(prev =>
          prev.map((item, idx) =>
            idx === i ? { ...item, imageFile: e.target.files[0] } : item
          )
        );                }} />
        
                       
                      </td>
        
                      <td className="border p-3">
                        <Button onClick={() => saveblog(i)}>
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

export default blogs;
