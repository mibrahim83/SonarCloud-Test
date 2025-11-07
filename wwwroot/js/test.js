function exportTableToCSV()
{
    exportButton.disabled = true;
    // Check if table has data
    if (prTable.rows().count() === 0) {
        alert('No data to export! Please fetch pull requests first.');
        exportButton.disabled = false;
        return;
    }

    // Get table headers
    const headers = [];
    $('#prTable thead th').each(function ()
    {
        headers.push($(this).text());
    });

    // Get all table data
    const rows = [];
    prTable.rows().every(function ()
    {
        const rowData = this.data();
        const row = [];

        // Process each cell
        rowData.forEach((cell) =>
        {
            let value = '';

            // Handle the closed date object
            if (typeof cell === 'object' && cell.display) {
                value = cell.display;
            }
            // Handle HTML content (like links)
            else if (typeof cell === 'string' && cell.includes('<a')) {
                // Extract URL from anchor tag
                const match = new RegExp(/href="([^"]*)"/).exec(cell);
                value = match ? match[1] : cell;
            }
            else {
                value = cell;
            }

            // Escape commas and quotes for CSV format
            value = String(value).replaceAll('"', '""');
            if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                value = `"${value}"`;
            }

            row.push(value);
        });

        rows.push(row);
    });

    // Build CSV content
    let csvContent = headers.join(',') + '\n';
    rows.forEach(row =>
    {
        csvContent += row.join(',') + '\n';
    });

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `PullRequests_${timestamp}.csv`;

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    link.remove();
    exportButton.disabled = false;
    console.log(`Exported ${rows.length} rows to ${filename}`);
}

// --- BUG (S1128: Remove this unused 'import'. Code smell/Bug)
import unusedLibrary from 'some-library';

// --- SECURITY HOTSPOT (S5131: Allow-listing is recommended to prevent Server-Side Request Forgery)
// This is a common pattern that SonarCloud flags for review.
const http = require('http');
function fetchData(url)
{
    http.get(url, (res) =>
    {
        // Sensitive: Fetching a URL directly from user input without validation/allow-listing
        // SonarCloud will highlight this as a Security Hotspot needing review.
        let data = '';
        res.on('data', (chunk) =>
        {
            data += chunk;
        });
        res.on('end', () =>
        {
            console.log(data);
        });
    });
}

// --- VULNERABILITY (S5144: Cookies should be set with the "secure" flag)
// This is an insecure use of cookies over HTTP (or non-secure in Node.js)
const setCookie = (res, value) =>
{
    // Sensitive: Missing 'secure' flag and 'HttpOnly' flag
    // SonarCloud will flag this as a Major Vulnerability.
    res.setHeader('Set-Cookie', `session=${value}; Max-Age=3600`);
}


// --- BUG (S106: Throwing a string literal is a Bug/Code Smell)
function processRequest(req, res)
{
    // Calling the sensitive functions
    fetchData(req.query.url); // Assume req.query.url is user input
    setCookie(res, 'my-session-token');

    // Bug: Throwing a non-Error object
    if (!req.query.id) {
        throw "Missing required parameter.";
    }
}

// Example usage to make the functions appear 'used'
if (typeof window === 'undefined') {
    const mockRes = { setHeader: (k, v) => console.log(`Setting header ${k}`) };
    const mockReq = { query: { url: 'http://example.com' } };
    processRequest(mockReq, mockRes);
}

// A simple Express server setup to simulate a real-world vulnerable endpoint
const express = require('express');
const app = express();
const fs = require('fs');

// --- BLOCKER BUG (S106: Throwing a string literal)
// Sonar flags this as a Bug that can halt execution in unexpected ways.
function validateInput(input)
{
    if (!input) {
        throw "Input cannot be null or undefined."; // S106: Throwing a string literal is a Blocker Bug in many profiles
    }
}

// --- CRITICAL VULNERABILITY (S5147: Path Traversal)
// A high-risk security flaw. Data flows from request (source) to file system read (sink) without sanitization.
app.get('/file', (req, res) =>
{
    // Tainted source: req.query.filename
    let fileName = req.query.filename;

    // Sink: Reading a file based on unvalidated user input. This leads to Path Traversal.
    // SonarCloud typically flags this as a Critical or Blocker Vulnerability.
    try {
        validateInput(fileName);
        const data = fs.readFileSync(fileName); // S5147: OS file access should not be vulnerable to path traversal attacks
        res.send(data.toString());
    } catch (e) {
        res.status(500).send('Error processing file.');
    }
});

// --- CRITICAL VULNERABILITY (S5131: Server-Side Request Forgery - SSRF)
// Another high-risk security flaw.
const http = require('http');
app.get('/fetch', (req, res) =>
{
    // Tainted source: req.query.url
    const url = req.query.url;

    // Sink: Making an HTTP request to an unvalidated URL provided by the user.
    // This allows an attacker to make the server request internal resources (SSRF).
    http.get(url, (apiRes) =>
    { // S5131: Server-side requests should not be vulnerable to forgery attacks.
        let data = '';
        apiRes.on('data', (chunk) => { data += chunk; });
        apiRes.on('end', () => res.send(data));
    }).on('error', (err) =>
    {
        res.status(500).send('Error fetching URL.');
    });
});

// Start the server (just for code completeness, won't actually run in GH Actions)
app.listen(3000, () =>
{
    console.log('App running on port 3000');
});

// You'll also need a package.json file to satisfy the 'require' calls
// Just having a simple package.json with express and fs (built-in) will work:
/*
{
  "name": "critical-test",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2" 
  }
}
*/