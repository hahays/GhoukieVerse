export default function Input({ query, setQuery }) {
  // Убедитесь, что есть `export`
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
