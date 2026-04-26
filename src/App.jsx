import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userText, setUserText] = useState("");

  async function fetchUsers() {
    if (!userText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.github.com/users/${userText}`);
      if (!response.ok) throw new Error("User not found.");
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
      setUserText("");
    }
  }

  if (loading) return <p className="loading">Loading data...</p>;
  return (
    <>
      <header>
        <h1>GitHub - UserSearch</h1>
        <div className="search-row">
          <input
            type="text"
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchUsers()}
          />
          <button
            onClick={() => {
              fetchUsers();
            }}
          >
            Search
          </button>
        </div>
      </header>
      <main>
        {error && <p className="error">{error}</p>}
        {data && (
          <div className="user-card">
            <img src={data.avatar_url} alt={data.name} />
            <h2>{data.name}</h2>
            <p>Followers: {data.followers}</p>
            <p>Repos: {data.public_repos}</p>
          </div>
        )}
        {!data && !error && <p className="hint">Enter your GitHub username</p>}
      </main>
    </>
  );
}

export default App;
