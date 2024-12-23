const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware configuration
app.use(express.static(path.join(__dirname, 'public')));

// Checklist Configuration according to the assessment
const checklistRules = [
  {
    name: "Valuation Fee Paid",
    check: (data) => data.isValuationFeePaid === true,
  },
  {
    name: "UK Resident",
    check: (data) => data.isUkResident === true,
  },
  {
    name: "Risk Rating Medium",
    check: (data) => data.riskRating === "Medium",
  },
  {
    name: "LTV Below 60%",
    check: (data) => {
      const ltv = (data.loanRequired / data.purchasePrice) * 100;
      return ltv < 60;
    },
  },
];

// Fetching Data from API
async function fetchData() {
  try {
    const response = await axios.get(
      'http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639'
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Evaluate Rules
function evaluateChecklist(data) {
  return checklistRules.map((rule) => ({
    name: rule.name,
    status: rule.check(data) ? "Passed" : "Failed",
  }));
}

// Route to Fetch and Display Checklist Results
app.get('/checklist', async (req, res) => {
  const data = await fetchData();
  if (!data) {
    return res.status(500).send("Error fetching data from API.");
  }

  const results = evaluateChecklist(data);
  res.json(results);
});

// Dashboard Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
