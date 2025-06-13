import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../auth/authService'

const PrivateRoute = ({ children, adminOnly }) => {
    const user = getCurrentUser()
    if (!user) return <Navigate to="/login" />
    if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" />
    return children
}

export default PrivateRoute
