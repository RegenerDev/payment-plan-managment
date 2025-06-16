import { useState } from 'react'
import {
    Typography,
    Paper,
    Box,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material'
import Layout from '../../components/Layout'
import { getCurrentUser, updateUser } from '../../auth/authService'

const DashboardPage = () => {
    const initialUser = getCurrentUser()
    const [subscription, setSubscription] = useState(
        initialUser?.subscription || ''
    )

    const handleChange = (e) => {
        const newSubscription = e.target.value
        setSubscription(newSubscription)

        updateUser(initialUser.email, { subscription: newSubscription })
    }

    return (
        <Layout>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Personal cabinet
                </Typography>
                <Box mt={2}>
                    <Typography>
                        <strong>Email:</strong> {initialUser?.email}
                    </Typography>
                    <Typography>
                        <strong>Role:</strong> {initialUser?.role}
                    </Typography>
                    <Typography>
                        <strong>Subscription:</strong>{' '}
                        {subscription || 'Not selected'}
                    </Typography>
                    {initialUser?.role === 'admin' ? (
                        <>
                            <Typography variant="h5" gutterBottom mt={2}>
                                Change subscription:
                            </Typography>
                            <FormControl
                                sx={{ m: 1, minWidth: 150 }}
                                size="small"
                            >
                                <InputLabel>Subscription</InputLabel>
                                <Select
                                    value={initialUser?.subscription}
                                    label="Subscription"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Basic">Basic</MenuItem>
                                    <MenuItem value="Pro">Pro</MenuItem>
                                    <MenuItem value="Premium">Premium</MenuItem>
                                </Select>
                            </FormControl>
                        </>
                    ) : null}
                </Box>
            </Paper>
        </Layout>
    )
}

export default DashboardPage
