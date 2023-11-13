return {
	"tpope/vim-repeat",

	{
		"nvim-treesitter/nvim-treesitter",
		build = ":TSUpdate",
	},
	{
		"RRethy/nvim-treesitter-textsubjects",
		dependencies = { "nvim-treesitter" },
	},
	{
		"nvim-treesitter/nvim-treesitter-textobjects",
		dependencies = { "nvim-treesitter" },
	},
	{
		"nat-418/boole.nvim",
		config = function()
			require("boole").setup({
				mappings = {
					increment = "<C-a>",
					decrement = "<C-x>",
				},
			})
		end,
	},

	--  Plugins for Neovim in the terminal
	{
		"nvim-tree/nvim-tree.lua",
		cond = not isVscode,
		config = function()
			vim.g.loaded_netrw = 1
			vim.g.loaded_netrwPlugin = 1
			vim.opt.termguicolors = true

			vim.keymap.set("n", "<c-e>", ":NvimTreeFindFileToggle<CR>")

			require("nvim-tree").setup({
				view = {
					adaptive_size = true,
				},
			})

			vim.cmd("autocmd Colorscheme * highlight NvimTreeNormal guibg=#00000000 guifg=#9da5b3")
		end,
	},
	{
		"nvim-lualine/lualine.nvim",
		cond = not isVscode,
		dependencies = {
			"nvim-tree/nvim-web-devicons",
		},
	},
	{ "nvim-tree/nvim-web-devicons", cond = not isVscode },
	{ "tpope/vim-commentary", cond = not isVscode },
	{ "luckasRanarison/tree-sitter-hypr", cond = not isVscode },
	{ "NvChad/nvim-colorizer.lua", config = true, cond = not isVscode },
	{ "ellisonleao/gruvbox.nvim", priority = 1000 ,cond = not isVscode, 
	   config = function()
		print("hiii")
		require("gruvbox").setup({
			  terminal_colors = true, -- add neovim terminal colors
			  undercurl = true,
			  underline = true,
			  bold = true,
			  italic = {
				strings = true,
				emphasis = true,
				comments = true,
				operators = false,
				folds = true,
			  },
			  strikethrough = true,
			  invert_selection = true,
			  invert_signs = true,
			  invert_tabline = true,
			  invert_intend_guides = false,
			  inverse = true, -- invert background for search, diffs, statuslines and errors
			  contrast = "hard", -- can be "hard", "soft" or empty string
			  dim_inactive = false,
			  transparent_mode = true,
			})
	vim.o.background = "dark" -- or "light" for light mode
	vim.cmd("colorscheme gruvbox")
	end},
	
	-- { "lukas-reineke/indent-blankline.nvim", main = "ibl", config = function() 

	-- 	local highlight = {
    -- "CursorColumn",
    -- "Whitespace",
-- }

-- require("ibl").setup {
    -- indent = { highlight = highlight, char = "" },
    -- whitespace = {
        -- highlight = highlight,
        -- remove_blankline_trail = false,
    -- },
-- }

	-- end, cond = not isVscode
-- }
}
