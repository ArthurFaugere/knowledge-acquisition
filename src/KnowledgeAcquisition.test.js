import React from 'react';
import ReactDOM from 'react-dom';
import KnowledgeAcquisition from './KnowledgeAcquisition';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

const state = {
	turnData: {
		books: ['The Adventures of Huckleberry Finn', 'Life on the Mississippi', 'Roughing It', 'The Shining', 'It', 'David Copperfield', 'A Tale of two cities...'],
		author: {
			name: "Charles Dickens",
			imageUrl: 'images/authors/charlesdickens.jpg',
			imageSource: 'Google Images',
			books: ['David Copperfield', 'A Tale of two cities...']
		},
	},
	highlight: 'none'
}

describe("KnowledgeAcquisition", () => {
	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<KnowledgeAcquisition {...state} onAnswerSelected={() => {}} />, div);
	  ReactDOM.unmountComponentAtNode(div);
	});
	  
	describe("When no answer selected", () => {
		let wrapper;
		beforeAll(() => {
			wrapper = mount(<KnowledgeAcquisition {...state} onAnswerSelected={() => {}} />);
		});
		it('should have no color', () => {
			expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
		});
	});
		
	describe("When wrong answer", () => {
		let wrapper;
		beforeAll(() => {
			wrapper = mount(<KnowledgeAcquisition {...(Object.assign({}, state, {highlight: 'wrong'}))} onAnswerSelected={() => {}} />);
		});
		it('should have red color', () => {
			expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
		});
	});
	
	describe("When correct answer", () => {
		let wrapper;
		beforeAll(() => {
			wrapper = mount(<KnowledgeAcquisition {...(Object.assign({}, state, {highlight: 'correct'}))} onAnswerSelected={() => {}} />);
		});
		it('should have green color', () => {
			expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
		});
	});
		
	describe("When first answer is selected", () => {
		let wrapper;
		const handleAnswerSelected = jest.fn();
		beforeAll(() => {
			wrapper = mount(<KnowledgeAcquisition {...state} onAnswerSelected={handleAnswerSelected} />);
			wrapper.find('.answer').first().simulate('click');
		});
		it('onAnswerSelected should be called', () => {
			expect(handleAnswerSelected).toHaveBeenCalled();
		});
		it('should receive The Adventures of Huckleberry Finn', () => {
			expect(handleAnswerSelected).toHaveBeenCalledWith('The Adventures of Huckleberry Finn');
		});
	});
})


//function Hello(props) {
//	return <h1>Hello at {props.now}</h1>;
//}
//const moment = new Date();
//describe("When testing directly", () => {
//	let result;
//	beforeAll(() => {
//		result = Hello({now: moment.toISOString()});
//	});
//
//	it("Return a value", () => {
//		expect(result).not.toBeNull();
//	});
//	it("is a h1 element", () => {
//		expect(result.type).toBe("h1");
//	});
//	it("has children", () => {
//		expect(result.props.children).toBeTruthy();
//	});
//})
