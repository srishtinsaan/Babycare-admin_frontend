import { useState, useEffect } from "react";
import Button from "../components/Button";

function Settings() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // LOAD existing settings
  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("https://your-backend-url.com/settings");
        const data = await res.json();
        if (data.success) {
          setUsername(data.data.username || "");
          setPassword(""); // never load real password for safety
        }
      } catch (err) {
        console.log("Settings load error:", err);
      }
    }
    loadSettings();
  }, []);

  // UPDATE USERNAME
  const updateUsername = async () => {
    if (!username.trim()) return alert("Username required");

    const res = await fetch("https://your-backend-url.com/settings/username", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });

    const data = await res.json();
    if (data.success) alert("Username updated");
  };

  // UPDATE PASSWORD
  const updatePassword = async () => {
    if (!password.trim()) return alert("Password required");

    const res = await fetch("https://your-backend-url.com/settings/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    const data = await res.json();
    if (data.success) alert("Password updated");
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

          {/* USERNAME */}
          <tr>
            <td className="border p-3">1</td>
            <td className="border p-3">New Username</td>
            <td className="border p-3">
              <input
                className="w-full border p-2"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter new username"
              />
            </td>
            <td className="border p-3">
              <Button onClick={updateUsername}>Update</Button>
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
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </td>
            <td className="border p-3">
              <Button onClick={updatePassword}>Update</Button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}

export default Settings;
