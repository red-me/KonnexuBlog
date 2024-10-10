const DEFAULT_THEME = {
	"button_primary": {
		"style": {
			"color": "#ffffff",
			"backgroundColor": "rgb(25 118 210)"
		},
		"className": "relative shadow-sm  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
	},
	"header": {
		"style": {
			"color": "#333333",
			"backgroundColor": "#ffffff"
		},
		"className": "flex flex-col w-full shadow-xs  transition-all duration-1000 "
	},
	"header_list": {
		"style": {},
		"className": "flex flex-col w-full shadow-xs transition-all duration-1000 mx-auto  max-w-screen-xl"
	},
	"background": {
		"style": {},
		"className": ""
	},
	"navigation": {
		"style": {
			"color": "#ffffff",
			"backgroundColor": "rgb(255 138 101)"
		},
		"className": "mx-auto w-full  py-1  lg:py-1"
	},
	"navigation_list": {
		"style": {},
		"className": "w-full max-w-screen-xl "
	},
	"navigation_item": {
		"style": {
			"color": "#ffffff"
		},
		"className": ""
	},
	"navigation_item_icon": {
		"style": {},
		"className": "w-4 h-4 cursor-pointer shadow-sm"
	},
	"navigation_item_text": {
		"style": {
			"maxWidth": "200px",
			"overflow": "hidden",
			"whiteSpace": "nowrap",
			"textOverflow": "ellipsis"
		},
		"className": ""

	}
}


const SAMPLE_THEME = {
	"button_primary": {
		"style": {
			"color": "#FDE68A",
			"backgroundColor": "#059669"
		},
		"className": "relative uppercase shadow-md  text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
	},
	"header": {
		"style": {
			"color": "#333333",
			"backgroundColor": "#ffffff"
		},
		"className": "flex flex-col w-full shadow-xs  transition-all duration-1000 "
	},
	"header_list": {
		"style": {},
		"className": "flex flex-col w-full shadow-xs transition-all duration-1000 mx-auto"
	},
	"background": {
		"style": {
			"backgroundColor": "rgb(247 254 231)"
		},
		"className": "bg-green-300"
	},
	"navigation": {

		"style": {
			"color": "#ffffff",
			"maxWidth": "1920px",
			"backgroundColor": "#059669"
		},
		"className": "mx-auto w-full  py-2  lg:py-2 max-w-max"
	},
	"navigation_list": {
		"style": {
			"maxWidth": "1280px"
		},
		"className": "max-w-max"
	},
	"navigation_item": {
		"style": {
			"color": "#FDE68A"
		},
		"className": ""
	},
	"navigation_item_icon": {
		"style": {},
		"className": "w-6 h-6 "
	},
	"navigation_item_text": {
		"style": {
			"color": "#FDE68A",
			"maxWidth": "1000px"
		},
		"className": ""
	}
}

module.exports = { DEFAULT_THEME, SAMPLE_THEME }