import { Link } from "react-router-dom"

const Card = ({ ID, flag, name, continent }) => {
    return(
        <div>
            <img src={flag} alt={name} />
            <Link to={`/detail/${ID}`}>
            <h2>{name}</h2>
            </Link>
            <h3>{continent}</h3>
        </div>
    )
};

export default Card