import { Button } from "@mui/material";

type ButtonProps = {
    handleSubmit?: () => void;
    buttonText: string
    variant: any
    color: any
    size: any
}

const ControlledButton: React.FC<ButtonProps> = (props) => {
    const { handleSubmit, buttonText, variant, color, size } = props

    return (
        <>
            <Button
            variant={variant}
            onClick={handleSubmit}
            color={color}
            size={size}
            >{buttonText}</Button>
        </>
    )
}

export default ControlledButton