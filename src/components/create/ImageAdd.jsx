import React, { useState } from 'react';
import styled from 'styled-components';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-regular-svg-icons';
const ImageAdd = ({imgUrls, setImgUrls}) => {

    const [showImages, setShowImages] = useState([]);
    const handleAddImages = (event) => {
        const imageLists = event.target.files;
        let imageUrlLists = [...showImages];
    
        for (let i = 0; i < imageLists.length; i++) {
          const currentImageUrl = URL.createObjectURL(imageLists[i]);
          imageUrlLists.push(currentImageUrl);
          setImgUrls([...imageLists])
          console.log(imgUrls)
        }
    
        if (imageUrlLists.length > 4) {
          imageUrlLists = imageUrlLists.slice(0, 4);
        }
    
        setShowImages(imageUrlLists);
        console.log(imageUrlLists)
      };
      const handleDeleteImage = (id) => {
        setShowImages(showImages.filter((_, index) => index !== id));
      };

    return (
        <StaddImageDiv>
            <h4>사진 추가 <span>사진은 최대 4장까지 등록 가능합니다.</span></h4>
            <div className='image'>
                <label htmlFor="input-file" className='imageAdd'  onChange={handleAddImages}>
                    <input type="file" id="input-file" name='imgUrls' multiple style={{display:'none'}}/>
                    <span><FontAwesomeIcon icon={faImages}></FontAwesomeIcon></span>
                </label>
                {showImages.map((image, id) => (
                    <div key={id} className='imageList' style={{background:`url(${image}) center center / cover no-repeat`}}>
                    <span onClick={() => handleDeleteImage(id)}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></span>
                    </div>
                ))}
            </div>
        </StaddImageDiv>
    );
};

export default ImageAdd;

const StaddImageDiv = styled.div`
    h4>span {font-weight:500; font-size: 16px}
    .image{
        display: flex;
    }
    .imageAdd{
        width: 100px;
        height: 100px;
        background-color: var(--gray-3);
        border-radius: 8px;
        span{
            color: var(--gray-2);
            display: block;
            width: 100%;
            text-align: center;
            line-height: 100px;
            font-size: 18px;            
        }
    }
    .imageList{
        width: 100px;
        height: 100px;
        background-color: var(--gray-3);
        border-radius: 8px;
        margin-left: 10px;
        position: relative;
        span:last-of-type{
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 12px;
            color: var(--gray-2);
            background-color: var(--black);
            padding: 1px 4px;
            border-radius: 10px;
            transition: all .3s;
            &:hover{
                background-color: var(--gray-3);
            }
        }
    }
`