import { ResponsiveAppBar, ControlledButton } from "@/components";
import { Card, CardContent, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { ControlledTextField } from "@/components/TextField/TextField";
import { FieldValues, useForm  } from "react-hook-form";
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { requiredString } from "@/utils/formSchema";
import { usePreviousValue } from "@/utils/hooks/usePreviousValue";
import { buildHttp } from "./api/http";
import { PrimaryButton, OutlinedButton } from "@/components/Button";

import GoogleButton from 'react-google-button'

import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useRouter } from 'next/router';

const baseSchema = z.object({
    email : requiredString("Your email is required."),
    password: requiredString("Your password is required.")
})

export type loginAccount = z.infer<typeof baseSchema>



const Login: React.FC = () => {
    const {
        getValues,
        control,
        resetField,
        formState : { isValid },
        watch,
        trigger
    } = useForm<loginAccount>({
        mode: "all",
        resolver: zodResolver(baseSchema),
        defaultValues : {
            email: '',
            password: ''
        }
    })
    const router = useRouter()
    const [user, setUser] = useState<any>({})
    const [profile, setProfile] = useState([])

    const loginWithGoogle = useGoogleLogin({
        onSuccess: (codeResponse : any) => setUser(codeResponse),
        onError: (error : any) => console.log("Try failed", error)
    })

    useEffect(
        () => {
            if(Object.keys(user).length > 0){
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`, {
                    headers: {
                        Authorization : `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res : any) => {
                    const { data } : any = res
                    console.log(data)
                    setProfile(data)
                })
            }
        },
        [user]

    )
    const handleShit = () => {
        const objTest = {
            combinationUrl : '/users',
            HttpRequest: {
              PropsType : '[Request][FromBody]',
              RequestMethod: 'GET',
            }
          }
          buildHttp(objTest).then((res: any) => console.log(res))
    }
    return (
        <>
            <ResponsiveAppBar />
            
            <Container style={{marginTop: '100px'}}>
            <Typography align="center" variant="button">Welcome to DanJ MotoShop!</Typography>
            <Card>
                <CardContent>
                    <div className="row">
                        <div className="col-sm" style={{
                            borderRight: '2px solid #A80001',
                            height: '500px'
                        }}>
 <img 
                        src="/danjlogo.png"
                        style={{
                            width: '30%', height: 'auto',
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                        className="img-fluid"
                        />
                        <Typography style={{marginBottom: '20px'}} variant="h6">Customer Signin</Typography>
                        <ControlledTextField 
                        control={control}
                        name="email"
                        required
                        label="Email"
                        />
                        <ControlledTextField 
                        control={control}
                        name="password"
                        required
                        type="password"
                        label="Password"
                        />
                        <PrimaryButton onClick={handleShit} sx={{ alignSelf: 'center', mt: 2, mb: 2}}>
                            Sign in
                        </PrimaryButton>

                        {/* <OutlinedButton onClick={() => router.push('/create-account')} sx={{ alignSelf: 'center',}}>
                            Create an account
                        </OutlinedButton> */}
                        
                        </div>
                        <div className="col-sm">
                            <Typography variant="h6">Other options</Typography>
                            <GoogleButton
                            // onClick={() => loginWithGoogle()}
                            style={{width: '100%', marginTop: '20px'}}
                            disabled={true}
                        />
                        </div>
                    </div>
                </CardContent>
            </Card>
            </Container>
        </>
    )
}

export default Login