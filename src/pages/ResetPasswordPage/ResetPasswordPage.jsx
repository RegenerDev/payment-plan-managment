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
import { getUsers, updateUser } from '../../auth/authService'

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleReset = (e) => {
        e.preventDefault()
        const users = getUsers()
        const user = users.find((u) => u.email === email)
        if (!user) {
            alert('User not found')
            return
        }

        const newPassword = prompt('Enter a new password:')
        if (newPassword) {
            updateUser(email, { password: newPassword })
            alert('Password has been updated!')
            navigate('/')
        }
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h5" gutterBottom>
                    Reset your password
                </Typography>
                <Box component="form" onSubmit={handleReset}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Reset your password
                    </Button>
                    <Box mt={2}>
                        <Link href="/login">Back to the log in page </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}

export default ResetPasswordPage
