export const PROCESSING =
  "🔍 Processing your request... Please wait while I fetch your premium content link!";

export const generateDownloadLinkMessage = (downloadLink: string) => `
<b>🎨 Your Freepik Premium Content is Ready! 🎨</b>

<i>Here's your exclusive download link:</i>

<a href="${downloadLink}">🔗 Click here to download your content</a>

<b>Instructions:</b>
1. Click the link above to start your download
2. Save the file to your desired location
3. Enjoy your premium Freepik content!

<i>Remember: This link is for your use only. Please don't share it with others.</i>

<b>Happy designing! 🎉</b>
      `;
