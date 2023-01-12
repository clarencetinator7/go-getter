import React from "react";

import style from "./EmptyState.module.css";

const EmptyState = props => {

  return(
    <div className={style['empty-msg-container']}>
      {props.emptyMessage.svg}
      <div className={style['message-wrapper']}>
        <span className={style.header}>{props.emptyMessage.header}</span><br />
        <span className={style.message}>{props.emptyMessage.message}</span>
      </div>
    </div>
  )  

}

export default EmptyState;