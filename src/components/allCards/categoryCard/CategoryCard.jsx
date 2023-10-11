import { Fragment } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "./categorycard.scss"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom';

const CategoryCard = ({categoryImage, categoryName, id, editCategory, deleteCategory}) => {
  return (
    <Fragment>
      <div className="card">
        <LazyLoadImage effect="blur" className="card-img-top" src={categoryImage} alt={categoryName} />
        <div className="card-body">
          <h5 className="card-title">{categoryName}</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
          <div className='d-flex justify-content-between gap-3 mb-3'>
            <button onClick={()=>{editCategory(id)}} className='btn btn-warning w-50'>Edit</button>
            <button onClick={()=>{deleteCategory(id)}} className='btn btn-danger w-50'>Delete</button>
          </div>
            <Link to={`categories/${id}`} className='btn btn-primary w-100'>More...</Link>
        </div>
      </div>
    </Fragment>
  )
}

CategoryCard.propTypes = {
  categoryImage: PropTypes.string,
  categoryName: PropTypes.string,
  id: PropTypes.string,
  editCategory: PropTypes.func,
  deleteCategory: PropTypes.func,
}

export default CategoryCard