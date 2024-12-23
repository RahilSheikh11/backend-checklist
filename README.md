# backend-checklist
# Checklist Evaluation App

This project provides a simple Node.js backend and a frontend dashboard for evaluating a checklist of conditions.

## Features
- Modular, clean Node.js codebase.
- REST API for checklist evaluation.
- Simple, responsive dashboard to display results.

## Adding New Checklist Conditions

1. Open `server.js`.
2. Modify the `getChecklistResults` function to include new conditions. For example:

```javascript
function getChecklistResults() {
  return [
    { name: 'Valuation Fee Paid', status: 'Passed' },
    { name: 'UK Resident', status: 'Passed' },
    { name: 'Risk Rating Medium', status: 'Passed' },
    { name: 'LTV Below 60%', status: 'Failed' },
    { name: 'Credit Score Above 700', status: 'Passed' } // New condition
  ];
}
