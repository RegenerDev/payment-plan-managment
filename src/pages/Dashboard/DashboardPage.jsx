import { Typography, Paper, Box } from '@mui/material'
import Layout from '../../components/Layout'
import { getCurrentUser } from '../../auth/authService'

const DashboardPage = () => {
    const user = getCurrentUser()

    return (
        <Layout>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Особистий кабінет
                </Typography>
                <Box mt={2}>
                    <Typography>Email: {user?.email}</Typography>
                    <Typography>Роль: {user?.role}</Typography>
                    <Typography>
                        Підписка: {user?.subscription || 'не вибрано'}
                    </Typography>
                </Box>
            </Paper>
        </Layout>
    )
}

export default DashboardPage
