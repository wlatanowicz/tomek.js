#!/bin/sh

tsc --module commonjs build.ts && node build.js
