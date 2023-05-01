import React, { useState, } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "components/navBar";
import SideBar from "components/sideBar";
import { useGetUserQuery } from "state/api";


const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width : 600px)") // Gives a true or false if min width is achieved on screen or not
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const userId = useSelector((state) => state.global.userId); // Grabs the UID from the redux toolkit

    // API CALL
    const { data : userData } = useGetUserQuery(userId); // Passing in the user id to get that specific user id details
    console.log("data", userData)

    return <Box display={isNonMobile ? 'flex' : 'block'} width="100%" height="100%">
        <SideBar
            user={ userData || {}} // Get user data from the api, if data is yet undefined, pass an empty object
            isNonMobile={isNonMobile}
            drawerWidth='250px'
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
        />
        
        {/* Flex grow takes up the entire width */}
        <Box flexGrow={1}> 
            <NavBar
                user={ userData || {}}
                isSideBarOpen={isSideBarOpen}
                setIsSideBarOpen={setIsSideBarOpen}
            />
            <Outlet />
        </Box>
    </Box>
}

export default Layout;