import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const getDetail = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  }, [id]);
  useEffect(() => {
    getDetail();
  }, [getDetail]);
  return (
    <div>
      <Link to="/">
        <button>Home</button>
      </Link>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{movie.title}</h1>
          <ul>
            {movie.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <p>{movie.description_full}</p>
          <img src={movie.large_cover_image} alt={movie.title} />
        </div>
      )}
    </div>
  );
}
export default Detail;
