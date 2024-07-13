

import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VideoCallIcon from '@mui/icons-material/VideoCall';
const StudentSideBar = () => {
    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon sx={{ color: location.pathname === ("/" || "/Student/dashboard") ? '#28A745' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/subjects">
                    <ListItemIcon>
                        <AssignmentIcon sx={{ color: location.pathname.startsWith("/Student/subjects") ? '#28A745' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" />
                </ListItemButton>
                <ListItemButton component={Link} to="/subjects/lesson">
                    <ListItemIcon>
                        <VideoCallIcon sx={{ color: location.pathname.startsWith("/subjects/lesson") ? '#28A745' : 'inherit' }} fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Lesson" primaryTypographyProps={{ variant: 'body1' }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/attendance">
                    <ListItemIcon>
                        <ClassOutlinedIcon sx={{ color: location.pathname.startsWith("/Student/attendance") ? '#28A745' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Attendance" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/complain">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon sx={{ color: location.pathname.startsWith("/Student/complain") ? '#28A745' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Complain" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Student/profile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon sx={{ color: location.pathname.startsWith("/Student/profile") ? '#28A745' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout">
                    <ListItemIcon>
                        <ExitToAppIcon sx={{ color: location.pathname.startsWith("/logout") ? '#28A745' : 'inherit' }} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default StudentSideBar