import React, {useState} from 'react';
import style from './paginatorStyle.module.css';

const Paginator = (props) => {

    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i=1; i<=pageCount; i++){
        pages.push(i);
    }

    let portionCount = Math.ceil(pageCount / props.portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPageNumber = (portionNumber -1) * props.portionSize + 1    
    let rightPageNumber = portionNumber * props.portionSize
    
    return(             
        <div className={style.paginator}>
            {portionNumber > 1 && <button  className={style.rightLeftButton} onClick={() => {setPortionNumber(portionNumber - 1)}}>left</button>}
            
            {pages
                .filter(p => p >= leftPageNumber && p <= rightPageNumber)
                .map(i => {
                    return <span className={props.currentPage === i ? style.selectPage: style.pageCount}
                            onClick={() => props.onPageChange(i)}>{i}</span>
            })}
            
            {portionCount > portionNumber && <button className={style.rightLeftButton} onClick={() => {setPortionNumber(portionNumber + 1)}}>right</button>}
            
        </div>
    )
}

export default Paginator;
