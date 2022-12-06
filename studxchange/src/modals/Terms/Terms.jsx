import React from 'react';
import { ModalPage } from '@vkontakte/vkui';
import { useRouter } from '@happysanta/router';
import { PAGE_HOME } from '../../router';

import './Terms.css';

const Terms = ({ checked, onCheckBoxChecked, id }) => {
  const router = useRouter();
  return (
    <ModalPage id={id} settlingHeight={100}>
      <div>
        <div className="modal-container">
          <div className="modal">
            <h1 className="modal__title">Условия пользования</h1>
            <p className="modal__descr">
              Данное приложение создано для помощи студентам. Если вы хотите зарабатывать, перейдите
              во вкладку “Исполнитель”, если желаете получить услугу - то “Покупатель”.
            </p>
            <p className="modal__descr">
              Правила: 1. <br />
              Кстати, сторонники тоталитаризма в науке лишь добавляют фракционных разногласий и
              представлены в исключительно положительном свете. Лишь диаграммы связей, превозмогая
              сложившуюся непростую экономическую ситуацию, призваны к ответу. <br />
              2. Равным образом, внедрение современных методик, в своём классическом представлении,
              допускает внедрение системы массового участия! Безусловно, я понимаю объективно
              ситуацию где связь противоречит экономической ситуации
            </p>
            <p className="modal__descr">
              Данное приложение создано для помощи студентам. Если вы хотите зарабатывать, перейдите
              во вкладку “Исполнитель”, если желаете получить услугу - то “Покупатель”.
            </p>
            <p className="modal__descr">
              Правила: 1. <br />
              Кстати, сторонники тоталитаризма в науке лишь добавляют фракционных разногласий и
              представлены в исключительно положительном свете. Лишь диаграммы связей, превозмогая
              сложившуюся непростую экономическую ситуацию, призваны к ответу. <br />
              2. Равным образом, внедрение современных методик, в своём классическом представлении,
              допускает внедрение системы массового участия! Безусловно, я понимаю объективно
              ситуацию где связь противоречит экономической ситуации
            </p>
            <p className="modal__descr">
              Данное приложение создано для помощи студентам. Если вы хотите зарабатывать, перейдите
              во вкладку “Исполнитель”, если желаете получить услугу - то “Покупатель”.
            </p>
            <p className="modal__descr">
              Правила: 1. <br />
              Кстати, сторонники тоталитаризма в науке лишь добавляют фракционных разногласий и
              представлены в исключительно положительном свете. Лишь диаграммы связей, превозмогая
              сложившуюся непростую экономическую ситуацию, призваны к ответу. <br />
              2. Равным образом, внедрение современных методик, в своём классическом представлении,
              допускает внедрение системы массового участия! Безусловно, я понимаю объективно
              ситуацию где связь противоречит экономической ситуации
            </p>
          </div>
          <div className="modal__checkbox">
            <input
              checked={checked}
              onChange={onCheckBoxChecked}
              type="checkbox"
              id="policy"
              name="policy"
            />
            Согласен с правилами
          </div>
          <button
            disabled={!checked ? true : false}
            className={checked ? 'button modal__button' : 'button--off modal__button'}
            onClick={() => router.pushPage(PAGE_HOME)}>
            Понятно
          </button>
        </div>
      </div>
    </ModalPage>
  );
};

export default Terms;