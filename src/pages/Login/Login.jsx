import { useState } from 'react'
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Box,
    Link,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { login } from '../../auth/authService'
import { useLocation } from 'react-router-dom'
import { updateUser } from '../../auth/authService'

const LoginPage = () => {
    const [form, setForm] = useState({ email: '', password: '' })
    const navigate = useNavigate()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const selectedPlan = params.get('plan')

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const success = login(form.email, form.password)

        if (success) {
            if (selectedPlan) {
                updateUser(form.email, { subscription: selectedPlan })
            }
            navigate('/dashboard')
        }
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h5" gutterBottom>
                    Log in
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        margin="normal"
                        type="email"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Log in
                    </Button>
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Link href="/reset-password">
                            Forgot your password?
                        </Link>
                        <Link href="/register">Sign Up</Link>
                    </Box>
                    <br />
                    <Link href="/">To the home page</Link>
                </Box>
            </Paper>
        </Container>
    )
}

export default LoginPage
