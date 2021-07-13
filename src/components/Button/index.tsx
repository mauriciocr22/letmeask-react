import { ButtonHTMLAttributes } from 'react'
import { useTheme } from '../../hooks/useTheme';
import cx from 'classnames';

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  const { theme } = useTheme();

  return (
    <button 
      // className={`button ${isOutlined ? 'outlined' : ''}`}
      className={cx(
        'button',
        { outlined: isOutlined === true },
        { dark: theme === 'dark'}
      )}
      {...props}
    />
  )
}
