// Decap CMS — GitHub OAuth (step 1): redirect the admin to GitHub's consent screen.
// Requires env vars on Vercel: OAUTH_GITHUB_CLIENT_ID, OAUTH_GITHUB_CLIENT_SECRET
export default function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    res.status(500).send("Missing OAUTH_GITHUB_CLIENT_ID env var");
    return;
  }
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const redirectUri = `https://${host}/api/callback`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "repo,user",
  });
  res.writeHead(302, {
    Location: `https://github.com/login/oauth/authorize?${params.toString()}`,
  });
  res.end();
}
