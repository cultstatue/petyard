import React, { useState } from "react";
import { Form, Button, Col, Row } from 'react-bootstrap';

import { useMutation } from "@apollo/client";
import { ADD_PET } from "../../utils/mutations";

function CreatePet() {

    const [petFormData, setPetFormData] = useState({
        name: "",
        gender: "Male",
        age: "",
        species:"Dog",
        breed:"",
        image:"cat.gif"
    })

    const [validated, setValidated] = useState(false);

    const [addPet, { error }] = useMutation(ADD_PET)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(event.target);
        console.log(`name is ${name} value is ${value}`);
        setPetFormData({ ...petFormData, [name]: value });
        console.log(petFormData);
    }

    const formHandler = async(event) => {
        console.log(petFormData);
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        try {
            const { data } = await addPet({
                variables: { ...petFormData }
            })

            console.log(data)
        }
        catch (error) {
            console.error(error);
        }

        setPetFormData({
            name: "",
            gender: "Male",
            age: "",
            species:"Dog",
            breed:"",
            image:"cat.gif"
        })
    }

    return (
        <>
        

            <Row className="justify-content-md-center">
                <Col lg className="m-4">
                    <Form noValidate validated={validated} onSubmit={formHandler}>

                    <Form.Group className="mb-3" controlId="formPetName">
                        <Form.Label>Pet's name</Form.Label>
                        <Form.Control
                        name="name"
                        onChange={handleInputChange}
                        defaultValue={petFormData.name} 
                        type="text" 
                        placeholder="Your Pet's name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPetGender">
                        <Form.Label>Pet's Gender</Form.Label>
                        <Form.Select
                        name="gender"
                        onChange={handleInputChange}
                        defaultValue={petFormData.gender}
                        >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Unknown</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPetAge">
                        <Form.Label>Pet's Age</Form.Label>
                        <Form.Control
                        name="age" 
                        type="number"
                        onChange={handleInputChange}
                        defaultValue={petFormData.age}
                        placeholder="Your Pet's age" 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPetSpecies">
                        <Form.Label>Pet's Species</Form.Label>
                        <Form.Select
                        name="species"
                        onChange={handleInputChange}
                        defaultValue={petFormData.species}
                        >
                            <option>Dog</option>
                            <option>Cat</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPetBreed">
                        <Form.Label>Pet's Breed</Form.Label>
                        <Form.Control
                        name="breed" 
                        type="text"
                        onChange={handleInputChange}
                        defaultValue={petFormData.breed} 
                        placeholder="Your Pet's Breed" 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPetImage">
                        <Form.Label>Choose an image for your pet!</Form.Label>

                        <div onChange={handleInputChange} defaultValue={petFormData.image}>
                            <input type="radio" value="cat.gif" name="image" /> 
                            <img className="pet" src={`/images/cat.gif`}></img>

                            <input type="radio" value="cat2.gif" name="image" /> 
                            <img className="pet" src={`/images/cat2.gif`}></img>

                            <input type="radio" value="dog.gif" name="image" />
                            <img className="pet" src={`/images/dog.gif`}></img> 

                            <input type="radio" value="dog2.gif" name="image" />
                            <img className="pet" src={`/images/dog2.gif`}></img>

                            <input type="radio" value="dog3.gif" name="image" />
                            <img className="pet" src={`/images/dog3.gif`}></img>
                            
                        </div>
                                    
                    </Form.Group>

                    <Button
                        disabled={!(petFormData.image 
                            && petFormData.breed
                            && petFormData.species
                            && petFormData.age
                            && petFormData.gender
                            && petFormData.name
                            )}
                        type='submit'
                        variant='success'>
                        Create!
                    </Button>

                    </Form>
                </Col>
            </Row>
            
        
        </>
    );

}

export default CreatePet