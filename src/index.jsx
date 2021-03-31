import * as $ from 'jquery'
import Post from "@models/post"
import React from 'react'
import {render} from 'react-dom'
import json from "./assets/json"
import xml from './assets/data.xml'
import csv from './assets/data.csv'
import './styles/styles.css'
import WebpackLogo from './assets/webpack-logo.png'
import './styles/less.less'
import './styles/scss.scss'
import './babel'

const post = new Post("webpack post title", WebpackLogo)
console.log("JSON:", json)
console.log(post.toString())
console.log("XML:", xml)
console.log('CSV:', csv)
$('pre').addClass('code').html(post.toString())

const App = () => (
    <div className="container">
        <h1>webpack course</h1>
        <hr/>
        <div className="logo"></div>
        <hr/>
        <pre/>
        <hr/>
        <       div className="box"><h2>Less </h2></div>
        <div className="card"><h2>SCSS </h2></div>
    </div>
        )
            render(<App/>, document.getElementById('app'))