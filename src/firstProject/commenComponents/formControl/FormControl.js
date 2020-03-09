import React from 'react';
import style from './FormControl.module.css';

export const Textarea = ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched
    return (
        <div className={style.formControl + ' ' +(hasError ? style.error : '')}>
            <div>
                <textarea {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Input = ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched
    return (
        <div className={style.formControl + ' ' +(hasError ? style.error : '')}>
            <div>
                <input {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}