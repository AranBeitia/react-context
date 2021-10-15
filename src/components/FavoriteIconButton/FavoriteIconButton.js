import React from "react";
import { SavedIcon, UnsavedIcon } from "../SVGIcons";

import "./FavoriteIconButton.scss";

function FavoriteIconButton({ handleSetFavorite, isFavorite }) {
  return (
    <button
      type="button"
      className="btn btn-light FavoriteIconButton"
      onClick={handleSetFavorite}
      aria-label="save as favorite"
    >
      {isFavorite ? <SavedIcon /> : <UnsavedIcon />}
    </button>
  );
}

export default FavoriteIconButton;
