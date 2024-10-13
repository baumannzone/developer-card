#!/usr/bin/env node

import boxen from "boxen";
import chalk from "chalk";

const boxenOptions = {
  margin: 1,
  padding: 1.5,
  width: 56,
  title: "@baumannzone",
  titleAlignment: "center",
  borderStyle: "bold",
  borderColor: "yellowBright",
};

const intro = chalk("Hi! I'm ")
  + chalk.black.bgYellowBright("Jorge Baumann")
  + chalk(". I help developers grow their careers and build amazing software.\n\nFind me on the internet.\n\n");

const links = [
  {
    name: chalk.hex("#fff").bgHex("#0f111a")("Web"),
    url: chalk.dim("      https://") + "baumannzone.dev"
  },
  {
    name: chalk.hex("#fff").bgHex("#1DA1F2")("𝕏"),
    url: chalk.dim("        https://x.com/") + "baumannzone",
  },

  { name: chalk.hex("#fff").bgHex("#9146ff")("Twitch"), 
    url: chalk.dim("   https://twitch.tv") + "/baumannzone"
  },
  
  {
    name: chalk.hex("#fff").bgHex("#6e5494")("GitHub"),
    url: chalk.dim("   https://github.com") + "/baumannzone",
  },
  
  {
    name: chalk.hex("#fff").bgHex("#000")("CodePen"),
    url: chalk.dim("  https://codepen.io") + "/baumannzone",
  },

  {
    name: chalk.hex("#fff").bgHex("#ee1d52")("Tik") + chalk.hex("#000").bgHex("#69c9d0")("Tok"),
    url: chalk.dim("   https://tiktok.com") + "/@baumannzone",
  },

  { name: chalk.hex("#fff").bgHex("#000")("Threads"), 
    url: chalk.dim("  https://threads.net") + "/baumannzone"
  },
  
  {
    name: chalk.hex("#fff").bgHex("#ff0000")("YouTube"),
    url: chalk.dim("  https://youtube.com") + "/@baumannzone",
  },

  {
    name: chalk.hex("#0077b5").bgHex("#fff")("Linked") + chalk.hex("#fff").bgHex("#0077b5")("In"),
    url: chalk.dim(" https://linkedin.com/in") + "/baumannzone",
  }
];

const linkList = links.map((link) => `${link.name} ${link.url}`).join("\n");

console.log(boxen(intro + linkList, boxenOptions));