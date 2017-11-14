# encrypt.io
### Ohio State CSE 4471 Express Web Application for Encryption Implementation and Exploration

Encrypt.io is a web application that accepts uploaded text files as an input and allows users to download an encrypted version of these files. We have implemented 3 encryption algorithms in pure JavaScript for this project, two being relatively insecure and the other being something you should probably never do with JavaScript in the first place:

* Caesar Ciphers
* One Time Pads
* AES

## Installation

While typically run on a Heroku server, one can install the source code for development on your system by doing the following:
1. Ensure you have Node Package Manager (NPM) installed on your local machine.
2. Navigate to the encrypt.io directory, and run ```npm install``` to install the JS package dependencies the website utilizes.
3. Use the command ```npm start``` to start the webserver, and navigate to localhost:3000 to see the changes you have made to the code.

## API

The encrypt.io API is simple. Below are the different routes used to upload files to the server, along with the needed information for the encryption process:

| Tables|Data Required| Method|Return Data|
|---|---|---|---|
| /upload/encrypt/caesar/|File, Shift magnitude|POST|Encrypted file|
| /upload/encrypt/onetimepad/|File|POST|Encrypted File, key phrase|
| /upload/encrypt/AES|File| POST|Encrypted file, key phrase|
| /upload/decrypt/caesar/|Encrypted file, Original shift magnitude|POST|Decrypted file|
| /upload/decrypt/pad/|File, Provided key phrase|POST|Decrypted File|
| /upload/decrypt/AES|File, Provided key phrase| POST|Decrypted file|
