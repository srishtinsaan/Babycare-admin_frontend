import { useState, useEffect } from "react";
import Button from "../components/Button";

  const EMPTY_TESTIMONIAL = {
  _id: null,
  name: "",
  designation : "",
  description: "",
  imageFile: null,
  imageUrl: "",
};

function Testimonials() {
  const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("");
    const [testimonials, settestimonials] = useState([
      { ...EMPTY_TESTIMONIAL },
      { ...EMPTY_TESTIMONIAL },
      { ...EMPTY_TESTIMONIAL }
    ]);
  

  // ================= LOAD DATA =================
      useEffect(() => {
        async function loadtestimonials() {
          try {
            const res = await fetch(
              "https://babycare-admin-backend-ulfg.onrender.com/testimonials"
            );
            const data = await res.json();
    
            if (data.success) {
              setHeading(data.data.heading || "");
              setSubHeading(data.data.subHeading || "");
    
              const apitestimonials = data.data.testimonial || [];
    
              const filledtestimonials = [...apitestimonials];
    
    while (filledtestimonials.length < 6) {
      filledtestimonials.push({ ...EMPTY_TESTIMONIAL });
    }

    settestimonials(filledtestimonials.slice(0, 6));
            }
          } catch (err) {
            console.log("Load error:", err);
          }
        }
        loadtestimonials();
      }, []);
  
    // ================= UPDATE HEADING =================
    const updateHeading = async () => {
      if (!heading.trim()) return alert("Heading required");
  
      const res = await fetch(
        "https://babycare-admin-backend-ulfg.onrender.com/testimonials/heading",
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
        "https://babycare-admin-backend-ulfg.onrender.com/testimonials/subheading",
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
    const savetestimonial = async (index) => {
      const e = testimonials[index];
  
      if (!e.name.trim()) {
        alert("Name is required");
        return;
      }
  
      const formData = new FormData();
  
  formData.append("name", e.name);
  formData.append("description", e.description);    
  formData.append("designation", e.designation); file

  
      if (e.imageFile) formData.append("image", e.imageFile);
  
      const url = e._id
        ? `https://babycare-admin-backend-ulfg.onrender.com/testimonials/item/${e._id}`
        : `https://babycare-admin-backend-ulfg.onrender.com/testimonials/item`;
  
      const method = e._id ? "PATCH" : "POST";
  
      const res = await fetch(url, {
        method,
        body: formData
      });
  
      const data = await res.json();
  
      if (data.success) {
        alert(e._id ? "testimonial updated" : "testimonial added");
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
  
          {/* testimonial BOXES */}
          {testimonials.map((e, i) => (
                      <tr key={i}>
                        <td className="border p-3">{i + 3}</td>
                        <td className="border p-3">testimonial {i + 1}</td>
          
                        <td className="border p-3 space-y-1">
  
                          <input className="w-full border p-1" placeholder="Name" value={e.name}
                            onChange={e => {
                              settestimonials(prev =>
            prev.map((item, idx) =>
              idx === i ? { ...item, name: e.target.value } : item
            )
          );
          
                            }} />

                            <input className="w-full border p-1"  placeholder="Profession" value={e.designation}
                            onChange={e => {
                              settestimonials(prev =>
            prev.map((item, idx) =>
              idx === i ? { ...item, designation: e.target.value } : item
            )
          );
                            }} />
          
                          <textarea className="w-full border p-1" placeholder="Description" value={e.description}
                            onChange={e => {
                              settestimonials(prev =>
            prev.map((item, idx) =>
              idx === i ? { ...item, description: e.target.value } : item
            )
          );
                            }} />
          
                
                          <input type="file" onChange={e => {
          settestimonials(prev =>
            prev.map((item, idx) =>
              idx === i ? { ...item, imageFile: e.target.files[0] } : item
            )
          );                }} />
          
                         
                        </td>
          
                        <td className="border p-3">
                          <Button onClick={() => savetestimonial(i)}>
                            {e._id ? "Update" : "Add"}
                          </Button>
                        </td>
                      </tr>
                    ))}
        </tbody>
      </table>
    </div>
  );
 };

export default Testimonials;
