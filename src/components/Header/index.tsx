import { useParams } from "react-router-dom";
import cx from 'classnames';
import SVG from 'react-inlinesvg'

import './styles.scss'

import logoImg from '../../assets/images/logo.svg';
import darkLogoImg from '../../assets/images/logodark.svg'
import closeIcon from '../../assets/images/logout.svg'

import { Button } from "../Button";
import { ThemeButton } from "../ThemeButton";
import { RoomCode } from "../RoomCode";
import { useTheme } from "../../hooks/useTheme";
import { useEffect, useState } from "react";


type RoomParams = {
  id:string;
}

type HeaderProps = {
  isAdmin?: boolean;
  handleEndRoom?: () => void;
}

export function Header({ isAdmin = false, handleEndRoom }: HeaderProps ) {
  const { theme } = useTheme();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [windowDimensions, setWindowDimensions] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return(
    <header className={theme}>
    <div className={cx(
      'content',
      {dark: theme === "dark"}
    )}>
      <img src={theme === 'dark' ? darkLogoImg : logoImg} alt="Letmeask" />
      <div className={theme}>
        <RoomCode code={roomId} />
        { isAdmin && <Button isOutlined onClick={handleEndRoom}>{windowDimensions > 768 ? "Encerrar Sala" : <SVG className={cx(
          "svg-close",
          {dark: theme === "dark"}
        )} src={closeIcon} />}</Button>}
        <ThemeButton />
      </div>
    </div>
  </header>
  )
}