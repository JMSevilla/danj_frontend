import { Button, ButtonProps } from '@mui/material'

export const NormalButton: React.FC<Omit<ButtonProps, 'variant'> & { component? :
string}> = (props) => {
    return (
        <Button 
        {...props}
        />
    )
}