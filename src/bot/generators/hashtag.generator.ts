export function generateHashTagFromFilename(filename: string) {
  const searchParams = filename.split("-").map((param) => `#${param} `);
  searchParams.pop();
  return searchParams.join("");
}
