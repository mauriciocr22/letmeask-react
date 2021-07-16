import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom'

import { database } from '../services/firebase';

import SVG from 'react-inlinesvg';

import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import darkLogoImg from '../assets/images/logodark.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import githubIcon from '../assets/images/github.svg'
import whatsappIcon from '../assets/images/whatsapp.svg'
import linkedinIcon from '../assets/images/linkedin.svg'

import { Button } from '../components/Button';

import '../styles/auth.scss';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth()
  const [ roomCode, setRoomCode ] = useState('');
  const { theme } = useTheme();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>   
        
      </aside>
      <main>
        <div className="main-content">
          <img src={theme === 'dark' ? darkLogoImg : logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
             type="text" 
             placeholder="Digite o código da sala"
             onChange={event => setRoomCode(event.target.value)}
             value={roomCode}
             className={theme}
             />
             <Button type="submit">
               Entrar na sala
             </Button>
          </form>
          <ul id="socials-icons" className={theme}>
            <li>
              <a href="https://www.linkedin.com/in/maur%C3%ADcio-de-carvalho-96b716213/" target="_blank" rel="noopener noreferrer">
                <SVG src={linkedinIcon}/>      
              </a>
            </li>
            <li>
              <a href="https://github.com/mauriciocr22" target="_blank" rel="noopener noreferrer">
                <SVG src={githubIcon}/>      
              </a>
            </li>
            <li>
              <a href="https://api.whatsapp.com/send?phone=5513974069042" target="_blank" rel="noopener noreferrer">
                <SVG src={whatsappIcon}/>      
              </a>
            </li>
        </ul>
        </div>
      </main>
    </div>
  )
}