// Footer.js або Footer.tsx
import { Box, Typography, Container, Grid, Link } from '@mui/material'
import { Facebook, Twitter, Instagram } from '@mui/icons-material'

const Footer = ({ visible }) => {
    return (
        <Box
            component="footer"
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                backgroundColor: '#222',
                color: '#fff',
                transform: visible ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.3s ease-in-out',
                zIndex: 1100,
                py: 1,
                px: 2,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={12}>
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            fontSize={20}
                        >
                            About us
                        </Typography>
                        <Typography variant="caption" fontSize={13}>
                            SubscribesApp is a service for managing
                            subscriptions. Choose a plan, manage your
                            subscriptions, and get the most out of it.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            fontSize={20}
                        >
                            Useful links
                        </Typography>
                        <Link href="#" color="inherit" underline="hover">
                            FAQ
                        </Link>
                        <br />
                        <Link href="#" color="inherit" underline="hover">
                            Contacts
                        </Link>
                        <br />
                        <Link href="#" color="inherit" underline="hover">
                            Terms of Use
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            fontSize={20}
                        >
                            We are in social networks
                        </Typography>
                        <Box
                            sx={{ display: 'flex', gap: 1, cursor: 'pointer' }}
                        >
                            <Facebook fontSize="small" />
                            <Twitter fontSize="small" />
                            <Instagram fontSize="small" />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Footer
