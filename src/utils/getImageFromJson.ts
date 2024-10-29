export function replaceJsonWithPng(str: any) {
  return str.includes('.json') ? str.replace('.json', '.png') : str;
}
export function replaceJsonWithJpg(str: any) {
  return str.includes('.json') ? str.replace('.json', '.jpg') : str;
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
export function truncateImageName(str: any) {
  if (str) {
    if (str?.length <= 19) return str; // If the string is shorter than or equal to 5 characters, no need to truncate
    const firstPart = str.slice(0, 15); // Get the first 3 characters

    return `${firstPart}...`;
  }
  return ""
}

export function formatPrice(price: any) {
  // Check for numbers in the thousand, million, and billion range
  if (price >= 1e9) {
    // Billion range
    return (price / 1e9).toFixed(1) + 'B';
  } else if (price >= 1e6) {
    // Million range
    return (price / 1e6).toFixed(1) + 'M';
  } else if (price >= 1e3) {
    // Thousand range
    return (price / 1e3).toFixed(1) + 'k';
  } else {
    // Less than a thousand, return the original price
    return price.toString();
  }
}

export function truncateNameString(str: any) {
  if (str) {
    if (str?.length <= 15) return str; // If the string is shorter than or equal to 5 characters, no need to truncate
    const firstPart = str.slice(0, 13); // Get the first 3 characters
    // Get the last 2 characters
    return `${firstPart}...`;
  }
  return ""
}