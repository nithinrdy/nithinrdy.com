export interface Project {
  name: string;
  description: string;
  logo: string;
  links: {
    platform: 'chromewebstore' | 'flathub' | 'github' | 'vscode' | 'code';
    href: string;
  }[];
  tech: string[];
}
