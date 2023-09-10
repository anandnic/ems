import { useDispatch } from 'react-redux'
import { deleteDept } from '../features/depts/deptSlice'

function DeptItem({ dept }) {
  const dispatch = useDispatch()

  return (
    <div className='dept'>
      {/* <div>{new Date(dept.createdAt).toLocaleString('en-US')}</div> */}
      <p>Name of Department</p>
      <h2>{dept.text}</h2>
      <button onClick={() => dispatch(deleteDept(dept._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default DeptItem
