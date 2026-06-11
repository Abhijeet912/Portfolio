// Decap CMS — GitHub OAuth (step 2): exchange the code for a token and
// hand it back to the CMS window using Decap's postMessage handshake.
export default async function handler(req, res) {
  const code = req.query?.code;
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  if (!code || !clientId || !clientSecret) {
    res.status(400).send("Missing code or OAuth env vars");
    return;
  }

  let payload;
  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const data = await tokenRes.json();
    if (data.error) {
      payload = `authorization:github:error:${JSON.stringify(data)}`;
    } else {
      payload = `authorization:github:success:${JSON.stringify({
        token: data.access_token,
        provider: "github",
      })}`;
    }
  } catch (err) {
    payload = `authorization:github:error:${JSON.stringify({ message: String(err) })}`;
  }

  const html = `<!doctype html>
<html><body><script>
  (function () {
    function receiveMessage(e) {
      window.opener.postMessage(${JSON.stringify(payload)}, e.origin);
      window.removeEventListener("message", receiveMessage, false);
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })();
</script>
<p style="font-family:sans-serif">Authorized. You can close this window.</p>
</body></html>`;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
