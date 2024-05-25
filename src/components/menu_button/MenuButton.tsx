'use client';
import styles from './menu_button.module.scss';
import { useAnimationCss } from '@/hooks';

const MenuButton = ({ onClick, toggled }: MenuButtonprops) => {
  const animation = useAnimationCss(
    toggled,
    styles.open,
    styles.closed,
    styles.defaultStyle
  );

  return (
    <button aria-label="menu" className={styles.menu} onClick={onClick}>
      <span className={`${styles.topMenu} ${animation}`}></span>
      <span className={`${styles.midMenu} ${animation}`}></span>
      <span className={`${styles.bottomMenu} ${animation}`}></span>
    </button>
  );
};

export default MenuButton;

type MenuButtonprops = {
  onClick: () => void;
  toggled: boolean;
};
