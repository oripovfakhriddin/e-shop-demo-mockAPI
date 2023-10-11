import { Fragment, useState } from 'react'
import "./homepage.scss"
import { Button, Col, Container, Form, InputGroup, Modal, Row } from 'react-bootstrap'
import useFetchPagination from '../../hooks/useFetchPagination'
import CategoryCard from '../../components/allCards/categoryCard/CategoryCard'
import request from '../../server/request'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import categorySchema from '../../schema/categorySchema'
import Loading from '../../components/loading/Loading'


const HomePage = () => {
  const {register, handleSubmit, reset, formState: {errors}} = useForm({resolver: yupResolver(categorySchema)})
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    setSelected(null)
    reset({categoryName: "", categoryImage: ""})
  };
  const [selected, setSelected] =useState(null)
  const [search, setSearch] = useState("")
  const params = JSON.stringify({categoryName: search})
  const { allData, pagination, reFetch, loading } = useFetchPagination("categories", params)

  const submit = async (data) => {
    try {
      await request.post("categories", data)
      setShow(false)
    } catch (error) {
      console.log(error);
    }
    reFetch()
  }

  const editCategory = async (id) => {
    try {
      setSelected(id)
      setShow(true);
      let {data} = await request.get(`categories/${id}`);
      reset(data) 
    } catch (error) {
      console.log(error);
    }
  }

  const deleteCategory = async (id) => {

    let confirm = window.confirm("Are you sure you want to delete this category?")

    try {
      if (confirm) {
        await request.delete(`categories/${id}`)
        toast.update("salom")
      }
    } catch (errors) {
      console.log(errors);
    }

    reFetch()
  }

  return (
    <Fragment>
      <section>
        <Container>
          <InputGroup className="mb-3">
            <Form.Control
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}
              placeholder="Searching categories..."
            />
            <InputGroup.Text>
              <Button onClick={handleShow}>
                Add Categories
              </Button>
            </InputGroup.Text>
          </InputGroup>
        </Container>
      </section>
      <section>
        <Container>
          {loading ? <Loading /> 
          :
          <Row className='row row-cols-xs-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4'>
            {allData?.map((data)=>{
              return <Col className='my-3' key={data.id} sm> <CategoryCard {...data} editCategory={editCategory} deleteCategory={deleteCategory} /> </Col>
            })}
          </Row>
          }
          
          {pagination}
        </Container>
      </section>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Form onSubmit={handleSubmit(submit)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Categories</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Category name</Form.Label>
              <Form.Control {...register("categoryName")}  type="text" placeholder="Category name" />
              {errors.categoryName ? <p className="text-danger"> {errors.categoryName.message}</p> : null}
            </Form.Group>
            <Form.Group className='my-4'>
              <Form.Label>Category image URL</Form.Label>
              <Form.Control {...register("categoryImage")}  type="text" placeholder="Image URL" />
              {errors.categoryImage ? <p className="text-danger"> {errors.categoryImage.message}</p> : null}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">{selected === null ? "Add" : "Save" } category</Button>
          </Modal.Footer>
        </Form>
      </Modal>

    </Fragment>
  )
}

export default HomePage