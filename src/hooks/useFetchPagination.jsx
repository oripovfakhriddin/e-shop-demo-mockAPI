import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types"
import request from "../server/request";
import { LIMIT } from "../constants/const";

const useFetchPagination = (url, otherParams) => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [activePage, setActivePage ] = useState(1);
  const [callBack, setCallBack ] = useState(false)

  const reFetch = () => {
    setCallBack(!callBack)
  }

  useEffect( ()=>{
    const controller = new AbortController()
    const  { signal } = controller
    async function getData () {
      try {
        setLoading(true)
        let params = {
          page: activePage,
          limit: LIMIT,
          ...JSON.parse(otherParams)
        }
        let {data} = await request.get(url, {params, signal})
        let {data: totalData } = await request.get(url, {params: JSON.parse(otherParams)})
        setAllData(data)
        setTotal(totalData.length)
      } catch (error) {
        setError(error)
      } finally{
        setLoading(false)
      }
    }

    getData()

    return () => {
      controller.abort()
    }

  }, [activePage, otherParams, url, callBack])

  const handlePageChange = ({selected}) => {
    setActivePage(selected + 1)
  }

  let pages = Math.ceil(total / LIMIT)

  let pagination =  pages !== 1 ? (
    <ReactPaginate 
      breakLabel = "..."
      nextLabel = "Next"
      previousLabel = "Previous"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      pageRangeDisplayed={5}
      pageCount={pages}
      renderOnZeroPageCount={null}
      onPageChange={handlePageChange}
      />
  ) : null;
  
  return { allData, pagination, loading,  error, total, reFetch }
}

useFetchPagination.propTypes = {
  otherParams: PropTypes.string
}

export default useFetchPagination