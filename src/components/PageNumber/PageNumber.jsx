import React from 'react'

const PageNumber = ({ pageNo }) => {
  return (
    <>
      <a href={`/page/${pageNo + 1}`}>{pageNo + 1} </a>
    </>
  );
}
 
export default PageNumber;