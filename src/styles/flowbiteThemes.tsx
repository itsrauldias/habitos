export const toggleSwitchTheme = {
    "root": {
        "base": "group flex rounded-lg focus:outline-none",
        "active": {
            "on": "cursor-pointer",
            "off": "cursor-not-allowed opacity-50"
        },
        "label": "ms-3 mt-0.5 text-start text-sm font-medium text-gray-900 dark:text-gray-300"
    },
    "toggle": {
        "base": "relative rounded-full border after:absolute after:rounded-full after:bg-white after:transition-all group-focus:ring-4 group-focus:ring-cyan-500/25",
        "checked": {
            "on": "after:translate-x-full after:border-white rtl:after:-translate-x-full",
            "off": "border-gray-200 bg-gray-200 dark:border-gray-600 dark:bg-gray-700",
            "color": {
                "blue": "border-blue-700 bg-blue-700",
                "dark": "bg-dark-700 border-dark-900",
                "failure": "border-red-900 bg-red-700",
                "gray": "border-gray-600 bg-gray-500",
                "green": "border-green-700 bg-green-600",
                "light": "bg-light-700 border-light-900",
                "red": "border-red-900 bg-red-700",
                "purple": "border-purple-900 bg-purple-700",
                "success": "border-green-500 bg-green-500",
                "yellow": "border-yellow-400 bg-yellow-400",
                "warning": "border-yellow-600 bg-yellow-600",
                "cyan": "border-cyan-500 bg-cyan-500",
                "lime": "border-lime-400 bg-lime-400",
                "indigo": "border-indigo-400 bg-indigo-400",
                "teal": "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4",
                "info": "border-cyan-600 bg-cyan-600",
                "pink": "border-pink-600 bg-pink-600"
            }
        },
        "sizes": {
            "sm": "h-5 w-9 min-w-9 after:left-px after:top-px after:h-4 after:w-4 rtl:after:right-px",
            "md": "h-6 w-11 min-w-11 after:left-px after:top-px after:h-5 after:w-5 rtl:after:right-px",
            "lg": "h-7 w-14 min-w-14 after:left-1 after:top-0.5 after:h-6 after:w-6 rtl:after:right-1"
        }
    }
}

export const badgeTheme = {
    "root": {
        "base": "flex h-fit items-center gap-1 font-semibold",
        "color": {
            "blue": "bg-blue-500 text-blue-100 group-hover:bg-blue-200 dark:bg-blue-200 dark:text-blue-900 dark:group-hover:bg-blue-300",
            "red": "bg-red-500 text-red-100 group-hover:bg-red-200 dark:bg-red-200 dark:text-red-900 dark:group-hover:bg-red-300",
            "green": "bg-green-500 text-green-100 group-hover:bg-green-200 dark:bg-green-200 dark:text-green-900 dark:group-hover:bg-green-300",
            "pink": "bg-pink-500 text-pink-100 group-hover:bg-pink-200 dark:bg-pink-200 dark:text-pink-900 dark:group-hover:bg-pink-300",
            "yellow": "bg-yellow-500 text-yellow-100 group-hover:bg-yellow-200 dark:bg-yellow-200 dark:text-yellow-900 dark:group-hover:bg-yellow-300",
            "purple": "bg-purple-500 text-purple-100 group-hover:bg-purple-200 dark:bg-purple-200 dark:text-purple-900 dark:group-hover:bg-purple-300"
        }
    }
}