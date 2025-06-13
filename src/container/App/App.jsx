import CssBaseline from '@mui/material/CssBaseline'
import { StyledEngineProvider } from '@mui/material/styles'
import { Container } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import LoginPage from 'pages/Login/Login'
import RegisterPage from 'pages/Register/Register'
import PrivateRoute from 'routes/PrivateRoute'
import AdminPage from 'pages/Admin/Admin'
import DashboardPage from 'pages/Dashboard/DashboardPage'
import PlansPage from 'pages/PlansPage/PlansPage'
import PrivateAdminRoute from 'routes/PrivateAdminRoute'
import ResetPasswordPage from 'pages/ResetPasswordPage/ResetPasswordPage'

const App = () => {
    return (
        <StyledEngineProvider injectFirst>
            <CssBaseline />
            <Container sx={{ padding: '40px 0' }}>
                <Routes>
                    <Route path="/" element={<PlansPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/reset-password"
                        element={<ResetPasswordPage />}
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <DashboardPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <PrivateAdminRoute>
                                <AdminPage />
                            </PrivateAdminRoute>
                        }
                    />
                </Routes>
            </Container>
        </StyledEngineProvider>
    )
}
export default App
