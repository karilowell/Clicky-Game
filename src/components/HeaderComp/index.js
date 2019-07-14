import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'

import './style.css'

export default function HeaderComp(props) {
    return (
        <Jumbotron fluid className='jumbotron text-dark'>
            <Container className='my-3 py-3 mx-auto' >
                <h1>Clicky Game</h1>
                
            </Container>
        </Jumbotron>
    )
}
