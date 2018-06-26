// 用户设置
const userSetting = {
    "window.zoomLevel": 0,
    "editor.renderIndentGuides": true,
    "editor.mouseWheelZoom": true,
    "files.associations": {
        "*.vue": "vue",
        "*.jsx": "javascriptreact"
    },
    "terminal.integrated.fontSize": 16,
    "typescript.check.tscVersion": false,
    "workbench.colorTheme": "Atom One Dark",
    "workbench.iconTheme": "vs-seti",
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "vue",
        "typescript",
        "typescriptreact"
    ]
};
// 快捷键设置
const key = [
    {
        "key": "ctrl+shift+down",
        "command": "editor.action.moveLinesDownAction",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "ctrl+shift+up",
        "command": "editor.action.moveLinesUpAction",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "ctrl+up",
        "command": "editor.action.insertCursorAbove",
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+down",
        "command": "editor.action.insertCursorBelow",
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+alt+down",
        "command": "workbench.action.terminal.scrollDown",
        "when": "terminalFocus"
    },
    {
        "key": "ctrl+alt+up",
        "command": "workbench.action.terminal.scrollUp",
        "when": "terminalFocus"
    },
    {
        "key": "ctrl+shift+/",
        "command": "editor.action.blockComment",
        "when": "editorTextFocus && !editorReadonly"
    }
];
