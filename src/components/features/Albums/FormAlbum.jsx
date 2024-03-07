/* eslint-disable react/no-unescaped-entities */
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

import { addNewAlbum, updateAlbum } from "./albumsSlice";

function FormAlbum() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // eslint-disable-next-line no-unused-vars
    let [searchParams, setSearchParams] = useSearchParams();
    const mode = searchParams.get("mode") ?? "add";

    const albumFound = useSelector(state => state.albums.albumSelected);

    const [radioValue, setRadioValue] = useState(null);
    console.log(albumFound);

    const inputArtist = useRef();
    const inputTitle = useRef();
    const inputDate = useRef();
    const inputCover = useRef();

    const handleSubmitForm = (e) => {

        e.preventDefault();

        const dateFr = inputDate.current.value.split("-").reverse().join("/");

        if (mode === "add") {

            const newAlbum = {
                artist: inputArtist.current.value.trim(),
                title: inputTitle.current.value.trim(),
                releaseDate: dateFr,
                score: radioValue,
                coverURL: inputCover.current.value.trim()
            }

            dispatch(addNewAlbum(newAlbum));

        } else {
            const updatedAlbum = {
                id: albumFound.id,
                artist: inputArtist.current.value.trim(),
                title: inputTitle.current.value.trim(),
                releaseDate: dateFr,
                score: radioValue === null ? albumFound.score : radioValue,
                coverURL: inputCover.current.value.trim()
            }
            dispatch(updateAlbum(updatedAlbum));
        }

        navigate("/");

        inputArtist.current.value = "";
        inputTitle.current.value = "";
        inputDate.current.value = "";
        inputCover.current.value = "";
    }

    return ( 
        <div>

            <h3 className="text-3xl font-bold text-center my-6">
                {mode === "update" ? "Modifier" : "Ajouter"} un album
            </h3>
            <form 
                onSubmit={handleSubmitForm}
                className="mx-auto flex flex-col w-[500px] border border-gray-300 p-4 rounded-lg bg-gray-100"
            >
                <label className="mx-auto mb-4 flex flex-col w-[300px] leading-8 font-medium">
                    Artiste
                    <input 
                        ref={inputArtist} 
                        defaultValue={mode === "update" ? albumFound.artist : ""}
                        type="text" 
                        required
                        className="input input-bordered input-secondary input-sm w-full max-w-xs font-normal" 
                    />
                </label>
                <label className="mx-auto mb-4 flex flex-col w-[300px] leading-8 font-medium">
                    Titre de l'abum:
                    <input 
                        ref={inputTitle} 
                        defaultValue={mode === "update" ? albumFound.title : ""}
                        type="text" 
                        required
                        className="input input-bordered input-secondary input-sm w-full max-w-xs font-normal"
                    />
                </label>
                <label className="mx-auto mb-4 flex flex-col w-[300px] leading-8 font-medium">
                    Date de sortie
                    <input 
                        ref={inputDate} 
                        defaultValue={mode === "update" ? albumFound.releaseDate : ""}
                        type="date" 
                        required
                        className="input input-bordered input-secondary input-sm w-full max-w-xs font-normal"
                    />
                </label>

                <label className="mx-auto mb-4 flex flex-col w-[300px] leading-8 font-medium">
                    Cover
                    <input 
                    ref={inputCover} 
                    defaultValue={mode === "update" ? albumFound.coverURL : ""}
                    type="url" 
                    required
                    className="input input-bordered input-secondary input-sm  w-full max-w-xs font-normal"/>
                </label>

                <label className="rating mx-auto flex justify-evenly w-[300px] font-medium">
                    Note de l'album : 
                    <input
                        className="mask mask-star-2 bg-accent"
                        type="radio"
                        onChange={(e) => setRadioValue(e.target.value)}
                        defaultChecked={mode === "update" ? albumFound.score === "1" : false}
                        name="score"
                        value="1"
                    />
                    <input
                        className="mask mask-star-2 bg-accent"
                        type="radio"
                        onChange={(e) => setRadioValue(e.target.value)}
                        defaultChecked={mode === "update" ? albumFound.score === "2" : false}
                        name="score"
                        value="2"
                    />
                    <input
                        className="mask mask-star-2 bg-accent"
                        type="radio"
                        onChange={(e) => setRadioValue(e.target.value)}
                        defaultChecked={mode === "update" ? albumFound.score === "3" : false}
                        name="score"
                        value="3"
                    />
                    <input
                        className="mask mask-star-2 bg-accent"
                        type="radio"
                        onChange={(e) => setRadioValue(e.target.value)}
                        defaultChecked={mode === "update" ? albumFound.score === "4" : false}
                        name="score"
                        value="4"
                    />
                    <input
                        className="mask mask-star-2 bg-accent"
                        type="radio"
                        onChange={(e) => setRadioValue(e.target.value)}
                        defaultChecked={mode === "update" ? albumFound.score === "5" : false}
                        name="score"
                        value="5"
                    />
                </label>

                <button type="submit" className="btn btn-secondary mx-auto w-[300px] mt-4">
                    {mode === "update" ? "Modifier" : "Ajouter"}
                </button>

            </form>

        </div>
        


     );
}

export default FormAlbum;