import React from "react";
import { Link } from "react-router-dom";

const FavoritesList = ({
  favorites,
  onClear,
  onRemove,
  onDragStart,
  onDrop,
  allowDrop,
}) => {
  return (
    <aside className="favorites-sidebar" onDragOver={allowDrop} onDrop={onDrop}>
      <div className="fav-header">
        <h3>❤️ Favorites</h3>
        {favorites.length > 0 && (
          <button onClick={onClear} className="btn-clear">
            Clear
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="fav-placeholder">
          <p>Drag properties here to save</p>
        </div>
      ) : (
        <ul className="fav-list">
          {favorites.map((fav) => (
            <li
              key={fav.id}
              className="fav-item"
              draggable="true"
              onDragStart={(e) => onDragStart(e, fav.id)}
            >
              <Link to={`/property/${fav.id}`} className="fav-link">
                <img src={fav.picture} alt="thumb" />
                <div className="fav-info">
                  <h4>£{fav.price.toLocaleString()}</h4>
                  <p>{fav.type}</p>
                </div>
              </Link>

              <button
                className="btn-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(fav.id);
                }}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default FavoritesList;
