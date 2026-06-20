import { Link } from 'react-router-dom'

function Pagination({ pages, page, keyword = '', sort = '' }) {
  if (pages <= 1) return null

  return (
    <div className="flex justify-center gap-2 mt-8">
      {[...Array(pages).keys()].map((x) => (
        <Link
          key={x + 1}
          to={`/?keyword=${keyword}&sort=${sort}&pageNumber=${x + 1}`}
          className={`px-3 py-1 rounded ${
            x + 1 === page
             ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {x + 1}
        </Link>
      ))}
    </div>
  )
}

export default Pagination