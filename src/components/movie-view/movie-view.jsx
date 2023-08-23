import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import "./movie-view.scss";

export const MovieView = ({ movies, user, setUser, token }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);
    const [isFavorite, setIsFavorite] = useState(
        user && movie && user.FavoriteMovies.some((fm) => fm == movie.id)
    );

    useEffect(() => {
        setIsFavorite(
            user && movie && user.FavoriteMovies.some((fm) => fm == movie.id)
        );
    }, [user, movie]);

    const handleToggleFavorite = () => {
        fetch(
            `https://filmfanattic-8d1d52c1e608.herokuapp.com/users/${user.Username}/movies/${movie.id}`,
            {
                method: isFavorite ? 'DELETE' : 'POST',
                headers: { Authorization: `Bearer ${token}` },
            }
        )
            .then((response) => {
                console.log("1 " + response);
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then((updatedUserResponse) => {
                console.log("2 ", updatedUserResponse);
                setUser(updatedUserResponse);
                console.log("3 " + updatedUserResponse.FavoriteMovies.some((fm) => fm == movie.id))
                setIsFavorite(
                    updatedUserResponse.FavoriteMovies.some((fm) => fm == movie.id)
                );
            })
            .catch((error) => {
                const contentType = error.headers.get('content-type');
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    error
                        .json()
                        .then((errorMessage) =>
                            alert(`An error occurred: ${errorMessage}`)
                        );
                } else {
                    error.text().then((errorMessage) => alert(errorMessage));
                }
            });
    };

    return (
        <div>
            {movie ? (
                <>
                    <div>
                        <img className="w-100" src={movie.image} />
                    </div>
                    <div>
                        <span>Title: </span>
                        <span>{movie.title}</span>
                    </div>
                    <div>
                        <span>Director: </span>
                        <span>{movie.director}</span>
                    </div>
                    <div>
                        <span>Genre: </span>
                        <span>{movie.genre}</span>
                    </div>
                    <div>
                        <span>Description: </span>
                        <span>{movie.description}</span>
                    </div>
                    <div>
                        <span>Release Year: </span>
                        <span>{movie.year}</span>
                    </div>
                    <div>
                        <span>Cast: </span>
                        <span>{movie.actors.join(', ')}</span>
                    </div>
                    <Link to={`/`}>
                        <button className="back-button">Back</button>
                    </Link>
                    <Button
                        variant={isFavorite ? 'danger' : 'success'}
                        onClick={handleToggleFavorite}
                    >
                        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </Button>
                </>
            ) : (
                <span>Movie not found</span>
            )}
        </div>
    );
};