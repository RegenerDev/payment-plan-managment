import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../auth/authService'

const Layout = ({ children }) => {
    const user = getCurrentUser()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1 }}
                        onClick={() => navigate('/')}
                        style={{ cursor: 'pointer' }}
                    >
                        Subscribes App
                    </Typography>

                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/admin"
                                >
                                    Admin
                                </Button>
                            )}
                            <Button
                                color="inherit"
                                component={Link}
                                to="/dashboard"
                            >
                                Cabinet
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Log out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/login"
                            >
                                Log In
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/register"
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Container sx={{ mt: 2 }}>{children}</Container>
        </Box>
    )
}

export default Layout
