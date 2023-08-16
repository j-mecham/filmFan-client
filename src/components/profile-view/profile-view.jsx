import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function ProfileView({ token, user, setUser, movies }) {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://filmfanattic-8d1d52c1e608.herokuapp.com/users`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error loading profile');
                }
                return response.json();
            })
            .then((data) => {
                const userProfile = data.find((u) => u.Username === user.Username);
                setProfile(userProfile);
            })
            .catch((error) => {
                setError('Something went wrong. Please try again later.');
            });
    }, [token, user]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div>
                <span>Name: </span>
                <span>{user.Username}</span>
            </div>
            <div>
                <span>Email: </span>
                <span>{user.Email}</span>
            </div>
            <div>
                <span>Birthday: </span>
                <span>{user.Birthday}</span>
            </div>
            <div>
                <span>Favorite Movies: </span>
                <span>{user.FavoriteMovies}</span>
            </div>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};