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
    Button,
    Box,
    Grid,
    Switch,
    TableSortLabel,
} from '@mui/material'
import Layout from '../../components/Layout'
import { getUsers, updateUser, getCurrentUser } from '../../auth/authService'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { plans } from '../../utils/plansList'
import UsersStats from 'pages/UserStats/UserStats'

const AdminPage = () => {
    const currentUser = getCurrentUser()
    const [users, setUsers] = useState([])
    const [view, setView] = useState('list')
    const [sortOrder, setSortOrder] = useState('asc') // or 'desc'

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

    const handleBlockChange = (email, blocked) => {
        updateUser(email, { blocked })

        setUsers(getUsers())
    }

    const sortedUsers = [...users].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.role.localeCompare(b.role)
        } else {
            return b.role.localeCompare(a.role)
        }
    })

    const toggleSort = () => {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    }

    if (!currentUser || currentUser.role !== 'admin') {
        return <Navigate to="/" replace />
    }

    return (
        <Layout>
            <Container sx={{ py: 4 }}>
                <Typography variant="h3" gutterBottom align="center">
                    Admin panel
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button
                                variant={
                                    view === 'list' ? 'contained' : 'outlined'
                                }
                                onClick={() => setView('list')}
                            >
                                List of users
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant={
                                    view === 'stats' ? 'contained' : 'outlined'
                                }
                                onClick={() => setView('stats')}
                            >
                                User statistics
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                {view === 'list' ? (
                    <Paper sx={{ mt: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active
                                            direction={sortOrder}
                                            onClick={toggleSort}
                                        >
                                            Role
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>Subscription</TableCell>
                                    <TableCell>Blocked</TableCell>{' '}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedUsers
                                    // .filter((user) => user.role === 'user')
                                    .map((user) => (
                                        <TableRow key={user.email}>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <FormControl fullWidth>
                                                    <InputLabel>
                                                        Role
                                                    </InputLabel>
                                                    {user.role === 'admin' ? (
                                                        <Select
                                                            value={user.role}
                                                            label="Role"
                                                            disabled
                                                        >
                                                            <MenuItem value="admin">
                                                                admin
                                                            </MenuItem>
                                                        </Select>
                                                    ) : (
                                                        <Select
                                                            value={user.role}
                                                            label="Role"
                                                            onChange={(e) =>
                                                                handleRoleChange(
                                                                    user.email,
                                                                    e.target
                                                                        .value
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
                                                    )}
                                                </FormControl>
                                            </TableCell>
                                            <TableCell>
                                                <FormControl fullWidth>
                                                    {user.role === 'admin' ? (
                                                        <>
                                                            <InputLabel>
                                                                Plan
                                                            </InputLabel>
                                                            <Select
                                                                value={
                                                                    user.subscription ||
                                                                    ''
                                                                }
                                                                label="Plan"
                                                                disabled
                                                            >
                                                                {plans.map(
                                                                    (plan) => (
                                                                        <MenuItem
                                                                            key={
                                                                                plan.title
                                                                            }
                                                                            value={
                                                                                plan.title
                                                                            }
                                                                        >
                                                                            {
                                                                                plan.title
                                                                            }
                                                                        </MenuItem>
                                                                    )
                                                                )}
                                                            </Select>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <InputLabel>
                                                                Plan
                                                            </InputLabel>
                                                            <Select
                                                                value={
                                                                    user.subscription ||
                                                                    ''
                                                                }
                                                                label="Plan"
                                                                onChange={(e) =>
                                                                    handlePlanChange(
                                                                        user.email,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            >
                                                                {plans.map(
                                                                    (plan) => (
                                                                        <MenuItem
                                                                            key={
                                                                                plan.title
                                                                            }
                                                                            value={
                                                                                plan.title
                                                                            }
                                                                        >
                                                                            {
                                                                                plan.title
                                                                            }
                                                                        </MenuItem>
                                                                    )
                                                                )}
                                                            </Select>
                                                        </>
                                                    )}
                                                </FormControl>
                                            </TableCell>
                                            <TableCell>
                                                {user.role === 'user' ? (
                                                    <Switch
                                                        checked={!!user.blocked}
                                                        onChange={(e) =>
                                                            handleBlockChange(
                                                                user.email,
                                                                e.target.checked
                                                            )
                                                        }
                                                        color="error"
                                                        inputProps={{
                                                            'aria-label':
                                                                'block user switch',
                                                        }}
                                                    />
                                                ) : null}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </Paper>
                ) : (
                    <UsersStats />
                )}
            </Container>
        </Layout>
    )
}

export default AdminPage
