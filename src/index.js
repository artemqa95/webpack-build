import * as $ from 'jquery'
import Post from "@models/post"
import json from "./assets/json"
import xml from './assets/data.xml'
import csv from './assets/data.csv'
import './styles/styles.css'
import WebpackLogo from './assets/webpack-logo.png'
import './styles/less.less'
import './styles/scss.scss'
const post = new Post("webpack post title", WebpackLogo)
console.log("JSON:", json)
console.log(post.toString())
console.log("XML:", xml)
console.log('CSV:', csv)
$('pre').addClass('code').html(post.toString())
