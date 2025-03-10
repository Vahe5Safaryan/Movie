import {Button, CssBaseline, ThemeProvider} from "@mui/material";
import React, {ReactNode} from "react";
import useTheme from "../../hooks/useTheme";

const AppThemeProvider = ({children}: {children: ReactNode}) => {
    const [theme, darkMode, toggleDarkMode] = useTheme();

    return <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ padding: 15 }}>
            <Button
                style={{ margin: 15 }}
                variant="contained"
                color="primary"
                onClick={toggleDarkMode}
            >
                {darkMode ? "LIGHT MODE" : "DARK MODE"}
            </Button>
            {children}
        </div>
    </ThemeProvider>
}

export default AppThemeProvider;