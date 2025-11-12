// Ensure you still have this for the Taint Analysis/Vulnerability check
const express = require('express');
const app = express();
const fs = require('fs');

// --- BLOCKER: Non-case label in switch (S1194)
function processValue(value)
{
    switch (value) {
        case 1:
            console.log("One");
            break;
        default:
            console.log("Other");
    }
    // Blocker Bug: Non-case label inside a switch statement block.
    // This will cause a syntax error in strict mode and is highly dangerous.
    label_error:
    return;
}

// --- BLOCKER: Incomplete Assertion (S5838)
const assert = require('assert');
function testAddition(a, b, expected)
{
    // Blocker Bug: Assertion is incomplete because it doesn't have an expression to evaluate.
    assert.ok();
}

// --- BLOCKER: Array method callback without return (S1854 - often configured as a blocker)
function processList(items)
{
    // Blocker Bug: The map callback must return a value, otherwise it returns an array of 'undefined'.
    let mapped = items.map(item =>
    {
        item.processed = true;
        // Missing explicit 'return item;'
    });
    return mapped;
}

// --- HIGH: Array.sort() without compare function (S1216)
function sortData(data)
{
    // High Severity: Array.sort() on numbers without a compare function leads to incorrect sorting.
    data.sort();
    return data;
}

// --- HIGH: 'await' without a Promise (S4119)
async function checkAwait()
{
    let result;

    // High Severity: Awaiting a non-Promise value. 
    // This is essentially a no-op but is flagged as incorrect usage.
    result = await 5;

    return result;
}


// --- Guaranteed CRITICAL/BLOCKER VULNERABILITY (from previous response)
// These are often needed to guarantee inline decoration.
app.get('/file-read', (req, res) =>
{
    let fileName = req.query.filename;
    // CRITICAL VULNERABILITY: Path Traversal (S5147)
    try {
        const data = fs.readFileSync(fileName);
        res.send(data.toString());
    } catch (e) {
        res.status(500).send('Error reading file.');
    }
});

// Ensure you still have this for the Taint Analysis/Vulnerability check
const express = require('express');
const app = express();
const fs = require('fs');

// --- BLOCKER: Non-case label in switch (S1194)
function processValue(value)
{
    switch (value) {
        case 1:
            console.log("One");
            break;
        default:
            console.log("Other");
    }
    // Blocker Bug: Non-case label inside a switch statement block.
    // This will cause a syntax error in strict mode and is highly dangerous.
    label_error:
    return;
}

// --- BLOCKER: Incomplete Assertion (S5838)
const assert = require('assert');
function testAddition(a, b, expected)
{
    // Blocker Bug: Assertion is incomplete because it doesn't have an expression to evaluate.
    assert.ok();
}

// --- BLOCKER: Array method callback without return (S1854 - often configured as a blocker)
function processList(items)
{
    // Blocker Bug: The map callback must return a value, otherwise it returns an array of 'undefined'.
    let mapped = items.map(item =>
    {
        item.processed = true;
        // Missing explicit 'return item;'
    });
    return mapped;
}

// --- HIGH: Array.sort() without compare function (S1216)
function sortData(data)
{
    // High Severity: Array.sort() on numbers without a compare function leads to incorrect sorting.
    data.sort();
    return data;
}

// --- HIGH: 'await' without a Promise (S4119)
async function checkAwait()
{
    let result;

    // High Severity: Awaiting a non-Promise value. 
    // This is essentially a no-op but is flagged as incorrect usage.
    result = await 5;

    return result;
}


// --- Guaranteed CRITICAL/BLOCKER VULNERABILITY (from previous response)
// These are often needed to guarantee inline decoration.
app.get('/file-read', (req, res) =>
{
    let fileName = req.query.filename;
    // CRITICAL VULNERABILITY: Path Traversal (S5147)
    try {
        const data = fs.readFileSync(fileName);
        res.send(data.toString());
    } catch (e) {
        res.status(500).send('Error reading file.');
    }
});

// --- HIGH: Array.sort() without compare function (S1216)
function sortData(data)
{
    // High Severity: Array.sort() on numbers without a compare function leads to incorrect sorting.
    data.sort();
    return data;
}

// --- HIGH: 'await' without a Promise (S4119)
async function checkAwait()
{
    let result;

    // High Severity: Awaiting a non-Promise value. 
    // This is essentially a no-op but is flagged as incorrect usage.
    result = await 5;

    return result;
}


// --- Guaranteed CRITICAL/BLOCKER VULNERABILITY (from previous response)
// These are often needed to guarantee inline decoration.
app.get('/file-read', (req, res) =>
{
    let fileName = req.query.filename;
    // CRITICAL VULNERABILITY: Path Traversal (S5147)
    try {
        const data = fs.readFileSync(fileName);
        res.send(data.toString());
    } catch (e) {
        res.status(500).send('Error reading file.');
    }
});

// --- HIGH: Array.sort() without compare function (S1216)
function sortData(data)
{
    // High Severity: Array.sort() on numbers without a compare function leads to incorrect sorting.
    data.sort();
    return data;
}

// --- HIGH: 'await' without a Promise (S4119)
async function checkAwait()
{
    let result;

    // High Severity: Awaiting a non-Promise value. 
    // This is essentially a no-op but is flagged as incorrect usage.
    result = await 5;

    return result;
}


// --- Guaranteed CRITICAL/BLOCKER VULNERABILITY (from previous response)
// These are often needed to guarantee inline decoration.
app.get('/file-read', (req, res) =>
{
    let fileName = req.query.filename;
    // CRITICAL VULNERABILITY: Path Traversal (S5147)
    try {
        const data = fs.readFileSync(fileName);
        res.send(data.toString());
    } catch (e) {
        res.status(500).send('Error reading file.');
    }
});