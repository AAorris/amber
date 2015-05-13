'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');
const $ = require('jquery').jquery;

// report crashes to the Electron project
require('crash-reporter').start();

// prevent window being GC'd
let mainWindow = null;

app.on('window-all-closed', app.quit );

app.on('ready', function () {
	mainWindow = new BrowserWindow({
		width: 1280,
		height: 720
	});

	mainWindow.loadUrl(`file://${__dirname}/index.html`);

	mainWindow.on('closed', function () {
		// deref the window
		// for multiple windows store them in an array
		mainWindow = null;
	});

	mainWindow.openDevTools();
});
