import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import React, {useContext, useState} from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {Tooltip} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import LogOutIcon from "@mui/icons-material/Logout";
import {AppContext, Pages} from "../App";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar({drawerOpen, setDrawerOpen}: {drawerOpen: boolean, setDrawerOpen: (b: boolean) => void}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const state = useContext(AppContext)

    const isMenuOpen = Boolean(anchorEl);

    return (
        <Box style={{width: '100vw', display: 'block', position: 'sticky', left: '0', top: '0'}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                        onClick={() => setDrawerOpen(!drawerOpen)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >
                        Stocker
                    </Typography>
                    <Tooltip title={"Filters any table on screen"}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                inputProps={{'aria-label': 'search'}}
                                value={state.search}
                                onChange={e => {
                                    e.preventDefault()
                                    state.setSearch(e.target.value)
                                }}
                            />
                        </Search>
                    </Tooltip>
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            onClick={e => setAnchorEl(_.isNull(anchorEl) ? e.currentTarget : null)}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => {
                    setAnchorEl(null)
                    state.setCurrentPage(Pages.Profile)
                }}><SettingsIcon />Go to Profile</MenuItem>
                <Divider />
                <MenuItem onClick={() => {
                    setAnchorEl(null)
                    state.setCurrentUser(undefined)
                    localStorage.removeItem('currentUser')
                    state.setCurrentPage(Pages.Login)
                }}><LogOutIcon />Sign Out</MenuItem>
            </Menu>
        </Box>
    );
}
