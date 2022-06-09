// theme.ts (Version 2 needs to be a tsx file, due to usage of StyleFunctions)
import { extendTheme } from "@chakra-ui/react"
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools"

// Version 1: Using objects
const theme = extendTheme({
	styles: {
		global: {
			// styles for the `body`
			body: {
				bg: "black.400",
				color: "white",
			},
			// styles for the `a`
            colors: {
                brand: {
                    primary: "#BB86FC",
                    primary_variant: "#3700B3",
                    secondary: "#03DAC6",
                    background: "#121212",
                    surface: "#121212",
                    error: "#CF6679",
                    on_primary: "#000000",
                    on_secondary: "#000000",
                    on_background: "#FFFFFF",
                    on_surface: "#FFFFFF",
                    on_error: "#000000",
                },
            },
		},
	},
})

export default theme
