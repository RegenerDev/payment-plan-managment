import {
    Container,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Paper,
} from '@mui/material'
import Layout from '../../components/Layout'
import { getUsers, updateUser, getCurrentUser } from '../../auth/authService'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { plans } from '../../utils/plansList'

const AdminPage = () => {
    const currentUser = getCurrentUser()
    const [users, setUsers] = useState([])

    useEffect(() => {
        const storedUsers = getUsers()
        setUsers(storedUsers)
    }, [])

    const handleRoleChange = (email, newRole) => {
        updateUser(email, { role: newRole })
        setUsers((prev) =>
            prev.map((user) =>
                user.email === email ? { ...user, role: newRole } : user
            )
        )
    }

    const handlePlanChange = (email, newPlan) => {
        updateUser(email, { subscription: newPlan })
        setUsers((prev) =>
            prev.map((user) =>
                user.email === email ? { ...user, subscription: newPlan } : user
            )
        )
    }

    if (!currentUser || currentUser.role !== 'admin') {
        return <Navigate to="/" replace />
    }

    return (
        <Layout>
            <Container sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Адмін-панель
                </Typography>

                <Paper sx={{ mt: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>Роль</TableCell>
                                <TableCell>Підписка</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.email}>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <FormControl fullWidth>
                                            <InputLabel>Роль</InputLabel>
                                            <Select
                                                value={user.role}
                                                label="Роль"
                                                onChange={(e) =>
                                                    handleRoleChange(
                                                        user.email,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <MenuItem value="user">
                                                    user
                                                </MenuItem>
                                                <MenuItem value="admin">
                                                    admin
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <FormControl fullWidth>
                                            <InputLabel>План</InputLabel>
                                            <Select
                                                value={user.subscription || ''}
                                                label="План"
                                                onChange={(e) =>
                                                    handlePlanChange(
                                                        user.email,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {plans.map((plan) => (
                                                    <MenuItem
                                                        key={plan.title}
                                                        value={plan.title}
                                                    >
                                                        {plan.title}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        </Layout>
    )
}

export default AdminPage
