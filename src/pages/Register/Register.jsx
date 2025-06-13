import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    TextField,
    Button,
    Container,
    Typography,
    FormControl,
    InputLabel,
    Select,
    Box,
    Link,
    MenuItem,
} from '@mui/material'
import { register, updateUser } from '../../auth/authService'

const RegisterPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const selectedPlan = params.get('plan')

    const [form, setForm] = useState({
        email: '',
        password: '',
        role: 'user',
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const success = register(form.email, form.password, form.role)
        if (success) {
            const currentUser = {
                email: form.email,
                role: form.role,
                subscription: selectedPlan || null,
            }
            localStorage.setItem('currentUser', JSON.stringify(currentUser))

            if (selectedPlan) {
                updateUser(form.email, { subscription: selectedPlan })
            }

            navigate('/dashboard')
        }
    }

    return (
        <Container maxWidth="xs" sx={{ mt: 5 }}>
            <Typography variant="h5" gutterBottom>
                Реєстрація
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Пароль"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Роль</InputLabel>
                    <Select
                        name="role"
                        value={form.role}
                        label="Роль"
                        onChange={handleChange}
                    >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Зареєструватися
                </Button>
            </form>
            <Box mt={2}>
                <Link href="/login">Вже маєте акаунт?</Link>
            </Box>
            <br />
            <Link href="/">На головну</Link>
        </Container>
    )
}

export default RegisterPage
