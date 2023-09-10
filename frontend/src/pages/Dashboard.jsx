import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import DeptForm from '../components/DeptForm'
import DeptItem from '../components/DeptItem'
import Spinner from '../components/Spinner'
import { getDepts, reset } from '../features/depts/deptSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { depts, isLoading, isError, message } = useSelector(
    (state) => state.depts
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getDepts())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h3>Department Dashboard</h3>
        <p>Welcome {user && user.name}</p>
      </section>

      <DeptForm />

      <section className='content'>
        {depts.length > 0 ? (
          <div className='depts'>
            {depts.map((dept) => (
              <DeptItem key={dept._id} dept={dept} />
            ))}
          </div>
        ) : (
          <h3>No Departments Added</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
