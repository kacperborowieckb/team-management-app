import { TASKS_COLORS } from '../../helpers/colors';
import './color-selector.scss';

const ColorSelector = ({ taskColor, setTaskColor }) => {
  const handleColorChange = (color) => setTaskColor(color);

  return (
    <section className="color-selector">
      {TASKS_COLORS.map((color, i) => (
        <div
          key={i}
          className="color-selector__color"
          style={{
            backgroundColor: color,
            boxShadow: color === taskColor && `0px 0px 12px 4px ${color}`,
          }}
          onClick={() => handleColorChange(color)}
        ></div>
      ))}
    </section>
  );
};

export default ColorSelector;
