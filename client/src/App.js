import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Products from "scenes/products";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">

      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            
            <Route element={ <Layout/> }>  {/* Every layout will have the nav bar and the side bar */}
              <Route path="/" element={ <Navigate to="/dashboard" replace/> }/> {/* Default navigation */}
              <Route path="/dashboard" element={ <Dashboard/> }/> {/* This is for when you sign into the homepage and get redirected here */}
              <Route path="/products" element={ <Products/>} />

            </Route>
          </Routes>

        </ThemeProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
