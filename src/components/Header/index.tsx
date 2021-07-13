import { useParams } from "react-router-dom";
import cx from 'classnames';

import './styles.scss'

import logoImg from '../../assets/images/logo.svg';
import darkLogoImg from '../../assets/images/logodark.svg'

import { Button } from "../Button";
import { ThemeButton } from "../ThemeButton";
import { RoomCode } from "../RoomCode";
import { useTheme } from "../../hooks/useTheme";


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

  return(
    <header className={theme}>
    <div className={cx(
      'content',
      {dark: theme === "dark"}
    )}>
      <img src={theme === 'dark' ? darkLogoImg : logoImg} alt="Letmeask" />
      <div className={theme}>
        <RoomCode code={roomId} />
        { isAdmin && <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>}
        <ThemeButton />
      </div>
    </div>
  </header>
  )
}