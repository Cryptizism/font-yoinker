# font-yoinker
A website that utilizes pupeteer to give all font responses from a site

## This repo is archived but was functional at the time of closing with 95% sucess rate

## Installation Steps
1. Install [node.js](https://nodejs.org/en)
2. Clone this repo
3. Run `npm i` in the command prompt
4. Change `.env.example` to `.env`
5. (Optional) Change port in `.env` if you wish
6. Run `node .` in the command prompt
7. Access `localhost:PORT` on a browser

## How does it work?
The website works by using pupeteer to visit a website.
Once a website is visited the requests are listened to and will find any recognisable font files and provide the url location of them to the user.

## Why doesn't it do it by XYZ
I have tried a few ways but this was the most reliable as many other options had CORS protection
