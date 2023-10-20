#!/bin/bash
tsc app.ts
node app.js
json-server --watch db.json --port=3004