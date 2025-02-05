#!/usr/bin/env node

import boxen from "boxen";
import chalk from "chalk";

// Get handle from command line args or use default
const handle = process.argv[2] || 'baumannzone';

// Define links first so we can use them to calculate width
const links = [
  {
    name: chalk.hex("#fff").bgHex("#0f111a")("Web"),
    baseUrl: "https://",
    get url() { return chalk.dim(this.baseUrl.padStart(this.baseUrl.length + 6)) + `${handle}.dev` }
  },
  {
    name: chalk.hex("#fff").bgHex("#1DA1F2")("𝕏"),
    baseUrl: "https://x.com/",
    get url() { return chalk.dim(this.baseUrl.padStart(this.baseUrl.length + 8)) + handle }
  },
  {
    name: chalk.hex("#fff").bgHex("#9146ff")("Twitch"),
    baseUrl: "https://twitch.tv/",
    get url() { return chalk.dim(this.baseUrl.padStart(this.baseUrl.length + 3)) + handle }
  },
  {
    name: chalk.hex("#fff").bgHex("#6e5494")("GitHub"),
    baseUrl: "https://github.com/",
    get url() { return chalk.dim(this.baseUrl.padStart(this.baseUrl.length + 3)) + handle }
  },
  {
    name: chalk.hex("#fff").bgHex("#000")("CodePen"),
    baseUrl: "https://codepen.io/",
    get url() { return chalk.dim(this.baseUrl.padStart(this.baseUrl.length + 2)) + handle }
  },
  {
    name: chalk.hex("#fff").bgHex("#ee1d52")("Tik") + chalk.hex("#000").bgHex("#69c9d0")("Tok"),
    baseUrl: "https://tiktok.com/@",
    get url() { return chalk.dim(this.baseUrl.padStart(this.baseUrl.length + 3)) + handle }
  },
  {
    name: chalk.hex("#fff").bgHex("#000")("Threads"),
    baseUrl: "https://threads.net/",
    get url() { return chalk.dim(this.baseUrl.padStart(this.baseUrl.length + 2)) + handle }
  },
  {
    name: chalk.hex("#fff").bgHex("#ff0000")("YouTube"),
    baseUrl: "https://youtube.com/@",
    get url() { return chalk.dim(this.baseUrl.padStart(this.baseUrl.length + 2)) + handle }
  },
  {
    name: chalk.hex("#0077b5").bgHex("#fff")("Linked") + chalk.hex("#fff").bgHex("#0077b5")("In"),
    baseUrl: "https://linkedin.com/in",
    get url() { return chalk.dim(this.baseUrl.padStart(this.baseUrl.length + 1)) + "/" + handle }
  }
];

// Calculate minimum width needed based on longest line
const getMinWidth = (handle) => {
  // Get longest base URL from links array
  const longestBaseUrl = Math.max(...links.map(link => link.baseUrl.length));
  return longestBaseUrl + handle.length + 22;
};

const boxenOptions = {
  margin: 1,
  padding: 1.5,
  width: Math.max(56, getMinWidth(handle)), // Min width of 56, or larger if needed
  title: `@${handle}`,
  titleAlignment: "center",
  borderStyle: "bold",
  borderColor: "yellowBright",
};

const intro = chalk("Hi! I'm ")
  + chalk.black.bgYellowBright("Jorge Baumann")
  + chalk(". I help developers grow their careers and build amazing software.\n\nFind me on the internet.\n\n");

const linkList = links.map((link) => `${link.name} ${link.url}`).join("\n");

console.log(boxen(intro + linkList, boxenOptions));