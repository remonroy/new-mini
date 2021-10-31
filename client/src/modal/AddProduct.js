import React, { useState } from 'react';
import Axios from 'axios'
import Modal from 'react-modal';
import { connect, useDispatch } from 'react-redux';
import { addProducts } from '../Store/actions/productActions';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'500px'
    },
};

Modal.setAppElement('#root');

const AddProduct = ({modalIsOpen,closeModal}) => {
    const dispatch=useDispatch()

    const [modal,setModal] = useState({})
    const [file,setFile] = useState({})

    const handleChange=(e)=>{
        const newData={...modal}
        newData[e.target.name] = e.target.value
        setModal(newData)
    }

    let{name,category,price,quantity}=modal

    const handleImage =(event)=>{
        setFile(event.target.files[0])
    }

    const handleSubmit =(event)=>{
        const data = new FormData()
        data.append('avatar',file)
        data.append('name',name)
        data.append('category',category)
        data.append('price',price)
        dispatch(addProducts(data))
        event.preventDefault()
        event.target.reset()
    }
    

    return (
        <div>
            
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                >
                
                <h3 className="text-center">Add product</h3>
                <form onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text"
                            className='form-control'
                            placeholder='Product name..'
                            id='name'
                            name='name'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select 
                            id="category"
                            className='form-control'
                            name='category'
                            onChange={handleChange}
                        >
                            <option value="">Select a category</option>
                            <option value="first">First</option>
                            <option value="second">Second</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input 
                            type="number"
                            className='form-control'
                            placeholder='Product price..'
                            id='price'
                            name='price'
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="file">File</label>
                        <input 
                            type="file"
                            className='form-control'
                            id='file'
                            name='avatar'
                            onChange={handleImage}
                        />
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary mt-2">submit</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default connect(null,{addProducts})(AddProduct);