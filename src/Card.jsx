import './styles.css';

const Card = ({pal}) => {

    function getElementImage(element1, element2) {
        if (element2 === '') {
            return <img src={require(`./types/${element1}_icon_mini.webp`)} />;
        }

        return (
            <>
                <img src={require(`./types/${element1}_icon_mini.webp`)} />
                <img src={require(`./types/${element2}_icon_mini.webp`)} />
            </>
        );
    };

    if (pal.Name.toLowerCase().startsWith('alpha')) {
        return null;
    }

    const element1 = pal.ElementType1.slice(17);
    const element2 = pal.ElementType2.slice(17) !== 'None' ? pal.ElementType2.slice(17) : '';
    const element = `${element1} ${element2}`;

    return (
        <div className='card'>
            <h3>{pal.Name}</h3>
            <p>Type: {element}</p>
            {getElementImage(element1, element2)}
        </div>
    );
};


export default Card;