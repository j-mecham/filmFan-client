import React from 'react';
import Card from 'react-bootstrap/Card';

export function UserInfo({ profile }) {
    return (
        <Card>
            <Card.Body>
                <p>Username: {profile.Username}</p>
                <p>Email: {profile.Email}</p>
                <p>Birthday: {profile.Birthday.slice(0, 10)}</p>
            </Card.Body>
        </Card>
    );
}