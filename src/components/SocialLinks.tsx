import { site } from "../services/content";
import { CodeIcon, GithubIcon, LinkedinIcon, MailIcon } from "./icons";

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

export default function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  const links = [
    { href: site.github, label: "GitHub", Icon: GithubIcon },
    { href: site.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    ...(site.leetcode ? [{ href: site.leetcode, label: "LeetCode", Icon: CodeIcon }] : []),
    { href: `mailto:${site.email}`, label: "Email", Icon: MailIcon },
  ];

  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="glass group flex h-11 w-11 items-center justify-center rounded-xl text-haze-300 transition-all duration-300 hover:-translate-y-1 hover:border-neon-cyan/40 hover:text-neon-cyan hover:shadow-[0_8px_30px_-6px_rgba(34,211,238,0.35)]"
        >
          <Icon className={iconClassName ?? "h-5 w-5"} />
        </a>
      ))}
    </div>
  );
}
