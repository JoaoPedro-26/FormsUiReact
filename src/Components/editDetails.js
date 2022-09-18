import React from "react";
import { Button, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { object, string} from "yup";
import TextfieldWrapper from "./FormUI/Text/text";
import { styled } from '@mui/material/styles';
import api from "../api";

const CssTextField = styled(TextfieldWrapper)({
    width: '500px',
    '&:hover fieldset': {
        borderColor: 'grenn',
    },
  });

const initialValues = JSON.parse(localStorage.getItem("listEdit"));

const EditDetailsCar = () => {

    function handleClickButton (e) {

    };

    function addCarro (edit) {
        api.put(`http://api-test.bhut.com.br:3000/api/cars/${edit._id}`, edit)
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
                    <h1>Editar dados de um veículo</h1>
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
                        <Button 
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={!isValid || !dirty}
                            onClick={e => handleClickButton(e)}
                            >
                            Editar dados
                        </Button>
                    </Grid>
                </Grid>

                </Form>

                )}
                
            </Formik>
        </div>
    );
};

export default EditDetailsCar;