import React from 'react';
import { Link, useNavigate } from "react-router-dom"; 

function CourseItem(props) {
  const navigate = useNavigate();
  return (
    <>
      <li onClick={()=> {navigate(`/lesson/${props.id}`)}} className='course__item'>
        <Link className='course__item__link' to={props.path}>
          <figure className='course__item__pic-wrap' data-category={props.label}>
            <img
              className='course__item__img'
              alt='Image'
              src={props.src}
            />
          </figure>
          <div className='course__item__info'>
            <h5 className='course__item__text'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CourseItem;