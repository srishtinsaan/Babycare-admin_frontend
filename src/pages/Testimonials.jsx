import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function Testimonials() {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  const [cards, setCards] = useState([
    { name: "", profession: "", rating: 5, description: "", image: "", file: null },
    { name: "", profession: "", rating: 5, description: "", image: "", file: null },
    { name: "", profession: "", rating: 5, description: "", image: "", file: null }
  ]);

  const loadTestimonials = async () => {
    try {
      const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/testimonials");
      const data = await res.json();
      if (data.success) {
        setHeading(data.data.heading);
        setSubHeading(data.data.subHeading);
        setCards(data.data.cards);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const updateHeading = async () => {
    await fetch("https://babycare-admin-backend-ulfg.onrender.com/testimonials/heading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ heading })
    });
    alert("Heading updated!");
  };

  const updateSubHeading = async () => {
    await fetch("https://babycare-admin-backend-ulfg.onrender.com/testimonials/subheading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subHeading })
    });
    alert("Sub Heading updated!");
  };

  const updateCard = async (index) => {
    const card = cards[index];
    const formData = new FormData();

    Object.keys(card).forEach((key) => {
      if (key === "file") {
        if (card.file) formData.append("image", card.file);
      } else {
        formData.append(key, card[key]);
      }
    });

    formData.append("index", index);

    const res = await fetch("https://babycare-admin-backend-ulfg.onrender.com/testimonials/update", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    if (data.success) {
      alert(`Card ${index + 1} updated!`);
      loadTestimonials();
    }
  };

  return (
    <div className="p-3">
      <table className="w-full border border-gray-300 border-collapse">
        <thead>
          <tr>
            <th className="border p-3">S. No.</th>
            <th className="border p-3">Field</th>
            <th className="border p-3">Current</th>
            <th className="border p-3">New</th>
            <th className="border p-3">Action</th>
          </tr>
        </thead>

        <tbody>

          {/* Heading */}
          <tr>
            <td className="border p-3">1</td>
            <td className="border p-3 font-semibold">Heading</td>
            <td className="border p-3">{heading}</td>
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

          {/* Sub Heading */}
          <tr>
            <td className="border p-3">2</td>
            <td className="border p-3 font-semibold">Sub Heading</td>
            <td className="border p-3">{subHeading}</td>
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

          {/* Testimonial Cards */}
          {cards.map((c, i) => (
            <tr key={i}>
              <td className="border p-3">{i + 3}</td>
              <td className="border p-3 font-semibold">Testimonial {i + 1}</td>

              <td className="border p-3">
                <p><b>Name:</b> {c.name}</p>
                <p><b>Profession:</b> {c.profession}</p>
                <p><b>Rating:</b> ⭐ {c.rating}</p>
                <p><b>Description:</b> {c.description}</p>
              </td>

              <td className="border p-3">
                <input
                  type="text"
                  placeholder="Client Name"
                  className="w-full border p-2 mb-1"
                  value={c.name}
                  onChange={(e) => {
                    const updated = [...cards];
                    updated[i].name = e.target.value;
                    setCards(updated);
                  }}
                />

                <input
                  type="text"
                  placeholder="Profession"
                  className="w-full border p-2 mb-1"
                  value={c.profession}
                  onChange={(e) => {
                    const updated = [...cards];
                    updated[i].profession = e.target.value;
                    setCards(updated);
                  }}
                />

                <input
                  type="number"
                  placeholder="Rating (1-5)"
                  className="w-full border p-2 mb-1"
                  min="1"
                  max="5"
                  value={c.rating}
                  onChange={(e) => {
                    const updated = [...cards];
                    updated[i].rating = Number(e.target.value);
                    setCards(updated);
                  }}
                />

                <textarea
                  placeholder="Description"
                  className="w-full border p-2 mb-1"
                  value={c.description}
                  onChange={(e) => {
                    const updated = [...cards];
                    updated[i].description = e.target.value;
                    setCards(updated);
                  }}
                />

                <input
                  type="file"
                  className="w-full"
                  onChange={(e) => {
                    const updated = [...cards];
                    updated[i].file = e.target.files[0];
                    setCards(updated);
                  }}
                />
              </td>

              <td className="border p-3">
                <Button onClick={() => updateCard(i)}>Update</Button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}
