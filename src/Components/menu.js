import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Grid, Container } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import api from '../api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {

const [open, setOpen] = React.useState(false);
const handleClose = () => setOpen(false);
const [rows, setRows] = useState([]);
const [detailRow, setDetailRow] = useState(0);
const [listCars, setListCars] = useState([]);
const [detailCar, setDetailCar] = useState({_id: "", title: "", brand: "", price: "", age: ""});
const handleOpen = (idRow) => {
  api.get(`http://api-test.bhut.com.br:3000/api/cars/${idRow}`, {
  })
    .then((response) => {
      setDetailCar(response.data);
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro : " + err);
    });
    console.log(detailCar);
    console.log(idRow);

  setOpen(true)};
 
useEffect(() => {
  api.get("http://api-test.bhut.com.br:3000/api/cars", {
  })
    .then((response) => {
      console.log(response);
      setListCars(response.data);
      console.log(listCars)
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro : " + err);
    });
}, []);

const buttonDelete = (rowDelete) => {
    api.delete(`http://api-test.bhut.com.br:3000/api/cars/${rowDelete}`, {
  })
    .then((response) => {
      console.log(response.data);
      api.get("http://api-test.bhut.com.br:3000/api/cars", {
      })
        .then((response) => {
          console.log(response);
          setListCars(response.data);
          console.log(listCars)
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro : " + err);
        });
      })
    .catch((err) => {
      console.error("ops! ocorreu um erro : " + err);
    });
};

const buttonCadastro = () => {
  localStorage.setItem("registryCar", JSON.stringify(rows));
  window.location.href='/addCar';
};

const buttonEdit = () => {
  localStorage.setItem("listEdit", JSON.stringify(detailCar));
  window.location.href='/editDetails';
}

  return (
    <div>
        <h1>Lista de carros</h1>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Modelo</StyledTableCell>
            <StyledTableCell align="right">Marca</StyledTableCell>
            <StyledTableCell align="right">Preço</StyledTableCell>
            <StyledTableCell align="right">Ano</StyledTableCell>
            <StyledTableCell align="right">Detalhes sobre o veículo</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listCars?.map((cars, rowIndex) => (
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">{cars._id}</StyledTableCell>
              <StyledTableCell align="right">{cars.title}</StyledTableCell>
              <StyledTableCell align="right">{cars.brand}</StyledTableCell>
              <StyledTableCell align="right">{cars.price}</StyledTableCell>
              <StyledTableCell align="right">{cars.age}</StyledTableCell>
              <StyledTableCell align="right">
                <Button style={{marginRight: '0.938rem'}} variant="outlined" startIcon={<EditIcon />} onClick={() => handleOpen(cars._id)}>
                    Detalhes
                </Button> 

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Container style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                          <Container style={{display: 'flex', alignItems: 'center'}} className='ContainerEdit'>
                            <EditIcon style={{cursor: 'pointer'}} onClick={() => buttonEdit()} />
                            <p className='TextStyle'>Editar veículo</p>
                          </Container>
                          <CloseIcon style={{ cursor: 'pointer'}} onClick={() => {window.location.href='/'}} />
                        </Container>

                        <Grid container>
                            <Container>
                              <div>
                                
                                  <h1 className='title'>Detalhes do veículo</h1>
                                <Grid scope="infos" >
                                  <div className='ContainerInfos'>
                                      <Typography id="modal-modal-description">
                                          id do véiculo: {detailCar._id}
                                      </Typography>

                                  
                                      <Typography style={{marginTop: '0.625rem'}} id="modal-modal-description" >
                                          Modelo: {detailCar.title}
                                      </Typography>
                                  
                                  </div>

                                  <div className='ContainerInfos'>

                                      <Typography style={{marginTop: '0.625rem'}} id="modal-modal-description" >
                                          Marca: {detailCar.brand}
                                      </Typography>

                                      <Typography style={{marginTop: '0.625rem'}} id="modal-modal-description" >
                                          Preço: {detailCar.price}
                                      </Typography>
                                  
                                  </div>

                                  <div className='ContainerInfos'>
                                      <Typography style={{marginTop: '0.625rem'}} id="modal-modal-description">
                                          Ano: {detailCar.age}
                                      </Typography>
                                      
                                  </div>

                                  </Grid>
                              </div>
                            </Container>
                        </Grid>
                    </Box>
                </Modal>

                <Button variant="outlined" startIcon={<DeleteIcon/>} onClick={() => buttonDelete(cars._id)}>
                    Deletar
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button style={{marginTop: '0.938rem'}} type="submit" variant="contained" color="primary" onClick={() => buttonCadastro()}>Cadastrar novo veículo</Button>
    </div>
  );
}
