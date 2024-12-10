export function formatURL(url: any) {
    // Check if the URL already starts with "https://"
    if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
    }

    // Ensure the URL has "www." after the protocol
    if (!/^https?:\/\/www\./i.test(url)) {
        url = url.replace(/^https?:\/\//i, "https://www.");
    }

    // Return the properly formatted URL
    return url.toLowerCase(); // Optional: to ensure consistency
}