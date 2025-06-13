import {
    Card,
    CardContent,
    Typography,
    Button,
    List,
    ListItem,
} from '@mui/material'

const SubscriptionCard = ({ title, price, features, handleSubscribe }) => {
    return (
        <Card sx={{ width: 300, padding: 2, boxShadow: 4 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom>
                    {price}
                </Typography>
                <List dense>
                    {features.map((feature, index) => (
                        <ListItem key={index} sx={{ pl: 0 }}>
                            - {feature}
                        </ListItem>
                    ))}
                </List>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleSubscribe(title)}
                    sx={{ mt: 2 }}
                >
                    Обрати
                </Button>
            </CardContent>
        </Card>
    )
}
export default SubscriptionCard
