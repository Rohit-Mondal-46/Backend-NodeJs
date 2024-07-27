import './App.css'
import { useQuery, gql } from '@apollo/client';

const query = gql`
  query GetTodos{
  getTodos {
    title,
    user {
      name
    }
  },
}
`


function App() {
  const  {loading, error, data} = useQuery(query)
      if(loading) 
        return <h1>Loading...</h1>;
      if(error)
        return <h1>{error.message}</h1>
  return (
    <>
      <div>{JSON.stringify(data)}</div>
    </>
  )
}

export default App
