import Card from "./Card";

const Cards = ({ countries }) => {
    return (
      <div>
        {countries.map(({ ID, flag, name, continent } ) => {
          return <Card key={ID} ID={ID} flag={flag} name={name} continent={continent} />;
        })}
      </div>
    );
  };
  
  export default Cards;
  