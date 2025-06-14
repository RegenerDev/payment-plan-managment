import { Box, Typography, Container, Grid, Link } from '@mui/material'
import { Facebook, Twitter, Instagram } from '@mui/icons-material'

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#222',
                color: '#fff',
                py: 4,
                px: 2,
                mt: 'auto',
                width: '100%',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            About us
                        </Typography>
                        <Typography variant="body2">
                            SubscribesApp is a service for managing
                            subscriptions. Choose a plan, manage your
                            subscriptions, and get the most out of it.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Useful links
                        </Typography>
                        <Typography variant="body2">
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
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            We are in social networks
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                mt: 1,
                                cursor: 'pointer',
                            }}
                        >
                            <Facebook />
                            <Twitter />
                            <Instagram />
                        </Box>
                    </Grid>
                </Grid>

                <Box mt={4} textAlign="center">
                    <Typography variant="body2" color="text.white">
                        © {new Date().getFullYear()} SubscribesApp. All rights
                        reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer
