/* eslint-disable react/no-unescaped-entities */
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addNewAlbum } from "./albumsSlice";


function FormAlbum() {

    const dispatch = useDispatch();

    const inputArtist = useRef();
    const inputTitle = useRef();
    const inputDate = useRef();
    const inputScore = useRef();
    const inputCover = useRef();


    const handleSubmitForm = (e) => {

        e.preventDefault();

        const dateFr = inputDate.current.value.split("-").reverse().join("/");
        
        const newAlbum = {
            artist: inputArtist.current.value.trim(),
            title: inputTitle.current.value.trim(),
            releaseDate: dateFr,
            score: inputScore.current.value,
            coverURL: inputCover.current.value.trim()
        }

        dispatch(addNewAlbum(newAlbum));

        inputArtist.current.value = "";
        inputTitle.current.value = "";
        inputDate.current.value = "";
        inputScore.current.value = "";
        inputCover.current.value = "";
    }

    return ( 
        <form onSubmit={handleSubmitForm} className="mx-auto flex flex-col w-[500px] border border-gray-300 p-4 rounded-lg bg-gray-100">
            <label className="mx-auto mb-4 flex flex-col w-[300px] leading-8 font-medium">
                Artiste
                <input ref={inputArtist} type="text" className="input input-bordered input-secondary input-sm w-full max-w-xs font-normal" />
            </label>
            <label className="mx-auto mb-4 flex flex-col w-[300px] leading-8 font-medium">
                Titre de l'abum:
                <input ref={inputTitle} type="text" className="input input-bordered input-secondary input-sm w-full max-w-xs font-normal"/>
            </label>
            <label className="mx-auto mb-4 flex flex-col w-[300px] leading-8 font-medium">
                Date de sortie
                <input ref={inputDate} type="date" className="input input-bordered input-secondary input-sm w-full max-w-xs font-normal"/>
            </label>

            <label className="mx-auto mb-4 flex flex-col w-[300px] leading-8 font-medium">
                Cover
                <input ref={inputCover} type="url" className="input input-bordered input-secondary input-sm  w-full max-w-xs font-normal"/>
            </label>
            <label className="rating mx-auto flex justify-evenly w-[300px] font-medium">
                Note de l'album : 
                <input
                    className="mask mask-star-2 bg-green-500"
                    type="radio"
                    ref={inputScore}
                    name="score"
                    value="1"
                />
                <input
                    className="mask mask-star-2 bg-green-500"
                    type="radio"
                    ref={inputScore}
                    name="score"
                    value="2"
                />
                <input
                    className="mask mask-star-2 bg-green-500"
                    type="radio"
                    ref={inputScore}
                    name="score"
                    value="3"
                />
                <input
                    className="mask mask-star-2 bg-green-500"
                    type="radio"
                    ref={inputScore}
                    name="score"
                    value="4"
                />
                <input
                    className="mask mask-star-2 bg-green-500"
                    type="radio"
                    ref={inputScore}
                    name="score"
                    value="5"
                />
            </label>

            <button type="submit" className="btn btn-secondary mx-auto w-[300px] mt-4">Ajouter</button>

        </form>


     );
}

export default FormAlbum;