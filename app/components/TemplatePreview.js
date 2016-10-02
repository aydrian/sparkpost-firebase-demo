import React from 'react'

const TemplatePreview = (props) => {
  return (
    <div dangerouslySetInnerHTML={ {__html: props.children} }></div>
  )
}

export default TemplatePreview