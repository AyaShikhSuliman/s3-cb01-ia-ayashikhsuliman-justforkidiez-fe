import React from 'react';
import { Link, useNavigate } from "react-router-dom";

function LessonItem(props) {
  const navigate = useNavigate();
  
  if (props.label == "FINISHED") {
    return (
      <>
        <li onClick={()=> {navigate(`/lesson_details/${props.id}`)}} className='lesson__item'>
          <Link className='lesson__item__link' to={props.path}>
            <figure className='lesson__item__pic-wrap' data-category={props.label}>
              <img
                className='lesson__item__img'
                alt='Image'
                src={props.src}
              />
            </figure>
            <div className='lesson__item__info'>
              <h5 className='lesson__item__text'>{props.text}</h5>
            </div>
          </Link>
        </li>
      </>
    );
  }
  else {
    return (
      <>
        <li onClick={()=> {navigate(`/lesson_details/${props.id}`)}} className='lesson__item'>
          <Link className='lesson__item__link' to={props.path}>
            <figure className='lesson__item__pic-wrap_finished' >
              <img
                className='lesson__item__img'
                alt='Image'
                src={props.src}
              />
            </figure>
            <div className='lesson__item__info'>
              <h5 className='lesson__item__text'>{props.text}</h5>
            </div>
          </Link>
        </li>
      </>
    );
  }

}

export default LessonItem;