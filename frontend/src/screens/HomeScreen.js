import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'



const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()


  useEffect(() => {
  }, [dispatch, keyword, pageNumber])

  return (
    <>
     <h1>Hi</h1>
  
    </>
  )
}

export default HomeScreen
