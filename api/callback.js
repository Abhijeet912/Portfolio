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
<html><body>
<p id="status" style="font-family:sans-serif">Completing login…</p>
<script>
  (function () {
    var payload = ${JSON.stringify(payload)};
    var status = document.getElementById("status");
    if (!window.opener) {
      status.textContent =
        "Could not reach the CMS window (the popup lost its opener). " +
        "Close this window and try logging in again.";
      return;
    }
    // Step 1: announce ourselves. The CMS replies by echoing the exact
    // string "authorizing:github" from its own origin.
    // Step 2: send the token to that origin. Keep the listener alive and
    // ignore unrelated messages (browser extensions are chatty).
    window.addEventListener(
      "message",
      function (e) {
        if (e.data !== "authorizing:github") return;
        console.log("Decap handshake from", e.origin);
        window.opener.postMessage(payload, e.origin);
        status.textContent = "Login complete — this window will close.";
      },
      false
    );
    window.opener.postMessage("authorizing:github", "*");
    status.textContent = "Authorized. Finishing handshake…";
  })();
</script>
</body></html>`;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
