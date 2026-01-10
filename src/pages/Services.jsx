import { useState, useEffect } from "react";
import Button from "../components/Button";

const EMPTY_service = {
  _id: null,
  title: "",
  description: "",
  imageFile: null,
  imageUrl: "",
};

function Services() {
  const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("");
    const [services, setservices] = useState([
      { ...EMPTY_service },
      { ...EMPTY_service },
      { ...EMPTY_service },
      { ...EMPTY_service }
    ]);
  
  // ================= LOAD DATA =================
    useEffect(() => {
      async function loadservices() {
        try {
          const res = await fetch(
            "https://babycare-admin-backend-ulfg.onrender.com/services"
          );
          const data = await res.json();
  
          if (data.success) {
            setHeading(data.data.heading || "");
            setSubHeading(data.data.subHeading || "");
  
            const apiservices = data.data.service || [];
  
            const filledservices = [...apiservices];
  
  while (filledservices.length < 4) {
    filledservices.push({ ...EMPTY_service });
  }
  
  setservices(filledservices.slice(0, 4));
          }
        } catch (err) {
          console.log("Load error:", err);
        }
      }
  
      loadservices();
    }, []);

  // ================= UPDATE HEADING =================
  const updateHeading = async () => {
    if (!heading.trim()) return alert("Heading required");

    const res = await fetch(
      "https://babycare-admin-backend-ulfg.onrender.com/services/heading",
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
      "https://babycare-admin-backend-ulfg.onrender.com/services/subheading",
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
  const saveservice = async (index) => {
    const e = services[index];

    if (!e.title.trim()) {
      alert("Title is required");
      return;
    }

    const formData = new FormData();

formData.append("title", e.title);
formData.append("description", e.description);    


    if (e.imageFile) formData.append("image", e.imageFile);

    const url = e._id
      ? `https://babycare-admin-backend-ulfg.onrender.com/services/item/${e._id}`
      : `https://babycare-admin-backend-ulfg.onrender.com/services/item`;

    const method = e._id ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      body: formData
    });

    const data = await res.json();

    if (data.success) {
      alert(e._id ? "service updated" : "service added");
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

        {/* service BOXES */}
        {services.map((e, i) => (
                    <tr key={i}>
                      <td className="border p-3">{i + 3}</td>
                      <td className="border p-3">Service {i + 1}</td>
        
                      <td className="border p-3 space-y-1">

                        <input className="w-full border p-1" placeholder="Title" value={e.title}
                          onChange={e => {
                            setservices(prev =>
          prev.map((item, idx) =>
            idx === i ? { ...item, title: e.target.value } : item
          )
        );
        
                          }} />
        
                        <textarea className="w-full border p-1" placeholder="Description" value={e.description}
                          onChange={e => {
                            setservices(prev =>
          prev.map((item, idx) =>
            idx === i ? { ...item, description: e.target.value } : item
          )
        );
                          }} />
        
        
                        <input type="file" onChange={e => {
        setservices(prev =>
          prev.map((item, idx) =>
            idx === i ? { ...item, imageFile: e.target.files[0] } : item
          )
        );                }} />
        
                       
                      </td>
        
                      <td className="border p-3">
                        <Button onClick={() => saveservice(i)}>
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

export default Services;
