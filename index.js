#!/usr/bin/env node

import boxen from "boxen";
import chalk from "chalk";

const ORIGINAL_AUTHOR_HANDLE = 'baumannzone';
const ORIGINAL_AUTHOR_NAME = 'Jorge Baumann';

// Parse command line args
const args = process.argv.slice(2);
const defaultHandle = args[0];
let customName = null;
const overrides = [];

// Parse remaining args
for (let i = 1; i < args.length; i++) {
  const arg = args[i];
  if (arg.includes('=')) {
    overrides.push(arg);
  } else {
    customName = arg;
  }
}

const handleOverrides = overrides.reduce((acc, override) => {
  const [services, handle] = override.split('=');
  services.split(',').forEach(service => {
    acc[service.toLowerCase()] = handle;
  });
  return acc;
}, {});

// Get handle from command line args or use default
const getHandle = (service) => {
  if (!service) return defaultHandle || ORIGINAL_AUTHOR_HANDLE;
  const serviceKey = service.toLowerCase();
  
  // If service is threads and no override exists, use instagram's handle
  if (serviceKey === 'threads' && !handleOverrides[serviceKey]) {
    return handleOverrides['instagram'] || defaultHandle || ORIGINAL_AUTHOR_HANDLE;
  }
  
  return handleOverrides[serviceKey] || defaultHandle || ORIGINAL_AUTHOR_HANDLE;
};

// Get the display name for the intro
const getDisplayName = () => {
  if (customName && customName.startsWith('"') && customName.endsWith('"')) {
    return customName.slice(1, -1); // Remove quotes
  }
  return customName || `@${defaultHandle || ORIGINAL_AUTHOR_HANDLE}`;
};

const getWebUrl = () => {
  const webOverride = getHandle('web');
  
  // Domain override case (starts with dot)
  if (webOverride.startsWith('.')) {
    return `${getHandle()}${webOverride}`;
  }
  
  // If it contains a dot, it's a full URL
  if (webOverride.includes('.')) {
    return webOverride;
  }
  
  return `${webOverride}.dev`;
};

// Define links first so we can use them to calculate width
const links = [
  {
    name: chalk.hex("#fff").bgHex("#0f111a")("Web"),
    baseUrl: "https://",
    service: "web",
    get url() { 
      return chalk.dim(this.baseUrl.padStart(this.baseUrl.length + 6)) + getWebUrl();
    }
  },
  {
    name: chalk.hex("#fff").bgHex("#1DA1F2")("𝕏"),
    baseUrl: "https://x.com/",
    service: "twitter",
    get url() { return chalk.dim(this.baseUrl.padStart(this.baseUrl.length + 8)) + getHandle(this.service) }
  },
  {
    name: chalk.hex("#fff").bgHex("#9146ff")("Twitch"),
    baseUrl: "https://twitch.tv/",
    service: "twitch",
    get url() { return chalk.dim(this.baseUrl.padStart(this.baseUrl.length + 3)) + getHandle(this.service) }
  },
  {
    name: chalk.hex("#fff").bgHex("#6e5494")("GitHub"),
    baseUrl: "https://github.com/",
    service: "github",
    get url() { return chalk.dim(this.baseUrl.padStart(this.baseUrl.length + 3)) + getHandle(this.service) }
  },
  {
    name: chalk.hex("#fff").bgHex("#000")("CodePen"),
    baseUrl: "https://codepen.io/",
    service: "codepen",
    get url() { return chalk.dim(this.baseUrl.padStart(this.baseUrl.length + 2)) + getHandle(this.service) }
  },
  {
    name: chalk.hex("#fff").bgHex("#ee1d52")("Tik") + chalk.hex("#000").bgHex("#69c9d0")("Tok"),
    baseUrl: "https://tiktok.com/@",
    service: "tiktok",
    get url() { return chalk.dim(this.baseUrl.padStart(this.baseUrl.length + 3)) + getHandle(this.service) }
  },
  {
    name: chalk.hex("#fff").bgHex("#000")("Threads"),
    baseUrl: "https://threads.net/@",
    service: "threads",
    get url() { return chalk.dim(this.baseUrl.padStart(this.baseUrl.length + 2)) + getHandle(this.service) }
  },
  {
    name: chalk.hex("#fff").bgHex("#ff0000")("YouTube"),
    baseUrl: "https://youtube.com/@",
    service: "youtube",
    get url() { return chalk.dim(this.baseUrl.padStart(this.baseUrl.length + 2)) + getHandle(this.service) }
  },
  {
    name: chalk.hex("#0077b5").bgHex("#fff")("Linked") + chalk.hex("#fff").bgHex("#0077b5")("In"),
    baseUrl: "https://linkedin.com/in/",
    service: "linkedin",
    get url() { return chalk.dim(this.baseUrl.padStart(this.baseUrl.length + 1)) + getHandle(this.service) }
  }
];

// Calculate minimum width needed based on longest line
const getMinWidth = () => {
  // Get longest URL from links array considering service-specific handles
  return Math.max(...links.map(link => {
    const handle = getHandle(link.service);
    return link.baseUrl.length + handle.length + 22;
  }));
};

const boxenOptions = {
  margin: 1,
  padding: 1.5,
  width: Math.max(56, getMinWidth()),
  title: `@${defaultHandle || ORIGINAL_AUTHOR_HANDLE}`,
  titleAlignment: "center",
  borderStyle: "bold",
  borderColor: "yellowBright",
};

const intro = chalk("Hi! I'm ")
  + chalk.black.bgYellowBright(getDisplayName())
  + chalk(". I help developers grow their careers and build amazing software.\n\nFind me on the internet.\n\n");

const linkList = links.map((link) => `${link.name} ${link.url}`).join("\n");

console.log(boxen(intro + linkList, boxenOptions));