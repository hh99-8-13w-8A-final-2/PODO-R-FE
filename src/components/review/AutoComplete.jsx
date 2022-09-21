import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as Search } from '../../assets/img/search.svg'


const AutoComplete = ({wholeTagsArray, setTags, tags}) => {
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
    if(dropDownList.includes(inputValue)) {
      setTags([...tags, inputValue])
      setInputValue('')
    }
    else {
      return
    }
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
        <SearchButton onClick={inputValueHandler}><Search/></SearchButton>
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