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
