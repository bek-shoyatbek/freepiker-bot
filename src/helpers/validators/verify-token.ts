export function verifyToken(token: string | undefined) {
  if (!token) {
    console.error("Bot token invalid or not provided");
  }
  return token as string;
}
