import { Card, CardContent } from "@mui/material";

type CardProps = {
    children?: React.ReactNode
}

const UncontrolledCard: React.FC<CardProps> = ({children}) => {
    return (
        <>
            <Card>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </>
    )
}

export default UncontrolledCard