#!/usr/bin/env node

import boxen from "boxen";
import chalk from "chalk";

const boxenOptions = {
  margin: 1,
  padding: 2,
  width: 59,
  title: "@baumannzone",
  titleAlignment: "center",
  borderStyle: "bold",
  borderColor: "yellow",
};

const intro = chalk("Hi! I'm ")
  + chalk.bold.underline.bgYellowBright("Jorge Baumann")
  + chalk(". I help developers grow their careers and build amazing software.\n\nFind me on the internet.\n\n");

const links = [
  {
    name: chalk.hex("#fff").bgHex("#0f111a")("Web"),
    url: "      https://baumannzone.dev"
  },
  {
    name: chalk.hex("#fff").bgHex("#1DA1F2")("𝕏"),
    url: "        https://x.com/baumannzone",
  },

  { name: chalk.hex("#fff").bgHex("#9146ff")("Twitch"), 
    url: "   https://twitch.tv/baumannzone"
  },
  
  {
    name: chalk.hex("#fff").bgHex("#6e5494")("GitHub"),
    url: "   https://github.com/baumannzone",
  },
  
  {
    name: chalk.hex("#fff").bgHex("#000")("CodePen"),
    url: "  https://codepen.io/baumannzone",
  },

  {
    name: chalk.hex("#fff").bgHex("#ee1d52")("Tik") + chalk.hex("#000").bgHex("#69c9d0")("Tok"),
    url: "   https://tiktok.com/@baumannzone",
  },

  { name: chalk.hex("#fff").bgHex("#000")("Threads"), 
    url: "  https://threads.net/baumannzone"
  },
  
  {
    name: chalk.hex("#fff").bgHex("#ff0000")("YouTube"),
    url: "  https://youtube.com/@baumannzone",
  },

  {
    name: chalk.hex("#0077b5").bgHex("#fff")("Linked") + chalk.hex("#fff").bgHex("#0077b5")("In"),
    url: " https://linkedin.com/in/baumannzone",
  }
];

const linkList = links.map((link) => `${link.name} ${link.url}`).join("\n");

console.log(boxen(intro + linkList, boxenOptions));