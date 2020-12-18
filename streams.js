const { Writable, Readable, Duplex } = require('stream');

class CustomWritableStream extends Writable {

    write(chunk, encoding, callback){

        console.log(chunk.toString());

        callback();

    }

}

class CustomReadableStream extends Readable {

    constructor() {

        super();

        this.currentChar = 65;

    }

    _read(size) {

        this.push(String.fromCharCode(this.currentChar++));

        if(this.currentChar > 90){

            this.push(null);

        }

    }

}

class CustomDuplexStream extends Duplex {

    constructor() {

        super();

        this.currentChar = 65;

    }

    _read(size) {

        this.push(String.fromCharCode(this.currentChar++));

        if(this.currentChar > 90){

            this.push(null);

        }

    }

    _write(chunk, encoding, callback){

        console.log(chunk.toString());

        callback();

    }

}

const alphabet = new CustomReadableStream();

const duplexAlphabet = new CustomDuplexStream();

//alphabet.pipe(process.stdout);

process.stdin.pipe(duplexAlphabet).pipe(process.stdout);
