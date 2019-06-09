import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from  'react-router-dom';
import './index.css';
import KnowledgeAcquisition from './KnowledgeAcquisition';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
 
interface SumProps {
	a: number;
	b: number;
}

function Sum(props : SumProps) {
	return <h1>{props.a} + {props.b} = {props.a + props.b}</h1>;
}

function Clicker({handler}) {
	return <div>
		<button onClick={(e) => {handler('A');}}>A</button>
		<button onClick={(e) => {handler('B');}}>B</button>
		<button onClick={(e) => {handler('C');}}>C</button>
	</div>;
}

const authors = [
	{
		name: "Mark Twain",
		imageUrl: 'images/authors/marktwain.jpg',
		imageSource: 'Google Images',
		books: ['The Adventures of Huckleberry Finn', 'Life on the Mississippi', 'Roughing It']
	},
	{
		name: "Stephen King",
		imageUrl: 'images/authors/stephenking.jpg',
		imageSource: 'Google Images',
		books: ['The Shining', 'It']
	},
	{
		name: "Charles Dickens",
		imageUrl: 'images/authors/charlesdickens.jpg',
		imageSource: 'Google Images',
		books: ['David Copperfield', 'A Tale of two cities...']
	},
];

function getTurnData(authors) {
	const allBooks = authors.reduce(function (p, c, i) {
		return p.concat(c.books);
	}, []);
	const fourRandomBooks = shuffle(allBooks).slice(0, 4);
	const answer = sample(fourRandomBooks);
	
	return {
		books: fourRandomBooks,
		author: authors.find((author) => author.books.some((title) => title === answer)) 
	}
}

function resetState() {
	return {
		turnData: getTurnData(authors),
		highlight: ''
	};
}

let state = resetState();

function onAnswerSelected(answer) {
	const isCorrect = state.turnData.author.books.some((book) => book === answer);
	state.highlight = isCorrect ? 'correct' : 'wrong';
	render();
}

function App() {
	return <KnowledgeAcquisition {...state}
		onAnswerSelected={onAnswerSelected}
		onContinue={() => {
			state = resetState();
			render();
		}} />
}

const AuthorWrapper = withRouter(({history}) =>
	<AddAuthorForm onAddAuthor={(author) => {
		authors.push(author);
		history.push('/');
	}} />
)

function render() {
	ReactDOM.render(
	<BrowserRouter>
		<React.Fragment>
			<Route exact path="/" component={App} />
			<Route path="/add" component={AuthorWrapper} />
		</React.Fragment>
	</BrowserRouter>, document.getElementById('root'));
}
render();

//ReactDOM.render(<Sum a={"v"} b={2} />, document.getElementById('root'));
//ReactDOM.render(<Clicker handler={(letter) => console.log(`${letter} clicked`)} />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
