import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAlbum, setSelectedAlbum } from "./features/Albums/albumsSlice";

import { generateStars } from "./utils/generateStars";

import { fetchAlbums } from "./features/Albums/albumsSlice";


function HomePage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [reload, setReload] = useState(false);

    const albums = useSelector(state => state.albums.albums);
    console.log(albums);

    useEffect(()=> {
        dispatch(fetchAlbums());
    }, [dispatch, reload]);

    const handleDeleteAlbum = (id) => {
        dispatch(deleteAlbum(id));
        setReload(!reload);
    }

    const handleModifyAlbum = (albumId) => {
        const album = albums.find((album) => album.id === albumId);
        dispatch(setSelectedAlbum(album));
        navigate(`/albums/update/?mode=update`);
    }

    return ( 
    <div className="container mx-auto p-5">
        <h2 className="text-3xl font-bold text-center mb-6">Liste des albums</h2>
        <div className="flex justify-center">
            {
                albums && (
                    albums.map((album) => (
                        <article key={album.id} className="card lg:card-side bg-base-100 shadow-xl">
                            
                            <figure>
                                <img src={album.coverURL} alt={`Album ${album.title}`} className="w-full h-full object-cover"/>
                            </figure>

                            <div className="card-body p-5">

                                <h2 className="card-title text-2xl first-letter:uppercase">{album.title}</h2>
                                <p className="text-secondary font-bold first-letter:uppercase">{album.artist}</p>

                                <div className="flex-grow">
                                    <p className="font-medium">Date de sortie</p>
                                    <p>{album.releaseDate}</p>
                                </div>

                                <div className="card-actions flex-grow justify-center" >
                                {generateStars(album.score)}
                                </div>

                                <div className="card-actions justify-between flex-grow">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleModifyAlbum(album.id)}
                                    >
                                        Modifier
                                    </button>
                                    <button 
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => handleDeleteAlbum(album.id)}
                                    >
                                        Supprimer
                                    </button>
                                </div>

                            </div>

                        </article>
                    ))
                )
            }
        </div>
    </div>
     );
}

export default HomePage;