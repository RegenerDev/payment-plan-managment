import { useEffect, useState } from 'react'
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
import Footer from 'container/Footer/Footer'

const Layout = ({ children }) => {
    const user = getCurrentUser()
    const navigate = useNavigate()
    const [showFooter, setShowFooter] = useState(false)
    const [lastScrollTop, setLastScrollTop] = useState(0)

    const handleLogout = () => {
        logout()
        navigate('/')
        window.location.reload()
    }

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY

            if (currentScroll > lastScrollTop && currentScroll > 100) {
                setShowFooter(true)
            } else {
                setShowFooter(false)
            }

            setLastScrollTop(currentScroll)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollTop])

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1, cursor: 'pointer' }}
                        onClick={() => navigate('/')}
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
                                Dashboard
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
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Toolbar />

            <Container sx={{ mb: 6, flexGrow: 1 }}>{children}</Container>

            <Footer visible={showFooter} />
        </Box>
    )
}

export default Layout
