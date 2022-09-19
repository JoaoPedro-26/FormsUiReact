import React from "react";
import { Button, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { object, string} from "yup";
import TextfieldWrapper from "./FormUI/Text/text";
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import api from "../api";

const CssTextField = styled(TextfieldWrapper)({
    width: '500px',
    '&:hover fieldset': {
        borderColor: 'grenn',
    },
  });

const initialValues = {
    title: "",
    brand: "",
    price: "",
    age: ""
};

const AddCar = () => {

    function handleClickButton (e) {

    };

    const [loading, setLoading] = React.useState(false);

    function addCarro (carro) {
        setLoading(true);
        api.post("http://api-test.bhut.com.br:3000/api/cars", carro)
        .then((response) => {
            console.log(response.data);
            window.location.href='/'; 
        })
        .catch((err) => {
            console.log("ocorreu um erro: "+ err);
        });
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, formikHelpers) => {
                    console.log(values);
                    addCarro(values);
                }}
                validationSchema={object({
                title: string().required("Campo obrigatório").min(1,"Campo obrigatório"),
                brand: string().required("Campo obrigatório").min(1,"Campo obrigatório"),
                price: string().required("Campo obrigatório").min(1,"Campo obrigatório"),
                age: string().required("Campo obrigatório").min(4,"Minimo 4 caracteres"),
                })}
            >
                {({errors, isValid, touched, dirty}) => (

                <Form>

                <Grid item xs={12}>
                    <h1>Criação de um novo veículo</h1>
                </Grid>

                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <CssTextField
                        name="title"
                        type="string"
                        custom-css-outlined-input   
                        variant="outlined"
                        label="Modelo"
                        error={Boolean(errors.title) && Boolean(touched.title)}
                        helperText={Boolean(touched.title) && errors.title}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <CssTextField
                        name="brand"
                        type="string"
                        custom-css-outlined-input   
                        variant="outlined"
                        label="Marca"
                        error={Boolean(errors.brand) && Boolean(touched.brand)}
                        helperText={Boolean(touched.brand) && errors.brand}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <CssTextField
                        name="price"
                        type="string"
                        custom-css-outlined-input   
                        variant="outlined"
                        label="Preço"
                        error={Boolean(errors.price) && Boolean(touched.price)}
                        helperText={Boolean(touched.price) && errors.price}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <CssTextField
                        name="age"
                        type="string"
                        custom-css-outlined-input   
                        variant="outlined"
                        label="Ano"
                        error={Boolean(errors.age) && Boolean(touched.age)}
                        helperText={Boolean(touched.age) && errors.age}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <LoadingButton 
                            loading={loading}
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disabled={!isValid || !dirty}
                            onClick={e => handleClickButton(!loading)}
                            >
                            Novo veículo
                        </LoadingButton>
                    </Grid>
                </Grid>

                </Form>

                )}
                
            </Formik>
        </div>
    );
};

export default AddCar;