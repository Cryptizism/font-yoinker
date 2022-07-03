//Express and Router
const express = require('express');
const router = express.Router();
//puppeteer
const puppeteer = require('puppeteer');

function isFont(font) {
    return font.endsWith('.ttf') || font.endsWith('.woff') || font.endsWith('.woff2') || font.endsWith('.otf');
}

// host:port/
router.get('/', (req, res) => {
    res.render('index');
});

// host:port/font/:site
router.get('/font/:site', async (req, res) => {
    //get site from url
    var site = req.params.site;
    try{
        site = decodeURIComponent(site); 
    }catch(err){
        res.send('Please enter a valid URL');
        return;
    }
    //initalize puppeteer
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    //get font from site
    var fonts = [];
    page.on('request', (response) => {
        var url = response.url();
        //if the response is a font
        if(response.headers()['content-type']?.startsWith('font/') || isFont(response.url())){
            //add to fonts array
            var url = response.url();
            if(url.startsWith('https://fonts.gstatic.com/s/')){
                var name = url.split('/')[4];
            } else {
                var splitname = url.split('/');
                var file = splitname[splitname.length - 1];
                var name = file.split('.')[0];
            }
            var font =  {
                id: fonts.length,
                url: url,
                name: name
            }
            fonts.push(font);
        }
    });
    //navigate to site
    try {
        await page.goto(site, { waitUntil: 'domcontentloaded' });
    } catch (error) {
        res.send('Could not reach that site')
        return;
    }
    //close once done and send response
    page.on('load', async () => {
        if(fonts.length == 0){
            await page.waitForTimeout(3000);
            if(fonts.length == 0){
                res.send('No fonts found');
            } else {
                res.render('page', {fonts: fonts});
            }
        } else {
            res.render('page', {fonts: fonts});
        }
        await browser.close();
    });
});

module.exports = router;