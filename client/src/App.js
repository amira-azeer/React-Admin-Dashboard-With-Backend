import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transaction from "scenes/transaction";
import Geography from "scenes/geography";
import Sales from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";


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
              <Route path="/customers" element={<Customers/>} />
              <Route path="/transactions" element={<Transaction/>} />
              <Route path="/geography" element={<Geography/>} />
              <Route path="/overview" element={<Sales/>} />
              <Route path="/daily" element={<Daily/>} />
              <Route path="/monthly" element={<Monthly/>} />
              
            </Route>
          </Routes>

        </ThemeProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
