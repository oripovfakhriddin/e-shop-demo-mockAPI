import { useParams } from "react-router-dom"
import "./productpage.scss"
import { Fragment, useEffect, useState } from "react"
import request from "../../server/request"
import { Col, Container, Row } from "react-bootstrap"
import ProductCard from "../../components/allCards/productCard/ProductCard"


const ProductPage = () => {
  const { categoryId } = useParams()
  const [products, setProducts] = useState([])
  useEffect(  ()=>{
    async function getData () {
      try {
        let {data} = await request.get(`categories/${categoryId}/products`)
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