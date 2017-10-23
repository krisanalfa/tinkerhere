const fs = require('fs');
const path = require('path');
const which = require('which');
const vscode = require('vscode');

function activate(context) {
    if (!vscode.workspace.workspaceFolders.length) {
        return;
    }

    let disposable = vscode.commands.registerCommand('extension.tinkerHere', function () {
        const rootPath = vscode.workspace.workspaceFolders.shift().uri.path;

        if (!fs.existsSync(path.join(rootPath, 'artisan'))) {
            vscode.window.showErrorMessage('artisan file does not exist!');

            return;
        }

        const php = vscode.workspace.getConfiguration('tinkerHere').get('php') || which.sync('php', { nothrow: true });

        if (!php) {
            vscode.window.showErrorMessage('Path to executable php is not configured or does not exist!');
        }

        const terminal = vscode.window.createTerminal('tinker', php, ['artisan', 'tinker']);

        terminal.show();
    });

    context.subscriptions.push(disposable);
}

exports.activate = activate;

function deactivate() {
    // no-op
}

exports.deactivate = deactivate;