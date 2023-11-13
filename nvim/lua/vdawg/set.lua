vim.opt.tabstop = 4
vim.opt.softtabstop = 4
vim.opt.shiftwidth = 4

vim.opt.smartindent = true

vim.o.termguicolors = true

vim.opt.scrolloff = 8

vim.opt.updatetime = 50

vim.opt.incsearch = true

vim.g.surround_no_mappings = 1

if not vim.g.vscodde then
	vim.opt.colorcolumn = "80"

	--Line numbers
	vim.wo.number = true
end
