export default function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
    >
      {children}
    </button>
  );
}
