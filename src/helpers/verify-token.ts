export function verifyToken(token: string | undefined): string {
  if (!token) {
    throw new Error("Bot token invalid or not provided");
  }
  return token;
}
