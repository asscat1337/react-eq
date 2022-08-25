import styles from "../../pages/Dashboard/Dashboard.module.scss";
import React from "react";


interface IButtonComponent {
  btn1: boolean
  btn2: boolean
  onClickNext: () => void
  onClickComplete: () => void,
  onMissed: (data: any) => Promise<void>
  onTransfer: () => void,
  current: any
}

const ButtonComponent = React.memo(({
                           btn1,
                           btn2,
                           onClickNext,
                           onClickComplete,
                           onMissed,
                           onTransfer,
                           current
}: IButtonComponent)=> {
  return (
    <div className={styles.buttons}>
      <button
        className={styles.btn}
        disabled={btn1}
        onClick={onClickNext}>
        Следующий
      </button>
      <button
        className={styles.btn}
        disabled={btn2}
        onClick={onClickComplete}>
        Обслужен
      </button>
      <button
        onClick={() => onMissed(current)}
        className={styles.btn}
        disabled={btn2}
      >
        Неявка
      </button>
      <button
        className={styles.btn}
        disabled={btn2}
      >
        Повтор вызова
      </button>
      <button
        onClick={onTransfer}
        className={styles.btn}
        disabled={btn2}>
        Перевод
      </button>
    </div>
  );
})
export {
  ButtonComponent
};