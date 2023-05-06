// import "./App.css";
import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const API_URL = "https://api.github.com";
  const githubResult = async (query) => {
    const response = await fetch(`${API_URL}/search/users?q=${query}`);
    const json = await response.json();
    return json.items || [];
  };

  const onSearchChange = (ev) => {
    setQuery(ev.target.value);
    // console.log(query);
  };

  const onSearchSubmit = async (ev) => {
    ev.preventDefault();
    console.log("on submit");
    const results = await githubResult(query);
    setResults(results);
    console.log(results);
  };

  return (
    <div>
      <h2>Github API</h2>
      <Form onChange={onSearchChange} onSubmit={onSearchSubmit} value={query} />
      <h3>Results</h3>
      <div>
        {results.map((user) => (
          <User
            key={user.login}
            avatar={user.avatar_url}
            url={user.url}
            username={user.login}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

function User({ avatar, url, username }) {
  return (
    <div className="User">
      <img src={avatar} alt="Profile" width="50" height="50" />
      <a href={url} target="_blank" rel="noopener noreferrer">
        {username}
      </a>
    </div>
  );
}

function Form({ onSubmit, onChange, value }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input
        id="search"
        type="text"
        placeholder="Enter username or email"
        onChange={onChange}
        value={value}
      />
      <button type="submit">Search</button>
    </form>
  );
}
