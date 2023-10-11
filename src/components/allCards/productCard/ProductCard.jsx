import  { Fragment } from 'react'
import PropTypes from "prop-types"
import { LazyLoadImage } from 'react-lazy-load-image-component'

import "./productcard.scss"




const ProductCard = ({productDesc, productName, productImage}) => {
  return (
    <Fragment>
      <div className="card">
        <LazyLoadImage effect="blur" className="card-img-top" src={productImage} alt={productName} />
        <div className="card-body">
          <h5 className="card-title">{productName}</h5>
          <p className="card-text pb-3">{productDesc}</p>
        </div>
      </div>
    </Fragment>
  )
}

ProductCard.propTypes = {
  productDesc: PropTypes.string,
  productName: PropTypes.string,
  productImage: PropTypes.string,
}

export default ProductCard;