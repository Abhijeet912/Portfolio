const SITE_URL = "https://www.abhijeetanand.online";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}

/**
 * React 19 hoists <title>, <meta> and <link> rendered anywhere in the tree
 * into <head> — no helmet library needed.
 */
export default function Seo({ title, description, path, type = "website" }: SeoProps) {
  const url = `${SITE_URL}${path}`;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
