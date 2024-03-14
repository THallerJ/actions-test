import styles from './message.module.scss';

const Message = ({ text, children }: MessageProps) => {
  return <div className={styles.message}>{children ? children : text}</div>;
};

export default Message;

type MessageProps = {
  text?: string;
  children?: React.ReactNode;
};
