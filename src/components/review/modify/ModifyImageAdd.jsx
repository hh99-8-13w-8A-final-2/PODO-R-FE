import React, { useState } from 'react';
import styled from 'styled-components';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModifyImageAdd = ({ imgfiles }) => {
    const [showImages, setShowImages] = useState([]); // 이미지 프리뷰
    const handleAddImages = (event) => {
        const imageLists = event.target.files;
        let imageUrlLists = [...showImages];

        for (let i = 0; i < imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            imageUrlLists.push(currentImageUrl);
            imgfiles.push(imageLists[i]);
            //setImgUrls([...imageLists])
        }

        if (imageUrlLists.length > 4) {
            imageUrlLists = imageUrlLists.slice(0, 4);
            imgfiles = imgfiles.slice(0, 4);
            toast.error("4장까지 등록이 가능합니다.", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
                theme: "dark"
            })
        }

        setShowImages(imageUrlLists);
        //console.log(imageUrlLists)

    };
    const handleDeleteImage = (id) => {
        setShowImages(showImages.filter((_, index) => index !== id));
        const saveImgfiles = imgfiles.filter((_, index) => index !== id);
        imgfiles.splice(0, imgfiles.length, ...saveImgfiles)
    };

    return (
        <StaddImageDiv>
            <h4><span style={{ color: 'var(--error)', fontWeight: '700' }}>*</span> 사진 추가 <span> 사진은 최대 4장까지 등록 가능합니다.</span></h4>
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

export default ModifyImageAdd;


const StaddImageDiv = styled.div`
    h4>span {font-weight:500; font-size: 16px}
    .image{
        display: flex;
    }
    .imageAdd{
        width: 100px;
        height: 100px;
        background-color: #eee;
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
        background-color: var(--gray-1);
        border-radius: 8px;
        margin-left: 10px;
        position: relative;
        span:last-of-type{
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 12px;
            color: var(--white);
            background-color: var(--gray-1);
            padding: 3px 6px;
            border-radius: 10px;
            transition: all .3s;
            &:hover{
                background-color: var(--gray-2);
            }
        }
    }
`