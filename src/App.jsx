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
    const result = await githubResult(query);
    setResults(result);
    console.log(results);
  };

  return (
    <div>
      <h2>Github API</h2>
      <form onChange={onSearchChange} onSubmit={onSearchSubmit}>
        <label>
          Enter user name:
          <input type="text" />
        </label>
      </form>
      {/* <form onChange={onSearchChange} onSubmit={onSearchSubmit} value={query} /> */}
    </div>
  );
}

export default App;
