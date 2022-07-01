import React, {useEffect, useState} from 'react';

function App() {
	// useState - react hook
	const [result, setResult] = useState('0');

	const [decToggle, setToggle] = useState(false);
	const [OpToggle, setOpToggle] = useState(false);
	const [newCalcToggle, setNewCalcToggle] = useState(false);
	const [negCount, setNegCount] = useState(0);


	const ops = ['/', '*', '+', '-'];

	const updateNumbers = (event) => {
		const num = event.target.value;

		//when the first digit is 0
		if (num === 0 && result.length === 0) {
			console.log("updateNumbers - leg-1");
			return setResult(num);
		//when attempting to add multiple 0
		}else if(result.length > 0 && num === 0 && OpToggle === true){
			console.log("updateNumbers - leg-2");
			return console.log("---Can't add 0");
		//replace a result if a new number is pressed after calculating
		}else if(newCalcToggle === true && num >= 0){
			//reset
			setNewCalcToggle(!newCalcToggle);

			console.log("updateNumbers - leg-3");
			return  setResult(num);
		}else {
			if (result == 0) {
				//When the result is 0
				console.log("updateNumbers - leg-4");
				return setResult(num);
			} else {
				//All other cases
				console.log("updateNumbers - leg-5");

				//reset
				if(OpToggle === true){
					setOpToggle(!OpToggle);
				}

				return setResult(result + num);
			}
		}
	};


	const updateOps = (value) => {

		console.log("Trying to add an operation");

		//reset
		if(newCalcToggle === true){
			setNewCalcToggle(!newCalcToggle);
		}
		if(decToggle === true){
			setToggle(!decToggle);
		}

		if(OpToggle === false){
			//when an op is entered after a number
			console.log("updateOps - leg-1");

			//reset
			setOpToggle(!OpToggle);
			setNegCount(0);

			return setResult(result + value);
		}else{
			if (value === '-') {
				//if op is '-' keep track of how many times it is used.
				console.log("updateOps - leg-2");
				console.log("---negCount: ", negCount);
				if (negCount < 1) {
					setNegCount(negCount + 1);

					//reset
					if (OpToggle === false) {
						setOpToggle(!OpToggle);
					}

					return setResult(result +  value);
				}				
			}else{
				//reset
				setNegCount(0);
				if(ops.includes(result.slice(-2,-1)) && ops.includes(result.slice(-1))){
					//if last operation was +,-,*,/ then replace with operation
					console.log("updateOps - leg-3");
					return setResult(result.slice(0,-2) + value);
				}else{
					//if last operation was +-,*-,/- then replace both indexes with operation
					console.log("updateOps - leg-4");
					return setResult(result.slice(0,-1) + value);
				}
			}
		}
	}	

	const clear = () => {
		if(decToggle === true){
			//reset
			setToggle(!decToggle);
			console.log("reset decimal toggle: ", decToggle);
		}
		if(OpToggle === true){
			//reset
			setOpToggle(!OpToggle);
			console.log("UpdateOps => OpToggle: ", OpToggle);	
		}
		setResult(0);
	};

	const del = () => {
		if(result.length <= 1){
			return setResult(0);
		}else{
			return setResult(result.slice(0,-1));
		}

	};

	const decimal = () => {
		//reset
		if(decToggle == false){
			console.log("Added a decimal");
			setToggle(!decToggle);
			setResult(result + '.');
		}
	}

	const calculate = () => {
		const val = eval(result).toString();

		//reset
		if(newCalcToggle === false){
			setNewCalcToggle(!newCalcToggle);
		}
		return setResult(val);
	};

	// "&nbsp" - non-breaking space
	//{result ? <span>({result})</span>:''} 
	//&nbsp
	return (
		<div className="App">
			
			<div className="calculator">

				<div id="display">
					{result}
				</div>

				<div className="operators">
					<button id="divide"   onClick={() => updateOps('/')}>/</button>	
					<button id='multiply' onClick={() => updateOps('*')}>*</button>	
					<button id='add'      onClick={() => updateOps('+')}>+</button>	
					<button id='subtract' onClick={() => updateOps('-')}>-</button>	

					<button id='clear' onClick={clear}>C</button>
					<button onClick={del} >DEL</button>
				</div>

				<div className="digits">
					<button id="nine"  onClick={updateNumbers} value='9'>9</button>
					<button id="eight" onClick={updateNumbers} value='8'>8</button>
					<button id="seven" onClick={updateNumbers} value='7'>7</button>
					<button id="six"   onClick={updateNumbers} value='6'>6</button>
					<button id="five"  onClick={updateNumbers} value='5'>5</button>
					<button id="four"  onClick={updateNumbers} value='4'>4</button>
					<button id="three" onClick={updateNumbers} value='3'>3</button>
					<button id="two"   onClick={updateNumbers} value='2'>2</button>
					<button id="one"   onClick={updateNumbers} value='1'>1</button>
					<button id="zero"  onClick={updateNumbers} value='0'>0</button>

					<button id="decimal" onClick={decimal}>.</button>
					<button id="equals"  onClick={calculate}>=</button>
				</div>

			</div>
			<div id="navigation-container">
				<a id="return-btn" href="http://jonfrei.com/Resume_Project_Page/"><i className="large material-icons">arrow_back</i></a>
				<a id="github-btn" href="https://github.com/JonFrei/drum-machine">View Project on GitHub</a>
			</div>
		</div>
  	);
}

export  default App;
