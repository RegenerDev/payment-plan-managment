import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    Grid,
} from '@mui/material'
import Layout from '../../components/Layout'
import { getCurrentUser, updateUser } from '../../auth/authService'
import { useNavigate } from 'react-router-dom'
import { plans } from '../../utils/plansList'

const PlansPage = () => {
    const user = getCurrentUser()
    const navigate = useNavigate()

    const handleSubscribe = (planName) => {
        if (!user) {
            navigate(`/register?plan=${planName}`)
        } else {
            updateUser(user.email, { subscription: planName })
            alert(`You have subscribed to the plan "${planName}"`)
            navigate('/dashboard')
        }
    }

    return (
        <Layout>
            <Typography variant="h4" gutterBottom>
                Choose a subscription plan
            </Typography>
            <Grid container spacing={4}>
                {plans.map((plan) => (
                    <Grid item xs={12} md={4} key={plan.title}>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5">
                                    {plan.title}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    {plan.price}
                                </Typography>
                                <ul>
                                    {plan.features.map((f, i) => (
                                        <li key={i}>
                                            <Typography>{f}</Typography>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    onClick={() => handleSubscribe(plan.title)}
                                    fullWidth
                                >
                                    Subscribe
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Layout>
    )
}

export default PlansPage
