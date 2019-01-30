import React, { Component } from 'react';
import * as $ from 'axios';
import {Editor, EditorState, RichUtils} from 'draft-js';

/*
    CURRENT STATE
      make client side work area:
        complete devspace
        -complete database and models
        -api/routes?

    NEXT
      make backend logic for posting:
        set up twitter
        twitter api
        nightmare for dev.to
*/

/*
    CURRENT STATE
      PUT WORK ON GITHUB
      client side work area
        -print blogs to generic div COMPONENT
        -set up post buttons COMPONENT
        set up site buttons COMPONENT
        

    NEXT
      same as last
*/

/*
    CURRENT STATE
      PUT WORK ON GITHUB
      client side work area
        -set up site buttons COMPONENT
        

    NEXT
      same as last
*/

/*
    CURRENT STATE
      PUT WORK ON GITHUB
      client side work area
        radio buttons not updating but state properly works
        

    NEXT
      post to sites IMPORTANT
      css
      advanced text area!!!
*/

/*
    CURRENT STATE
      PUT WORK ON GITHUB
      client side work area
        setup rich text editor to save properly to database
          update model
          update state
          update onChange
          update handleSubmit
        

    NEXT
      post to sites IMPORTANT
        function in app.js to send for each site selected
      css
*/

/*
    CURRENT STATE
      PUT WORK ON GITHUB
      client side work area
        good for now
        posting but not rendering to page
        

    NEXT
      !!!!!!!!!post to sites IMPORTANT!!!!!!!!!!!
        function in app.js to send for each site selected
      css
*/

// radio button for site to be posted to
// give class name of site
// on click set client to post to site in app
const SiteSelector = (props) => (
  <div className={props.site}>
    {props.selected === false
      ? <i className="far fa-square" onClick={() => props.handleSelection(props.id, props.selected)}>{props.site} {props.selected}</i>
      : <i className="far fa-check-square" onClick={() => props.handleSelection(props.id, props.selected)}>{props.site} {props.selected}</i>
    }
  </div>
)

// list of sites with radio buttons to select where blogs go
//
//
const SiteList = (props) => (
  <div id="SiteList">
    {props.sites.map((site, i) => <SiteSelector
      id={i}
      key={i}
      site={site.name}
      selected={site.select}
      handleSelection={props.handleSelection}
    />)}
  </div>
)

// text area for blog to be written on
// can be saved to database
// 
const DevSpace = (props) => (
  <div id="DevSpace">
    <textarea onChange={props.handleChange}>{props.init}</textarea>
    <form>
    <button id="submit" onClick={props.handleSubmit}>Submit</button>
    </form>
  </div>
)

// Blog
const Blog = (props) => (
  <div className="blog">
  <h2>
    {props.content}
  </h2>
  <p>{props.dateCreated}</p>
  </div>
)

// temporary area to house blogs (debugging)
// 
//
const BlogList = (props) => (
  <div className="blogList">
    {props.blogs.map((blog, i) => <Blog
      id={blog._id}
      key={i}
      content={blog.content}
      dateCreated={blog.dateCreated}
    />)}
  </div>
)

class App extends Component {

  state = {
    blogsList: [],
    newblog: '',
    sitesSelected: [{name: 'twitter', select: false}, {name: 'facebook', select: false}, {name: 'medium', select: false}, {name: 'dev.to', select: false}],
    sites: [],  
    editorState: EditorState.createEmpty()
  }

  //changes based on rich editor
  onChange = (data) => {
    this.setState({editorState: data});
    //let temp = this.editorState.getText();
    console.log(() => this.state.editorState.toJS());
  }

  //controls bolding, italics, underline, ect.
  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)

    if (newState) {
        this.onChange(newState);
        console.log(newState)
        return 'handled';
    }

    return 'not-handled';
  }

  //logs undefined but accepts value
  handleChange = (event) => {
    this.setState({ newblog: event.target.value })
    console.log(this.newblog)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('were posting!');
    let date = new Date();
    let today = date.getDate();
    $.post('/api/blogs', { title: this.state.newblog, content: this.state.editorState, dateCreated: today })
      .then((result) => {
        this.getBlogs();
      })
  }

  handleCompletion = (id, completed) => {
    if (completed === false) {
      $.put(`/api/blogs/${id}`, { _id: id, completed: true });
      this.getBlogs();
    } else {
      $.put(`/api/blogs/${id}`, { _id: id, completed: false });
      this.getBlogs();
    }
  }

  handleSelection = (id, selected) => {
    console.log(id)
    let temp = this.state.sitesSelected;
    if (selected === false) {
      temp[id].select = true;
      this.setState({sitesSelected: temp});
      console.log(this.state.sitesSelected[id].select);
    } else {
      temp[id].select = false;
      this.setState({sitesSelected: temp});
      console.log(this.state.sitesSelected[id].select);
    }
  }

  handleDelete = (id) => {
    $.delete(`/api/blogs/${id}`)
      .then((result) => {
        this.getBlogs();
      })
  }

  getBlogs = () => {
    $.get('/api/blogs')
      .then((result) => {
        this.setState({ blogsList: result.data })
        console.log(result.data);
      });
  }

  componentDidMount() {
    this.getBlogs();
  }

  siteHandler() {
    return 1;
  }

  //nightmare
  devTOHandler(){

  }

  //nightmare
  mediumHandler(){

  }

  //api? nightmare
  facebookHandler(){

  }

  //use twitter api and set up account
  twitterHandler(){

  }

  render() {
    return (
      <div className="App">
        <SiteList sites={this.state.sitesSelected} handleSelection={this.handleSelection}/>
        <DevSpace init={"it works"} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
        <Editor editorState={this.state.editorState} onChange={this.onChange} handleKeyCommand={this.handleKeyCommand}/>
        <BlogList blogs={this.state.blogsList}/>
      </div>
    );
  }
}

export default App;