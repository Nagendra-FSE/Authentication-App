import AutoComplete from 'components/AutoComplete';

const Dashboard = () => {
     const fetchSuggestions = async (query: string) => {
      const response = await fetch(`https://dummyjson.com/products/search?select=title&q=${query}`)
      if(!response.ok) {
          throw new Error("response is not ok")
      }
      const data = await response.json();
      return data?.products;
  }

  const onSelect = (suggestion: string) => {
    console.log(suggestion)
  }

  return (
    <>
     <AutoComplete 
      placeholder='Search' 
      fetchSuggestions={fetchSuggestions}
      onSelect={onSelect}
      />
    </>
  )
}

export default Dashboard