import './nav-list-item.scss';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useState } from 'react';

const NavListItem = ({ content }) => {
  const [isListOpen, setIsListOpen] = useState(false);

  const handleOpenList = () => setIsListOpen(!isListOpen);

  return (
    <li className="nav-list-item">
      <div className="nav-list-item__title" onClick={handleOpenList}>
        {content.charAt(0).toUpperCase() + content.slice(1)}
        <IoMdArrowDropdown
          className="nav-list-item__dropdown-icon"
          style={{ rotate: !isListOpen && '-90deg' }}
        />
      </div>
      {isListOpen && (
        <ul className="nav-list-item__sub-list">
          <li className="nav-list-item__sub-list-item">1</li>
          <li className="nav-list-item__sub-list-item">1</li>
          <li className="nav-list-item__sub-list-item">1</li>
          <li className="nav-list-item__sub-list-item">1</li>
        </ul>
      )}
    </li>
  );
};

export default NavListItem;
