const MCC_MAP: Record<string, string> = {
  '6300': 'Insurance',
  '4112': 'Travel',
  '5812': 'Dining',
  '5411': 'Shopping',
  '8299': 'Education'
};

export function resolveMcc(query: string) {
  const match = query.match(/\b\d{4}\b/);
  if (match) {
    const code = match[0];
    return {
      code,
      category: MCC_MAP[code] || 'Unknown'
    };
  }
  return null;
}