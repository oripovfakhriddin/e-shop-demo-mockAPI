import { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Col, Container, Row } from "react-bootstrap"

import request from "../../server/request"

import ProductCard from "../../components/allCards/productCard/ProductCard"

import "./productpage.scss"


const ProductPage = () => {
  const { categoryId } = useParams()
  const [products, setProducts] = useState([])
  useEffect(  ()=>{
    async function getData () {
      try {
        let { data } = await request.get(`categories/${categoryId}/products`)
        setProducts(data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [categoryId])
  
  return (
    <Fragment>
      <section>
        <Container>
          <div className='warning bg-warning p-3 rounded'>The total number of products is {products.length}</div>
          <Row className='row row-cols-xs-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4'>
            {products?.map((product)=>{
              return <Col className='my-3' key={product.id} sm> <ProductCard {...product} /> </Col>
            })}
          </Row>
        </Container>
      </section>
    </Fragment>
  )
}

export default ProductPage