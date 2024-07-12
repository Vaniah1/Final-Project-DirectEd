import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Backdrop } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../assets/classroom.png"
import { LightPurpleButton } from '../components/buttonStyles';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#FFA500',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const LoginPage = ({ role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rollNumber: '',
        studentName: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        
        const fields = role === "Student" 
            ? { rollNum: formData.rollNumber, studentName: formData.studentName, password: formData.password }
            : { email: formData.email, password: formData.password };

        dispatch(loginUser(fields, role));
    };

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            const routes = {
                'Admin': '/Admin/dashboard',
                'Student': '/Student/dashboard',
                'Teacher': '/Teacher/dashboard'
            };
            navigate(routes[currentRole]);
        } else if (status === 'failed' || status === 'error') {
            setMessage(status === 'failed' ? response : "Network Error");
            setShowPopup(true);
            setLoading(false);
        }
    }, [status, currentRole, navigate, response, currentUser]);

    const inputFields = useMemo(() => role === "Student" ? [
        { name: 'rollNumber', label: 'Roll Number', type: 'number' },
        { name: 'studentName', label: 'Student Name', type: 'text' },
    ] : [
        { name: 'email', label: 'Email', type: 'email' },
    ], [role]);

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4" sx={{ mb: 2, color: "#2c2143", fontWeight: 'bold' }}>
                            {role} Login
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mb: 3 }}>
                            Welcome back! Please enter your details
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                            {inputFields.map((field) => (
                                <TextField
                                    key={field.name}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id={field.name}
                                    label={field.label}
                                    name={field.name}
                                    autoComplete={field.name}
                                    type={field.type}
                                    value={formData[field.name]}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            ))}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleInputChange}
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <LightPurpleButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : "Login"}
                            </LightPurpleButton>
                            {role === "Admin" && (
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link to="/Adminregister" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            )}
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
}

export default LoginPage;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${theme.palette.primary.main};
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.palette.secondary.main};
  }
`;