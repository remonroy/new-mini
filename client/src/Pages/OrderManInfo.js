import React, { useState, useEffect } from 'react';
import { TextField, Button, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { useSelector, useDispatch, connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { allOrderInformation, localProductDelete } from '../Store/actions/productActions';

const OrderManInfo = () => {
    const [order, setOrder] = useState({})
    const [id, setId] = useState({})
    const orderData = useSelector(state => state.order.product)
    const isAuth = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    useEffect(() => {
        setOrder(orderData)
    }, [orderData])
    const [valuee, setValue] = useState(0)
    //product delete history...
    const handleDelete = (id) => {
        setId(id)
        dispatch(localProductDelete(id))
    }
    let allInfo = []
    let productQty = []

    for (let i in order.items) {
        let dataInfo = order.items[i].item
        let qty = order.items[i]
        allInfo.push(dataInfo)
        productQty.push(qty)
    }

    const [activeStep, setActiveStep] = useState(0)
    const handleNext = () => {
        setActiveStep(activeStep + 1)
    }
    const handlePrevious = () => {
        setActiveStep(activeStep - 1)
    }
    const information = () => {
        return ([
            'Personal information',
            'Order information',
            'Payment',
        ])
    }
    let steps = information()
    const allInputField = (step) => {
        switch (step) {
            case 0: {
                return (
                    <>
                        <TextField
                            id="name"
                            label="Name"
                            onChange={handleChange}
                            variant="outlined"
                            value={isAuth.name}
                            placeholder="Enter Your Name"
                            fullWidth
                            margin="normal"
                            name="name"
                        />
                        <TextField
                            id="email"
                            label="email"
                            variant="outlined"
                            value={isAuth.email}
                            onChange={handleChange}
                            placeholder="Enter Your Last email"
                            fullWidth
                            margin="normal"
                            name="email"
                        />
                        <TextField
                            id="phone"
                            label="phone"
                            onChange={handleChange}
                            variant="outlined"
                            placeholder="Enter Your phone"
                            fullWidth
                            value={all.phone}
                            margin="normal"
                            name="phone"
                        />
                        <TextField
                            id="address"
                            label="address"
                            variant="outlined"
                            placeholder="Enter Your address"
                            fullWidth
                            onChange={handleChange}
                            margin="normal"
                            value={all.address}
                            name="address"
                        />
                    </>
                )
            }
            case 1: {
                return (
                    <>
                        <table className="table table-borderless">
                            <thead style={{ borderBottom: '1px solid #ddd' }}>
                                <tr>
                                    <th className="text-secondary text-left" scope="col">Sr No</th>
                                    <th className="text-secondary" scope="col">Image</th>
                                    <th className="text-secondary" scope="col">Name</th>
                                    <th className="text-secondary" scope="col">Price</th>
                                    <th className="text-secondary" scope="col">Category</th>
                                    <th className="text-secondary" scope="col">Quantity</th>
                                    <th className="text-secondary" scope="col">delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allInfo.length ?
                                    allInfo.map((appointment, index) =>

                                        <tr style={{ borderBottom: '1px solid #ddd' }}>
                                            <td >{index + 1}</td>
                                            <td><img style={{ width: '70px' }} src={appointment.image} alt="" /></td>
                                            <td>{appointment.name}</td>
                                            <td>{appointment.price}</td>
                                            <td>{appointment.category}</td>
                                            <td>{productQty[index].item._id === appointment._id ? productQty[index].qty : ''}</td>
                                            <td><button style={{ border: 'none', background: 'none' }} onClick={() => handleDelete(appointment._id)}><FontAwesomeIcon icon={faTrashAlt} /></button></td>
                                        </tr>
                                    ) : <tr>
                                        <td style={{ textAlign: 'center' }} colSpan='10'>No data order</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </>
                )
            }
            case 2: {
                return (
                    <>
                        <TextField
                            id="cardNumber"
                            label="Card Number"
                            variant="outlined"
                            placeholder="Enter Your Card Number"
                            fullWidth
                            onChange={handleChange}
                            value={all.cardNumber}
                            margin="normal"
                            name="cardNumber"
                        />
                        <TextField
                            id="cardMonth"
                            label="Card Month"
                            variant="outlined"
                            placeholder="Enter Your Card Month"
                            fullWidth
                            onChange={handleChange}
                            value={all.cardMonth}
                            margin="normal"
                            name="cardMonth"
                        />
                        <TextField
                            id="cardYear"
                            label="Card Year"
                            variant="outlined"
                            placeholder="Enter Your Card Year"
                            fullWidth
                            onChange={handleChange}
                            value={all.cardYear}
                            margin="normal"
                            name="cardYear"
                        />
                    </>
                )
            }
            default: return 'Unknown information..'
        }
    }
    const [all,setAll]=useState({})
    const handleChange = (e) =>{
        let newData ={...all}
        newData[e.target.name]=e.target.value
        setAll(newData)
    }
    const handleSubmitNext = (e) =>{
        let allInformation ={
            name:isAuth.name,
            email:isAuth.email,
            phone:all.phone,
            address:all.address,
            order:orderData,
            cardNumber:all.cardNumber,
            cardMonth:all.cardMonth,
            cardYear:all.cardYear
        }
        dispatch(allOrderInformation(allInformation));
        setActiveStep(3)
    }
    return (
        <div className='mt-4'>
            <Stepper activeStep={activeStep}>
                {
                    steps.map((items, index) => {
                        return (
                            <Step>
                                <StepLabel>{items}</StepLabel>
                            </Step>
                        )
                    })
                }
            </Stepper>

            {
                activeStep === 3 ? (
                    <Typography align='center'>
                        <h2>Thank you submitting</h2>
                    </Typography>
                ) : (
                    <>
                        <form action={activeStep === 2 ? 'Finish' :''}>{allInputField(activeStep)}</form>
                        <Button
                            variant='contained'
                            onClick={handlePrevious}
                            disabled={activeStep === 0}
                            className='mx-2'
                        >Previous</Button>
                        <Button
                            variant='contained'
                            onClick={activeStep === 2 ?handleSubmitNext:handleNext}
                        >{activeStep === 2 ? 'Finish' : 'Next'}</Button> 
                        {/* {activeStep === 2 ? 'Finish' : 'Next'} */}
                    </>
                )
            }

        </div>
    );
};

export default connect(null, { localProductDelete,allOrderInformation })(OrderManInfo);