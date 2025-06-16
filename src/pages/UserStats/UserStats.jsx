import { getUsers } from '../../auth/authService'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts'
import { Typography, Box } from '@mui/material'
import { useMemo } from 'react'

const UsersStats = () => {
    const users = getUsers()

    const subscriptionStats = useMemo(() => {
        const plans = ['basic', 'pro', 'premium']

        return plans.map((type) => ({
            subscription: type,
            count: users.filter((u) => u.subscription?.toLowerCase() === type)
                .length,
        }))
    }, [users])

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                <strong>Count of users by subscription</strong>
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subscriptionStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subscription" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#1976d2" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default UsersStats
