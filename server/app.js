const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 9876;

app.use(cors());

let numbers = [];


app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;
  try {
    const fetchedNumbers = await fetchNumbersFromTestServer(numberid);
    if (fetchedNumbers) {
      updateNumbersWindow(fetchedNumbers);
      const avg = calculateAverage(numbers);
      res.json({
        windowPrevState: numbers.slice(0, -fetchedNumbers.length),
        windowCurrState: numbers,
        numbers: fetchedNumbers,
        avg: avg.toFixed(2)
      });
    } else {
     res.status(500).json({ error: 'Failed to fetch numbers' });

    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function fetchNumbersFromTestServer(numberid) {
    try {
      const response = await axios.get(`http://20.244.56.144/test/${numberid}`, {
        headers:{
            "token_type": "Bearer",
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4MjY1MDI5LCJpYXQiOjE3MTgyNjQ3MjksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjM3YmJlYmQwLTI4M2YtNGNkZi1iODhkLWI4ZGJmNjg5M2JlYiIsInN1YiI6IjIxMDAwMzA1MTBAa2x1bml2ZXJzaXR5LmluIn0sImNvbXBhbnlOYW1lIjoiSyBMIFVuaXZlcnNpdHkiLCJjbGllbnRJRCI6IjM3YmJlYmQwLTI4M2YtNGNkZi1iODhkLWI4ZGJmNjg5M2JlYiIsImNsaWVudFNlY3JldCI6IkVMTXhhVGRGQXhkckFuQm8iLCJvd25lck5hbWUiOiJHb2RhdmFyaSBTcmlrYW50aCIsIm93bmVyRW1haWwiOiIyMTAwMDMwNTEwQGtsdW5pdmVyc2l0eS5pbiIsInJvbGxObyI6IjIxMDAwMzA1MTAifQ.IaH50OuVaynTFKh66E_-JpfI5w77rr62ghTiM3qhAIY",
            "expires_in": 1718265029
        }
      });
      return response.data.numbers;
    } catch (error) {
      console.error(error.response || error);
      return null;
    }
  }
  

function updateNumbersWindow(newNumbers) {
  newNumbers.forEach((num) => {
    if (!numbers.includes(num)) {
      if (numbers.length >= 10) numbers.shift();
      numbers.push(num);
    }
  });
}

function calculateAverage(arr) {
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
