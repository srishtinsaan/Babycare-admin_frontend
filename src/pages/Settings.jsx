import { useState, useEffect } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";


function Settings() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");


  

  // ================= UPDATE username =================
  const updateusername = async () => {
    if (!username.trim()) return alert("username required");

    const res = await fetch(
      "https://babycare-admin-backend-ulfg.onrender.com/settings/newusername",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      }
    );

    const data = await res.json();
    if (data.success) alert("username updated");
  };

  // ================= UPDATE password =================
  const updatepassword = async () => {
    if (!password.trim()) return alert("password required");

    const res = await fetch(
      "https://babycare-admin-backend-ulfg.onrender.com/settings/newpassword",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      }
    );

    const data = await res.json();
    if (data.success) alert("password updated");
  };

  const navigate = useNavigate();

function logout() {
  localStorage.removeItem("token");   
  localStorage.removeItem("user");    
  navigate("/");                
}


  

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

          {/* USERNAME */}
          <tr>
            <td className="border p-3">1</td>
            <td className="border p-3">New Username</td>
            <td className="border p-3">
              <input
                className="w-full border p-2"
                value={username}
                onChange={e => setusername(e.target.value)}
                placeholder="Enter new username"
              />
            </td>
            <td className="border p-3">
              <Button onClick={updateusername}>Update</Button>
            </td>
          </tr>

          {/* PASSWORD */}
          <tr>
            <td className="border p-3">2</td>
            <td className="border p-3">New Password</td>
            <td className="border p-3">
              <input
                type="password"
                className="w-full border p-2"
                value={password}
                onChange={e => setpassword(e.target.value)}
                placeholder="Enter new password"
              />
            </td>
            <td className="border p-3">
              <Button onClick={updatepassword}>Update</Button>
            </td>
          </tr>

          
            

        </tbody>
       
          
      </table>

       {/* LOGOUT BUTTON */}
      <div className="mt-4">
        <Button onClick={logout}>Logout</Button>
      </div>
              

    </div>
  );
}

export default Settings;
