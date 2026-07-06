import styles from './styles.module.css';

type ButtonProps = {
  icon: React.ReactNode;
  color?: 'green' | 'red';
} & React.ComponentProps<'button'>;

export function Button({ icon, color = 'green', ...rest }: ButtonProps) {
  return (
    <>
      <button className={`${styles.button} ${styles[color]}`} {...rest}>
        {icon}
      </button>
    </>
  );
}
