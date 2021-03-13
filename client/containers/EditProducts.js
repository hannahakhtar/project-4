import React, { useState } from 'react'

function EditProduct() {
  const [imageUrl, updateImageUrl] = useState(undefined)

  function handleImageUpload() {
    const { files } = document.querySelector('input[type="file"]')
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'imagepreset')
    const options = {
      method: 'POST',
      body: formData
    }
    return fetch('https://api.cloudinary.com/v1_1/ikalff/image/upload', options)
      .then(res => res.json())
      .then(res => {
        updateImageUrl(res.secure_url)
      })
      .catch(err => console.log(err))
  }

  console.log(imageUrl)
  return <div>
    Image:
    {imageUrl && (
      <img src={imageUrl} alt='' className="displayed-image" />
    )}
    <form>
      <div className="form-group">
        <input type="file" />
      </div>
      <button type="button" className="btn" onClick={handleImageUpload}>Upload</button>
    </form>


  </div>
}

export default EditProduct