import React, { useState, useEffect } from 'react'
import { ResponsiveAppBar, UncontrolledCard, ControlledGrid, ControlledBackdrop } from '@/components'
import { Container, Typography, Button, Box, Grid } from '@mui/material'
import { ControlledTextField } from '@/components/TextField/TextField'
import { useForm, FormProvider } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { requiredString } from '@/utils/formSchema'
import { usePreviousValue } from '@/utils/hooks/usePreviousValue'
import { PrimaryButton, OutlinedButton } from '@/components/Button'
import { accountCreationAtom } from '@/utils/hooks/useAccountAdditionValues'
import { useSetAtom, useAtomValue } from 'jotai/react'

import { buildHttp } from '../pages/api/http'

import { ControlledCheckbox } from '@/components/Checkbox/Checkbox'


const baseSchema = z.object({
    firstName: requiredString("Your firstname is required."),
    lastName: requiredString("Your lastname is required."),
    email: requiredString("Your email is required.").email(),
    password: requiredString("Your password is required."),
    conpassword: requiredString("Please confirm your password.")
})

const schema = z.discriminatedUnion('hasNoMiddleName', [
    z.object({
        hasNoMiddleName: z.literal(false),
        middleName: requiredString(
            'Please provide your middlename or select i do not have a middlename'
        )
    }).merge(baseSchema),
    z
      .object({
        hasNoMiddleName: z.literal(true),
      })
      .merge(baseSchema),
])
.refine(
    ({ conpassword, password }) => {
        return password === conpassword
    },
    { path: ["conpassword"], message: "Password did not match"}
)

export type AccountCreation = z.infer<typeof schema>


const CreateAccount: React.FC = () => {
    const form = useForm<AccountCreation>({
        mode: "all",
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            middleName: "",
            email: "",
            password: "",
            hasNoMiddleName: false
        }
    })

    const {
        control,
        formState: { isValid, errors },
        watch,
        handleSubmit,
        reset,
        getValues,
        resetField,
        trigger
    } = form

    const [open, setOpen] = useState(false)
    
    const setAccountCreation = useSetAtom(accountCreationAtom)
    const baseAccountInfo = useAtomValue(accountCreationAtom)
    const hasNoMiddleName = watch("hasNoMiddleName")
    const hasNoMiddleNamePrevValue = usePreviousValue(hasNoMiddleName)


    useEffect(() => {
        resetField("middleName")
        if(hasNoMiddleNamePrevValue){
            trigger("middleName")
        }
    }, [hasNoMiddleName, hasNoMiddleNamePrevValue, resetField, trigger])

    const onSubmit = (data: any) => {
        console.log(data)
        setOpen(!open)
        setAccountCreation(data)
        const obj = {
            firstname: data.firstName,
            middlename: data.middleName,
            lastname: data.lastName,
            email: data.email,
            password: data.password
        }
        const config = {
            combinationUrl: '/api/users/add-admin',
            HttpRequest : {
                PropsType : '[Request][FromBody][Raw]',
                RequestMethod: 'POST',
                Body: obj
            }
        }
        buildHttp(config).then((res: any) => {
            const { data } : any = res
            if(data == 'Success'){
                setOpen(false)
                reset({});
            }
        })
    }


    return (
        <>
            <ResponsiveAppBar />
            <Container style={{marginTop: '100px'}}>
                <UncontrolledCard>
                    <Typography variant="h5" mb="2">Administrator Information</Typography>
                    <hr/>
                <FormProvider {...form}>
                            <ControlledGrid>
                                <Grid item xs={4}>
                                    <ControlledTextField 
                                    control={control}
                                    required
                                    name="firstName"
                                    label="Firstname"
                                    shouldUnregister={true}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <ControlledTextField 
                                    control={control}
                                    disabled={hasNoMiddleName}
                                    name="middleName"
                                    required={!hasNoMiddleName}
                                    label="Middlename"
                                    shouldUnregister={true}
                                    />
                                    <ControlledCheckbox
                                                control={control}
                                                name="hasNoMiddleName"
                                                label="I do not have a middle name"
                                                />
                                </Grid>
                                <Grid item xs={4}>
                                    <ControlledTextField 
                                    control={control}
                                    required
                                    name="lastName"
                                    label="Lastname"
                                    shouldUnregister={true}
                                    />
                                </Grid>
                            </ControlledGrid>
                            <ControlledGrid>
                                <Grid item xs={4}>
                                    <ControlledTextField 
                                    control={control}
                                    required
                                    name="email"
                                    label="Email"
                                    shouldUnregister={true}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                <ControlledTextField 
                                    control={control}
                                    required
                                    name="password"
                                    label="Password"
                                    shouldUnregister={true}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <ControlledTextField 
                                    control={control}
                                    required
                                    name="conpassword"
                                    label="Confirm Password"
                                    shouldUnregister={true}
                                    />
                                </Grid>
                            </ControlledGrid>
                            <Button
                                    variant='contained'
                                    color="primary"
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={!isValid}
                                    style={{
                                        float: 'right',
                                        marginTop: '10px',
                                        marginBottom: '10px'
                                    }}
                                    
                                    >Submit</Button>
                       </FormProvider>
                </UncontrolledCard>
                <ControlledBackdrop open={open} />
            </Container>
        </>
    )
}

export default CreateAccount