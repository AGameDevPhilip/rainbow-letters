import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log("🌈 Rainbow Letters extension activated");
    const legend = new vscode.SemanticTokensLegend(
        ["letter"],
        ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]
    );

	const selector: vscode.DocumentSelector = [{ language: '*', scheme: 'file' }]
    context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider(selector, new RainbowProvider(), legend));
}

class RainbowProvider implements vscode.DocumentSemanticTokensProvider {
    async provideDocumentSemanticTokens(document: vscode.TextDocument): Promise<vscode.SemanticTokens> {
        console.log("🧠 RainbowProvider running for document:", document.uri.fsPath);
        const builder = new vscode.SemanticTokensBuilder();

        for (let line = 0; line < document.lineCount; line++) {
            const text = document.lineAt(line).text;
            for (let char = 0; char < text.length; char++) {
                const modifierIndex = char % 16;
                const modifierBit = 1 << modifierIndex; // set only one bit for the modifier
                builder.push(line, char, 1, 0, modifierBit);
            }
        }

        return builder.build();
    }
}