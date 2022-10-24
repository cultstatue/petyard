import React, { useState } from "react";
import { Form, Button, Col, Row } from 'react-bootstrap';

function CreatePet() {
    return (
        <>
        <container>

            <Row className="justify-content-md-center">
                <Col lg className="m-4">
                    <Form>

                    <Form.Group className="mb-3" controlId="formPetName">
                        <Form.Label>Pet's name</Form.Label>
                        <Form.Control type="text" placeholder="Your Pet's name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPetGender">
                        <Form.Label>Pet's Gender</Form.Label>
                        <Form.Select>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Unknown</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPetAge">
                        <Form.Label>Pet's Age</Form.Label>
                        <Form.Control type="number" placeholder="Your Pet's age" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPetSpecies">
                        <Form.Label>Pet's Species</Form.Label>
                        <Form.Select>
                            <option>Dog</option>
                            <option>Cat</option>
                            <option>Bird</option>
                            <option>Reptile</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPetBreed">
                        <Form.Label>Pet's Breed</Form.Label>
                        <Form.Control type="text" placeholder="Your Pet's Breed" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPetImage">
                        <Form.Label>Choose an image for your pet!</Form.Label>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label class="form-check-label" for="flexRadioDefault1">
                                <img className="pet" src={`/images/cat.gif`}></img>
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                            <label class="form-check-label" for="flexRadioDefault2">
                            <img className="pet" src={`/images/cat2.gif`}></img>
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label class="form-check-label" for="flexRadioDefault1">
                                <img className="pet" src={`/images/dog.gif`}></img>
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label class="form-check-label" for="flexRadioDefault1">
                                <img className="pet" src={`/images/dog2.gif`}></img>
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label class="form-check-label" for="flexRadioDefault1">
                                <img className="pet" src={`/images/dog3.gif`}></img>
                            </label>
                        </div>
                   
                    
                    </Form.Group>

                    </Form>
                </Col>
            </Row>
            
        </container>
        </>
    );

}

export default CreatePet