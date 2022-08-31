import React from 'react';
import axios from 'axios';

const Create = () => {
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const form = document.getElementById('myForm');

        const formdata = new FormData(form)
        console.log([...formdata])
        try {
            const res = await axios.post("http://localhost:3001/reviews",formdata,{})
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <form id='myForm' onSubmit={onSubmitHandler}>
            <select name="seatGrade">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>
            <select name="floor">
                <option value="1F">1</option>
                <option value="2F">2</option>
                <option value="3F">3</option>
            </select>
            <select name="section">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>
            <select name="row">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <input name='seat' type="text"/>
            <input type="range" id="a" name="gap" min="10" max="30" step="10"/>
            <output name="x" htmlFor="a"></output>
            <input type="range" id="b" name="sight" min="10" max="30" step="10"/>
            <output name="i" htmlFor="b"></output>
            <input type="range" id="c" name="sound" min="10" max="30" step="10"/>
            <output name="z" htmlFor="c"></output>
            <input type="range" id="d" name="light" min="10" max="30" step="10"/>
            <output name="k" htmlFor="d"></output>
            <input type="checkbox" name="block" value="1"/>#시야방해있음
            <input type="checkbox" name="operaGrass" value="1"/>#오페라글라스필수
            <textarea name='reviewContent'></textarea>
            <input name='tags'/>
            <button>제출</button>
        </form>
    );
};

export default Create;