export interface Project {
  name: string;
  description: string;
  logo: string;
  links: { platform: 'chromewebstore' | 'flathub' | 'github' | 'vscode'; href: string }[];
  tech: string[];
}
