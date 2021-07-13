import { useTheme } from "../../hooks/useTheme"
import cx from 'classnames';

import SVG from 'react-inlinesvg';

import lightImg from '../../assets/images/sun.svg';
import darkImg from '../../assets/images/moon.svg';

import './styles.scss';

export function ThemeButton() {
  const { theme, toggleTheme } = useTheme()

  return(
    <button
     className={cx(
       "theme-button",
       {dark: theme === "dark"}
     )}
     onClick={toggleTheme}
     type="button"     
    >
      {theme === 'light' ? <SVG src={darkImg}/> : <SVG src={lightImg}/>}
    </button>
  )
} 