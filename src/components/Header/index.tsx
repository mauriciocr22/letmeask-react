import { RoomCode } from "../RoomCode";

import './styles.scss'

import logoImg from '../../assets/images/logo.svg';
import { useParams } from "react-router-dom";
import { Button } from "../Button";

type RoomParams = {
  id:string;
}

type HeaderProps = {
  isAdmin?: boolean;
  handleEndRoom?: () => void;
}

export function Header({ isAdmin = false, handleEndRoom }: HeaderProps ) {
  const params = useParams<RoomParams>();
  const roomId = params.id;

  return(
    <header>
    <div className="content">
      <img src={logoImg} alt="Letmeask" />
      <div>
        <RoomCode code={roomId} />
        { isAdmin && <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>}
      </div>
    </div>
  </header>
  )
}