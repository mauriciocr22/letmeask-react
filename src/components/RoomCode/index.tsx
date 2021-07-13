import copyImg from '../../assets/images/copy.svg';
import { useTheme } from '../../hooks/useTheme';
import cx from 'classnames';

import './styles.scss';

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  const { theme } = useTheme();

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }
  
  return(
    <button className={cx(
      'room-code',
      { dark: theme === 'dark' }
    )} onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
}