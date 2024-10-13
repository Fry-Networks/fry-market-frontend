export function replaceJsonWithPng(str: any) {
  return str.includes('.json') ? str.replace('.json', '.png') : str;
}

export function truncateString(str: any) {
  if (str) {
    if (str?.length <= 7) return str; // If the string is shorter than or equal to 5 characters, no need to truncate
    const firstPart = str.slice(0, 4); // Get the first 3 characters
    const lastPart = str.slice(-3);    // Get the last 2 characters
    return `${firstPart}...${lastPart}`;
  }
  return ""
}