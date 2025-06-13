import { Typography, Paper, Box } from '@mui/material'
import Layout from '../../components/Layout'
import { getCurrentUser } from '../../auth/authService'

const DashboardPage = () => {
    const user = getCurrentUser()

    return (
        <Layout>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Personal cabinet
                </Typography>
                <Box mt={2}>
                    <Typography>Email: {user?.email}</Typography>
                    <Typography>Role: {user?.role}</Typography>
                    <Typography>
                        Subscription: {user?.subscription || 'Not selected'}
                    </Typography>
                </Box>
            </Paper>
        </Layout>
    )
}

export default DashboardPage
