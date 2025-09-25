export function toCsvRow(values: (string | number | boolean | null | undefined)[]) {
  return values.map(v => {
    if (v === null || v === undefined) return '';
    const s = String(v).replace(/"/g, '""');
    if (s.search(/[",\n]/) >= 0) return `"${s}"`;
    return s;
  }).join(',');
}

export function generateCsv(data: any[], headers: { key: string; label: string }[], rowMapper?: (item: any) => any) {
  const headerLine = headers.map(h => `"${h.label.replace(/"/g, '""')}"`).join(',');
  const lines = [headerLine];

  for (const item of data) {
    const mapped = rowMapper ? rowMapper(item) : item;
    const row = headers.map(h => mapped[h.key]);
    lines.push(toCsvRow(row));
  }

  return lines.join('\n');
}

export function downloadCsv(filename: string, csvContent: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
