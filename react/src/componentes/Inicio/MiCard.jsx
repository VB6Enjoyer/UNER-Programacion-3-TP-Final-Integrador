import React from 'react';

// clases de bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export function MiCard (props)  {

    const { articulo } = props;

    return (
        <div className='container mt-4 mb-5'>
            <Card>
                <Card.Img variant="top" src={articulo.urlToImage} />
                <Card.Body>
                    <Card.Title>{articulo.title}</Card.Title>
                    <Card.Text>
                        {articulo.description}
                    </Card.Text>
                    <Button variant='primary' as='a'
                        href={articulo.url}
                        target='_blank'>Ver Nota
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}