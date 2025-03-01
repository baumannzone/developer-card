#!/usr/bin/env node

import boxen from "boxen";
import chalk from "chalk";
import { parseArgs, ORIGINAL_AUTHOR_HANDLE } from './utils.js';

const { defaultHandle, getHandle, getDisplayName, getWebUrl } = parseArgs(process.argv.slice(2));

// Define links first so we can use them to calculate width
const links = [
  {
    name: chalk.hex("#fff").bgHex("#0f111a")("Web"),
    baseUrl: "https://",
    service: "web",
    get url() { 
      return chalk.dim(this.baseUrl.padStart(this.baseUrl.length + 6)) + getWebUrl(getHandle);
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