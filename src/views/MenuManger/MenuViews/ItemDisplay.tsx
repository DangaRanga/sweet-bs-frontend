import '../MenuManager.css';
import { MenuItem } from '../../../models';
import { Link } from 'react-router-dom';

interface ItemDisplayProps {
    item: MenuItem;
}

export default function ItemDisplay(props: ItemDisplayProps) {
    const handleRemove = () => {
        fetch(`http://localhost:9090/remove-item`, {
            method: 'POST',
            body: JSON.stringify({
                id: props.item.id,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };
    return (
        <div>
            <div className="item-info">
                <p>{props.item.id}</p>
                <p>{props.item.flavour}</p>
                <p>{props.item.category.name}</p>
                <p>${props.item.price}</p>
                <div>
                    <Link to={`/portal/menu-manager/edit/${props.item.id}`}>
                        <button className="add-btn">Edit</button>
                    </Link>
                </div>
                <div>
                    <button className="add-btn" onClick={handleRemove}>
                        Remove
                    </button>
                </div>
            </div>
            <hr />
        </div>
    );
}
