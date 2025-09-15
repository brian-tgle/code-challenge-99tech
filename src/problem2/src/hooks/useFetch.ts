import { useEffect } from "react"
import { useState } from "react"

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | unknown | null;
}

const useFetch = <T>(url: string): FetchResult<T>  => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | unknown>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const result = await response.json()
        setData(result)
      } catch (error: Error | unknown) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

export default useFetch