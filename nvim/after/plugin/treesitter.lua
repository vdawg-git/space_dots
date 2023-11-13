require("nvim-treesitter.configs").setup({
	-- A list of parser names, or "all"
	ensure_installed = { "vimdoc", "javascript", "typescript", "lua", "svelte" },

	-- Install parsers synchronously (only applied to `ensure_installed`)
	sync_install = false,

	-- Automatically install missing parsers when entering buffer
	-- Recommendation: set to false if you don't have `tree-sitter` CLI installed locally
	auto_install = true,

	highlight = {
		enable = vim.g.vscode == nil or not vim.g.vscode,
	},

	textobjects = {
		select = {
			enable = true,
			lookahead = true,
			keymaps = {
				["ia"] = "@parameter.inner",
				["aa"] = "@parameter.outer",
			},
			include_surrounding_whitespace = true,
		},
		move = {
			enable = true,
			goto_next_start = {
				["]m"] = "@function.outer",
			},
			goto_previous_start = {
				["[m"] = "@function.outer",
			},
		},
	},

	endwise = {
		enable = true,
	},

	textsubjects = {
		enable = true,
		prev_selection = ",",
		keymaps = {
			["."] = "textsubjects-smart",
			[";"] = "textsubjects-container-outer",
			["i;"] = "textsubjects-container-inner",
		},
	},
})

-- For https://github.com/luckasRanarison/tree-sitter-hypr
local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
parser_config.hypr = {
	install_info = {
		url = "https://github.com/luckasRanarison/tree-sitter-hypr",
		files = { "src/parser.c" },
		branch = "master",
	},
	filetype = "hypr",
}
