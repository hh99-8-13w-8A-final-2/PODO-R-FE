import React, { useState } from 'react';
import styled from 'styled-components';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
import apis from '../../apis/apis';
import 'react-toastify/dist/ReactToastify.css';

const ImageAdd = ({ imgfiles, setImgFiles }) => {
    const files = []
    const [showImages, setShowImages] = useState([]); // 이미지 프리뷰
    
    const handleAddImages = (event) => {
        const imageLists = event.target.files;
        let imageUrlLists = [...showImages];
        console.log(imageUrlLists)
        if (imageLists.length > 4 -  showImages.length) {
            toast.error("4장까지 등록이 가능합니다.", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
                theme: "dark"
            })
            return
        }

        for(let i = 0; i<imageLists.length; i++){
            files.push(imageLists[i])
        }

        const imgFormdata = new FormData()
        for(let i = 0; i<files.length; i++){
            imgFormdata.append('image', files[i])
        }


        apis.postImg(imgFormdata)
        .then((res) => {
            const img = res.data.imageUrl

            setImgFiles((prev)=>{return [...prev, ...img]})
        })
        .catch((err)=>{
            console.log(err)
        })
        
        for (let i = 0; i < imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            imageUrlLists.push(currentImageUrl);
        }

        setShowImages(imageUrlLists);

    };

    const handleDeleteImage = (id) => {
        setShowImages(showImages.filter((_, index) => index !== id));
        const saveImgfiles = imgfiles.filter((_, index) => index !== id);
        imgfiles.splice(0, imgfiles.length, ...saveImgfiles)
    };

    return (
        <StaddImageDiv>
            <h4><span style={{ color: 'var(--error)' }}>*</span> 사진 추가 <p> 사진은 최대 4장까지 등록 가능합니다.</p></h4>
            <div className='image'>
                <label htmlFor="input-file" className='imageAdd' onChange={handleAddImages}>
                    <input type="file" id="input-file" accept="image/png, image/jpeg" name='imgUrls' multiple style={{ display: 'none' }} />
                    <span><FontAwesomeIcon icon={faImages}></FontAwesomeIcon></span>
                </label>
                {showImages.map((image, id) => (
                    <div key={id} className='imageList' style={{ background: `url(${image}) center center / cover no-repeat` }}>
                        <span onClick={() => handleDeleteImage(id)}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></span>
                    </div>
                ))}
            </div>
        </StaddImageDiv>
    );
};

export default ImageAdd;

const StaddImageDiv = styled.div`
    h4>p {font-weight:500; font-size: 16px; display:inline-block}
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