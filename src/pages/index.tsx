import { useState, useEffect, useContext } from "react";
import { ResponsiveAppBar, ControlledCarousel, ControlledCard, ControlledGrid } from "@/components";
import { CarouselImageSourceProps } from "@/components/Carousel/Carousel";
import { CardConfigProps } from "@/components/Cards/Cards";
import { Card, CardContent, Container, Typography, CardMedia, Grid } from "@mui/material";
import { ARContext } from '../utils/context/base/AdminRegistrationContext'
import { buildHttp } from "./api/http";
import { ContextSetup } from "@/utils/context";
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const router = useRouter()
  const {
    setIsHidden
  } = useContext(ARContext) as ContextSetup 
  const stylish = {
    height: '550px'
  }
  const [imgconfig, setImageConfig] = useState<CarouselImageSourceProps[]>(
    [
      {
        link: '/cover/danjcover1.jpg',
        alt: 'DanJ Cover 1',
        style: stylish,
        slideTitle : 'Dan J Moto Shop',
        slideParagraph: 'Best Sellers'
      }
    ]
  )
  const [cardconfig, setCardConfig] = useState<CardConfigProps[]>(
    [
      {
        title: 'Quality Services',
        srcimg: '/cover/danjcover2.jpg',
        description:'We have the best services'
      }
    ]
  )

  useEffect(() => {
    const config = {
      combinationUrl: `/api/users/check-email/${'test@gmail.com'}`,
      HttpRequest : {
        PropsType : '[Request][FromRoute]',
        RequestMethod: 'GET',
      }
    }
    buildHttp(config).then((response : any) => {
      const { data } : any = response;
      if(data === "not_exist"){
        setIsHidden(true)
        router.push('/create-account')
      }
    })
  }, [])

  return (
    <>
      <ResponsiveAppBar />
      <ControlledCarousel 
      imgconfig={imgconfig}
      />
      {/* <ControlledCard 
      cardconfig={cardconfig}
      /> */}
     <Container style={{ marginTop: '30px'}}>
      <Typography variant="h5">Services</Typography>
      <hr/>
      <ControlledGrid>
        <Grid item xs={4}>
        <Card>
                      <CardMedia 
                      sx={{ height: 140 }}
                      image={'https://cdn1.iconfinder.com/data/icons/data-science-flat-1/64/ai-customer-service-support-robot-artificial-intelligence-256.png'}
                      
                      />
                      <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                                Service Quality
                            </Typography>
                      </CardContent>
                    </Card>
        </Grid>
        <Grid item xs={4}>
        <Card>
                      <CardMedia 
                      sx={{ height: 140 }}
                      image={'/cover/dancover2.jpg'}
                      />
                      <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                                Service Quality
                            </Typography>
                      </CardContent>
                    </Card>
        </Grid>
        <Grid item xs={4}>
        <Card>
                      <CardMedia 
                      sx={{ height: 140 }}
                      image={'/cover/dancover2.jpg'}
                      />
                      <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                                Service Quality
                            </Typography>
                      </CardContent>
                    </Card>
        </Grid>
      </ControlledGrid>
     </Container>
     <div style={{
            padding: '80px', marginBottom: '20px'
          }}>
            <div className="row">
              <div className="col-sm">
                <img
                  src="https://cdn.dribbble.com/users/1573719/screenshots/17367747/media/6b5e1f9514eca6ecbc4942ad339a5ed4.png?compress=1&resize=1000x750&vertical=top"
                  className="img-fluid"
                  style={{
                    width: '100%',
                    height: 'auto'
                  }}
                />
              </div>
              <div className="col-sm">
                  <div style={{ marginTop: '40px'}}>
                  <Typography variant="h4" gutterBottom>
                    DanJ MotoShop
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </Typography>
                  </div>
              </div>
            </div>
            <div className="row">
                  <div className="col-sm">
                  <div style={{ marginTop: '40px'}}>
                  <Typography variant="h6" gutterBottom>
                    Why customers trust us ?
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </Typography>
                  </div>
                  </div>
                  <div className="col-sm">
                    <img 
                    src="https://cdn.dribbble.com/users/2234898/screenshots/5994185/media/25420ba6b9bfcbc1aae892dee8faddf7.png?compress=1&resize=1000x750&vertical=top"
                    className="img-fluid"
                  style={{
                    width: '100%',
                    height: 'auto'
                  }}
                    />
                  </div>
            </div>
          </div>
          {/* <ControlledFooter /> */}
    </>
  )
}

export default Home