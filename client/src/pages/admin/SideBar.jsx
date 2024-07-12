import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const SideBar = () => {
    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/" aria-label="Home">
                    <ListItemIcon>
                        <HomeIcon sx={{ color: location.pathname === ("/" || "/Admin/dashboard") ? '#28A745' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/classes" aria-label="Classes">
                    <ListItemIcon>
                        <ClassOutlinedIcon sx={{ color: location.pathname.startsWith('/Admin/classes') ? '#28A745' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Classes" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/subjects" aria-label="Subjects">
                    <ListItemIcon>
                        <AssignmentIcon sx={{ color: location.pathname.startsWith("/Admin/subjects") ? '#28A745' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/teachers" aria-label="Teachers">
                    <ListItemIcon>
                        <SupervisorAccountOutlinedIcon sx={{ color: location.pathname.startsWith("/Admin/teachers") ? '#28A745' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Teachers" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/students" aria-label="Students">
                    <ListItemIcon>
                        <PersonOutlineIcon sx={{ color: location.pathname.startsWith("/Admin/students") ? '#28A745' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Students" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/notices" aria-label="Notices">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon sx={{ color: location.pathname.startsWith("/Admin/notices") ? '#28A745' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Notices" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/complains" aria-label="Complains">
                    <ListItemIcon>
                        <ReportIcon sx={{ color: location.pathname.startsWith("/Admin/complains") ? '#28A745' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Complains" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Admin/profile" aria-label="Profile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon sx={{ color: location.pathname.startsWith("/Admin/profile") ? '#28A745' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout" aria-label="Logout">
                    <ListItemIcon>
                        <ExitToAppIcon sx={{ color: location.pathname.startsWith("/logout") ? '#28A745' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default SideBar;