return {
	"kylechui/nvim-surround",
	version = "*", -- Use for stability; omit to use `main` branch for the latest features
	event = "VeryLazy",
	config = function()
		require("nvim-surround").setup({
			keymaps = {
				insert = "<C-z>o",
				insert_line = "<C-z>O",
				normal = "yo",
				normal_cur = "yoo",
				normal_line = "yO",
				normal_cur_line = "yOO",
				visual = "O",
				visual_line = "gO",
				delete = "do",
				change = "co",
			},
		})
	end,
}
