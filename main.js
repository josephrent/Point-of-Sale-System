const electron = require('electron');
const url = require('url');
const path = require('path');
const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

//Listen for app to be ready
app.on('ready', function (){
	//create new window
	mainWindow = new BrowserWindow({});
	//load html file
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'mainWindow.html'),
		protocol: 'file:',
		slashes: true
	}));
	// build menu from mainMenuTemplate
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	//insert Menu
	Menu.setApplicationMenu(mainMenu)
});

//Handle create add window
function createAddWindow(){
	addWindow = new BrowserWindow({
		width: 300,
		height: 200,
		title: 'Add Item to list'
	});
	//load addwindow html into function
	addWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'addWindow.html'),
		protocol: 'file:',
		slashes: true
	}));
}

//Create menu template
const mainMenuTemplate = [
	{
		label: 'File',
		submenu: [{
			label: 'Add Item',
			click(){
				createAddWindow();
			}
		},
		{
			label: 'Remove Item'
		},
		{
			label: 'Quit',
			accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
			click(){
				app.quit();
			}
		}
		]
	}

]
