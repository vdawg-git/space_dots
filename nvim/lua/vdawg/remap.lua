-- Based on ThePrimeagen config
vim.g.mapleader = " "

local map = vim.keymap.set

map("n", "<leader>pv", vim.cmd.Ex)

-- Move lines around in visual mode like VS Code alt+arrow up/down
map("v", "J", ":m '>+1<CR>gv=gv")
map("v", "K", ":m '<-2<CR>gv=gv")

--  Normal J, concat lines, but cursor stays in place
map("n", "J", "mzJ`z")

--  Half page jumping, but cursor stays in the middle
map("n", "<C-d>", "<C-d>zz")
map("n", "<C-u>", "<C-u>zz")

--  Like normal n / N, but cursor stays in the middle
map("n", "n", "nzzzv")
map("n", "N", "Nzzzv")

-- Paste but keep pasted text in regiser
map("x", "<leader>p", [["_dP]])
-- Delete operator but does not override regiser
map({ "n", "v" }, "<leader>d", [["_d]])

--  Yank in the system clipboard
map({ "n", "v" }, "<leader>y", [["+y]])
map("n", "<leader>Y", [["+Y]])

-- Do not yank with x, only delete
map({ "n", "v" }, "x", [["_x"]])

-- Replace all instances of the selected text
map("v", "<leader><leader>f", [["hy:%s#<C-r>h##g<left><left><left>]])
-- Replace all instances of the word under the cursor
map("n", "<leader><leader>f", [[:%s/\<<C-r><C-w>\>/<C-r><C-w>]])

if vim.g.vscode then
	-- Toggle comments with the native VS Code API
	map("x", "gc", "<Plug>VSCodeCommentary")
	map("n", "gc", "<Plug>VSCodeCommentary")
	map("o", "gc", "<Plug>VSCodeCommentary")
	map("n", "gcc", "<Plug>VSCodeCommentaryLine")


	map("n", "gcc", "<Plug>VSCodeCommentaryLine")

	-- Toggle explore page
	map("n", "<C-e>", function()
		print("hii")
		vim.fn["VSCodeCall"]("workbench.files.action.focusFilesExplorer")
	end)

	-- Close editor
	map("n", "<leader><C-w>", function()
		vim.fn["VSCodeCall"]("workbench.action.closeActiveEditor")
	end)
end
