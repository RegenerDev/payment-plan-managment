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
                    Вхід
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
                        label="Пароль"
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
                        Увійти
                    </Button>
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Link href="/reset-password">Забули пароль?</Link>
                        <Link href="/register">Реєстрація</Link>
                    </Box>
                    <br />
                    <Link href="/">На головну</Link>
                </Box>
            </Paper>
        </Container>
    )
}

export default LoginPage
