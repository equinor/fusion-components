import React, { ReactNode, FC } from 'react';
import styles from "./styles.less"
import { type } from 'os';

type MenuItemContainerProps ={
    children?:ReactNode;

}

const MenuItemContainer: FC<MenuItemContainerProps> = ({children}) => {

    return(
        <button className={styles.container}>
            {children}
        </button>
    )
}

export default MenuItemContainer;