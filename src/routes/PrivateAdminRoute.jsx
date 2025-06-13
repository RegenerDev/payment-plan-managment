import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../auth/authService'

const PrivateAdminRoute = ({ children }) => {
    const user = getCurrentUser()

    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace />
    }

    return children
}

export default PrivateAdminRoute
