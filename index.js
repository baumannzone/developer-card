#!/usr/bin/env node

import boxen from "boxen";
import chalk from "chalk";

const boxenOptions = {
  margin: .5,
  padding: 1,
  width: 49,
  title: "@baumannzone",
  titleAlignment: "center",
  borderStyle: "round",
  borderColor: "#8c52ff",
};

const intro = chalk("Hi 👋! I'm Jorge Baumann ") + chalk.italic("aka ") + chalk.bold.underline.bgMagentaBright("Baumannzone") + chalk(". I help developers to grow their careers and build amazing software.\n\nFind me on the internet.\n\n");

const links = [
  {
    name: chalk.hex("#fff").bgHex("#0f111a")("Web"),
    url: "     https://baumannzone.dev"
  },
  {
    name: chalk.hex("#fff").bgHex("#1DA1F2")("𝕏"),
    url: "       https://twitter.com/baumannzone",
  },

  { name: chalk.hex("#fff").bgHex("#9146ff")("Twitch"), 
    url: "  https://twitch.tv/baumannzone"
  },
  
  {
    name: chalk.hex("#fff").bgHex("#6e5494")("GitHub"),
    url: "  https://github.com/baumannzone",
  },
  
  {
    name: chalk.hex("#fff").bgHex("#ee1d52")("Tik") + chalk.hex("#000").bgHex("#69c9d0")("Tok"),
    url: "  https://tiktok.com/@baumannzone",
  },

  { name: chalk.hex("#fff").bgHex("#000")("Threads"), 
    url: " https://threads.net/baumannzone"
  },
  
  {
    name: chalk.hex("#fff").bgHex("#ff0000")("YouTube"),
    url: " https://youtube.com/@baumannzone",
  },
];

const linkList = links.map((link) => `${link.name} ${link.url}`).join("\n");

console.log(boxen(intro + linkList, boxenOptions));