//Express and Router
const express = require('express');
const router = express.Router();
//puppeteer
const puppeteer = require('puppeteer');

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
    //navigate to site
    try {
        await page.goto(site, { waitUntil: 'domcontentloaded' });
    } catch (error) {
        res.send('Could not reach that site')
        return;
    }
    //get font from site
    var fonts = [];
    page.on('response', (response) => {
        //if the response is a font
        if(response.headers()['content-type']?.startsWith('font/') || response.url().endsWith('.woff' || '.woff2' || '.ttf' || '.otf')){
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
    //close once done and send response
    page.on('load', async () => {
        await browser.close();
        if(fonts.length == 0){
            res.send('No fonts found');
        } else {
            res.render('page', {fonts: fonts});
        }
    });
});

module.exports = router;