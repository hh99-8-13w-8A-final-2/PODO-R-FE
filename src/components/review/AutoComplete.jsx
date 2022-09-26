import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as Search } from '../../assets/img/search.svg'
import { useQuery } from "react-query"
import axios from 'axios'

const URI = {
  BASE: process.env.REACT_APP_BASE_URI
};

const getResentsSearch = () => {
  const Authorization = localStorage.getItem('accessToken');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `${Authorization}`,
  }
  return axios.get(`${URI.BASE}/api/recents/search`, { headers: headers })
}

const AutoComplete = ({ setTagUrl, setSearchParams, searchParams }) => {

  const { data } = useQuery('resents/search', getResentsSearch,
    {
      refetchOnWindowFocus: false,
    }
  )
  console.log(data)
  const wholeTagsArray = [
    "123",
    "456",
    "asd"
  ]

  const [inputValue, setInputValue] = useState('')
  const [isHaveInputValue, setIsHaveInputValue] = useState(false)
  const [dropDownList, setDropDownList] = useState(wholeTagsArray)
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1)


  const showDropDownList = () => {
    if (inputValue === '') {
      setIsHaveInputValue(false)
      setDropDownList([])
    } else {
      const choosenTextList = wholeTagsArray.filter(textItem =>
        textItem.includes(inputValue)
      )
      setDropDownList(choosenTextList)
    }
  }

  const changeInputValue = event => {
    setInputValue(event.target.value)
    setIsHaveInputValue(true)
  }

  const clickDropDownItem = clickedItem => {
    setInputValue(clickedItem)
    setIsHaveInputValue(false)
  }

  const handleDropDownKey = event => {
    //input에 값이 있을때만 작동
    if (isHaveInputValue) {
      if (
        event.key === 'ArrowDown' &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1)
      }

      if (event.key === 'ArrowUp' && dropDownItemIndex >= 0)
        setDropDownItemIndex(dropDownItemIndex - 1)
      if (event.key === 'Enter' && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex])
        setDropDownItemIndex(-1)
      }
    }
  }

  const inputValueHandler = () => {
    const prevQueryEval = searchParams.getAll('evaluation');
    const prevQueryTag = searchParams.getAll('tag');
    const prevQuerySort = searchParams.getAll('sort');
    const prevQuerygrade = searchParams.getAll('grade')
    const prevQueryfloor = searchParams.getAll('floor')
    const prevQuerysection = searchParams.getAll('section')
    const prevQueryrow = searchParams.getAll('row')
    const prevQueryseat = searchParams.getAll('seat')

    setSearchParams({
      tag: [...prevQueryTag],
      sort: [...prevQuerySort],
      grade: [...prevQuerygrade],
      floor: [...prevQueryfloor],
      section: [...prevQuerysection],
      row: [...prevQueryrow],
      seat: [...prevQueryseat],
      evaluation: [...prevQueryEval],
      search: inputValue
    });
    setTagUrl('&' + window.location.href.split('?').splice(1, 1).toString())
    setInputValue('')
  }

  useEffect(showDropDownList, [inputValue])

  return (
    <WholeBox>
      <InputBox isHaveInputValue={isHaveInputValue} className="search">
        <Input
          type='text'
          value={inputValue}
          onChange={changeInputValue}
          onKeyUp={handleDropDownKey}
        />
        <SearchButton onClick={inputValueHandler}><Search /></SearchButton>
      </InputBox>
      {isHaveInputValue && (
        <DropDownBox>
          {dropDownList.length === 0 && (
            <DropDownItem>해당하는 단어가 없습니다</DropDownItem>
          )}
          {dropDownList.map((dropDownItem, dropDownIndex) => {
            return (
              <DropDownItem
                key={dropDownIndex}
                onClick={() => clickDropDownItem(dropDownItem)}
                onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                className={
                  dropDownItemIndex === dropDownIndex ? 'selected' : ''
                }
              >
                {dropDownItem}
              </DropDownItem>
            )
          })}
        </DropDownBox>
      )}
    </WholeBox>

  )
}

const activeBorderRadius = '25px 25px 0 0'
const inactiveBorderRadius = '25px 25px 25px 25px'

const WholeBox = styled.div`
  padding: 10px;
  .search{
        display: flex;
        input{ width:400px }
        img{
            margin-left: 10px;
        }
    }
`

const InputBox = styled.div`
  box-sizing: border-box;
  padding: 0px 20px;
  width: 600px;
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid var(--maincolor-1);
  background-color: transparent;
  border-radius: ${props =>
    props.isHaveInputValue ? activeBorderRadius : inactiveBorderRadius};
  z-index: 3;
`

const Input = styled.input`
  flex: 1 0 0;
  margin: 0;
  padding: 4;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
`

const SearchButton = styled.div`
  cursor: pointer;
  svg {
    width: 30px;
  }
`

const DropDownBox = styled.ul`
  display: block;
  margin: 0 auto;
  padding: 8px 0;
  border: 1px solid var(--maincolor-1);
  background-color: transparent;
  color: #fff;
  border-top: none;
  border-radius: 0 0 25px 25px;
  list-style-type: none;
  z-index: 3;
`

const DropDownItem = styled.li`
  padding: 0 16px;

  &.selected {
    color: var(--maincolor-1);
  }
`

export default AutoComplete