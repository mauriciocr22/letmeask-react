import { ReactNode } from 'react';
import cx from 'classnames';

import './styles.scss';
import { useTheme } from '../../hooks/useTheme';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps) {
  const { theme } = useTheme()
  return (
    <div 
      className={cx(
        'question',
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered },
        { dark: theme === 'dark'}
      )}
    >
      <p className={theme}>{content}</p>
      <footer className={theme}>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}