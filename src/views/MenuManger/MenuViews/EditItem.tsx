import '../MenuManager.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { MenuHooks } from '../../../hooks';
import { MenuItem } from '../../../models';
import { Spinner } from '../../../components';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditItem() {
    const id = parseInt(useParams<{ id: string }>().id);

    const [menuitems, setMenuitems] = useState<MenuItem[]>([]);
    var menuitemCategories = MenuHooks.useCategories();

    useEffect(() => {
        let items: MenuItem[] = [];
        menuitemCategories.forEach((category) => {
            category.menuitems.forEach((menuitem) => {
                items.push(menuitem);
            });
        });
        setMenuitems(items);
    }, [menuitemCategories]);

    const [menuitem, setMenuitem] = useState<MenuItem>();
    const [loading, setLoading] = useState(true);

    const [flavour, setFlavour] = useState('');
    const [price, setPrice] = useState('0');
    const [imgURL, setImgURL] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        for (let i of menuitems) {
            if (i.id === id) {
                setMenuitem(i);
                break;
            }
        }
        setTimeout(() => setLoading(false), 1000);
    }, [menuitems, id]);

    useEffect(() => {
        setFlavour(menuitem === undefined ? '' : menuitem.flavour);
        setPrice(menuitem === undefined ? '' : menuitem.price.toString());
        setImgURL(menuitem === undefined ? '' : menuitem.image_url);
        setDescription(menuitem === undefined ? '' : menuitem.description);
    }, [menuitem]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        fetch(`http://localhost:9090/update-menuitem`, {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                flavour: flavour,
                price: parseFloat(price),
                imgURL: imgURL,
                description: description,
            }),
        })
            .then((res) => res.json())
            .then((data) =>
                data.message === 'success'
                    ? toast('Menuitem update successfully!', {
                          className: 'success-toast',
                      })
                    : toast('This flavour already exists for this category', {
                          className: 'error-toast',
                      })
            )
            .catch((err) => console.log(err));
    };

    return (
        <div className="con">
            <h1>Edit Menuitem</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    {menuitem === undefined ? (
                        <div>
                            <h1>Menuitem not found</h1>
                        </div>
                    ) : (
                        <div className="form-con">
                            <form
                                className="item-form"
                                onSubmit={(e) => {
                                    handleSubmit(e);
                                }}
                            >
                                <label>
                                    Flavour: <br />
                                    <input
                                        type="text"
                                        name="name"
                                        value={flavour}
                                        required
                                        onChange={(e) =>
                                            setFlavour(e.target.value)
                                        }
                                    />
                                </label>
                                <label>
                                    Description: <br />
                                    <textarea
                                        name="description"
                                        id="desc"
                                        cols={30}
                                        rows={6}
                                        value={description}
                                        required={true}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    ></textarea>
                                </label>
                                <label>
                                    Price: ($)
                                    <br />
                                    <input
                                        type="number"
                                        required={true}
                                        name="price"
                                        min="0"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                        step="0.01"
                                    />
                                </label>
                                <label>
                                    Profile Image URL: <br />
                                    <input
                                        type="url"
                                        required={true}
                                        name="profile-pic"
                                        value={imgURL}
                                        onChange={(e) =>
                                            setImgURL(e.target.value)
                                        }
                                    />
                                </label>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="submit"
                                />
                            </form>
                        </div>
                    )}
                </div>
            )}
            <ToastContainer
                transition={Zoom}
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}
