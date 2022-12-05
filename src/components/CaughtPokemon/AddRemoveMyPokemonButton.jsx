import React, { Fragment } from "react";
import { useCaughtPokemon } from "../../context/CaughtPokemonContext";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { capitalize } from "../../utils/text-formatting";

// TODO reference to login if not logged in instead of adding pokemon (available only to logged in users)
//TODO clean old remove buttons, rename this one
const AddRemoveMyPokemonButton = ({
  pokemonNumber,
  pokemonName = "Pokemon",
}) => {
  const { saveCaughtPokemon, removeCaughtPokemon, caughtPokemon } =
    useCaughtPokemon();
  const [isHovered, setIsHovered] = React.useState(false);
  const addButton = React.useRef();
  const btn = addButton.current;

  const btnText = React.useRef();
  const btnIcon = React.useRef();
  const setButtonRemove = () => {
    btnText.current.innerText = "Remove from caught";
    btnIcon.current.innerText = "-";
    btnIcon.current.style.fontSize = "22px";
    btnIcon.current.style.marginRight = "8px";
  };

  const setButtonAdd = () => {
    btnText.current.innerText = "Add to caught";
    btnIcon.current.innerText = "+";
    btnIcon.current.style.fontSize = "14px";
    btnIcon.current.style.marginRight = "6px";
  };

  React.useEffect(() => {
    if (caughtPokemon.includes(pokemonNumber)) {
      setButtonRemove();
    } else if (!caughtPokemon.includes(pokemonNumber)) {
      setButtonAdd();
    }
  }, [caughtPokemon]);

  const ToastMessageAddedToMyPokemon = ({ pokemonName }) => (
    <div>
      <Link
        to={`/pokemon/${pokemonName}`}
        className="font-bold underline active:brightness-90"
      >
        {capitalize(pokemonName)}
      </Link>
      &nbsp;added to&nbsp;
      <Link
        to="/my-pokemon"
        className="font-bold underline active:brightness-90"
      >
        My Pokemon
      </Link>
    </div>
  );

  const ToastMessageRemovedFromMyPokemon = ({ pokemonName }) => (
    <div>
      <Link
        to={`/pokemon/${pokemonName}`}
        className="font-bold underline active:brightness-90"
      >
        {capitalize(pokemonName)}
      </Link>
      &nbsp;removed from&nbsp;
      <Link
        to="/my-pokemon"
        className="font-bold underline active:brightness-90"
      >
        My Pokemon
      </Link>
    </div>
  );

  const handleClick = (pokemonNumber) => {
    if (!caughtPokemon.includes(pokemonNumber)) {
      setTimeout(() => {
        setButtonRemove();
      }, 600);
      saveCaughtPokemon(pokemonNumber);
      notify(<ToastMessageAddedToMyPokemon pokemonName={pokemonName} />);
    } else if (caughtPokemon.includes(pokemonNumber)) {
      setTimeout(() => {
        setButtonAdd();
      }, 600);
      removeCaughtPokemon(pokemonNumber);
      notify(<ToastMessageRemovedFromMyPokemon pokemonName={pokemonName} />);
    }
  };

  const notify = (message) => toast(message);
  return (
    <Fragment>
      <button
        ref={addButton}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          btnText.current.innerText = "Done!";
          btnIcon.current.innerText = "✔️";
          btnIcon.current.style.fontSize = "10px";
          handleClick(pokemonNumber);
        }}
        className="p-[6px] m-1 rounded-full text-[#191921] bg-white w-auto max-w-[20px]  overflow-hidden h-5 inline-flex items-center  hover:bg-gray-200 hover:max-w-[124px] transition-all active:scale-95 ease-out"
      >
        <span
          className="mr-[6px] flex items-center justify-center text-sm"
          ref={btnIcon}
        >
          +&nbsp;
        </span>
        <span
          className="flex items-center whitespace-nowrap pr-2 text-[10px]"
          ref={btnText}
        >
          Add to caught
        </span>
      </button>
    </Fragment>
  );
};

export default AddRemoveMyPokemonButton;
