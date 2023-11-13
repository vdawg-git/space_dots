return {
	"folke/flash.nvim",
	event = "VeryLazy",
	---@type Flash.Config
	opts = {},
    -- stylua: ignore
    keys = {
      { "s", mode = { "n", "o", "x" }, function() require("flash").jump() end, desc = "Flash" },
      { "S", mode = { "n", "o", "x" }, function() require("flash").treesitter() end, desc = "Flash Treesitter" },
      { "r", mode = "o", function() require("flash").remote() end, desc = "Remote Flash" },
      { "R", mode = { "o", "x" }, function() require("flash").treesitter_search() end, desc = "Treesitter Search" },
      { "<c-s>", mode = { "c" }, function() require("flash").toggle() end, desc = "Toggle Flash Search" },
    },
	init = function()
		if vim.g.vscode == 1 then
			vim.cmd([[
augroup FlashColors
autocmd!
autocmd ColorScheme * highlight FlashBackdrop guibg=#1c1c1c 
autocmd ColorScheme * highlight FlashMatch guibg=#a6c8c0 guifg=black 
autocmd ColorScheme * highlight FlashCurrent guibg=#fca972 guifg=black 
autocmd ColorScheme * highlight FlashLabel guifg=#101010 guibg=#fda697 
augroup
]])
		else
			vim.cmd([[
augroup FlashColors
autocmd!
autocmd ColorScheme * highlight FlashBackdrop guibg=#1c1c1c
augroup
]])
		end
	end,
}
