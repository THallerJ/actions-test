import styles from './menu_button.module.scss';

type MenuButtonprops = {
  onClick: () => void;
  toggled: boolean;
};

const MenuButton = ({ onClick, toggled }: MenuButtonprops) => {
  return (
    <button className={styles.menu} onClick={onClick}>
      <span
        className={`${styles.topMenu} ${toggled ? styles.open : styles.closed}`}
      ></span>
      <span
        className={`${styles.midMenu} ${toggled ? styles.open : styles.closed}`}
      ></span>
      <span
        className={`${styles.bottomMenu} ${
          toggled ? styles.open : styles.closed
        }`}
      ></span>
    </button>
  );
};

export default MenuButton;
