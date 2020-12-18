const express = require('express');

const fs = require('fs');

const path = require('path');

const app = express();

app.use('/', express.static(path.join(__dirname, 'pages')));

app.get('/thumb', (req, res) => {

    const thumbFilePath = path.join(__dirname, 'assets', 'thumb.jpg');

    res.sendFile(thumbFilePath);

});

app.get('/video', (req, res) => {

    const videoFilePath = path.join(__dirname, 'assets', 'sample-video.mp4');

    const stat = fs.statSync(videoFilePath);

    const fileSize = stat.size;

    const range = req.headers.range;

    if(!!range){

        const parts = range.replace(/bytes=/, "").split("-");

        const start = parseInt(parts[0], 10);
        const end = !!parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunkSize = (end - start) + 1;

        const videoFile = fs.createReadStream(videoFilePath, { start, end });

        const headers = {

            'Content-Range': `bytes ${start} - ${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4'

        };

        res.writeHead(206, headers);

        videoFile.pipe(res);

    } else {

        const headers = {

            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'

        };

        const videoFile = fs.createReadStream(videoFilePath);

        res.writeHead(200, headers);


        videoFile.pipe(res);


    }

});


const PORT = 3000;

console.log(`App listening on port ${3000}`);
app.listen(PORT);