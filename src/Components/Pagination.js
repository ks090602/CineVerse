import ReactPaginate from "react-paginate";
import "./Pagination.css";

const Pagination = ({maxnum, activenum, handleClick})=>{

    const forcePageActive = parseInt(activenum) - 1;

    const handlePageClick = (e)=>{
        // console.log('hello', e.selected)
        let pageNo = parseInt(e.selected) + 1
        handleClick(pageNo);
        window.scrollTo(0, 0);
    }
      

    const maxPageNum = Math.min(maxnum,500);
    
    return(
        <>
            <div className="paginationWap">
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={". . ."}
                    pageCount={maxPageNum}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                    renderOnZeroPageCount={null}
                    forcePage={forcePageActive}
                />
            </div>
        </>
    )
}

export  default Pagination;