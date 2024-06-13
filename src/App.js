import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [numberId, setNumberId] = useState('');
  const [response, setResponse] = useState(null);

  const handleFetchNumbers = async () => {
    try {
      const res = await axios.get(`http://localhost:9876/numbers/${numberId}`);
      setResponse(res.data);
    } catch (error) {
      if (error.response) {
        console.error('Error fetching numbers:', error.response.data);
      } else {
        console.error('Error fetching numbers:', error.message);
      }
    }
  };
  return (
    <div>
      <center>
      <h1>Task1</h1>
      <input
        type="text"
        value={numberId}
        onChange={(e) => setNumberId(e.target.value)}
        placeholder="Enter number id (p, f, e, r)"
      />
      <button onClick={handleFetchNumbers}>Fetch Numbers</button>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      </center>
    </div>
  );
}

export default App;
