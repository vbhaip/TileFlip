import React from 'react'
import * as d3 from 'd3'

class Visualization extends React.Component {

	//props
	//this.edgeLength = edge length of number of shapes per side
	//id
	//this.size = pixel length

	constructor(props){
		super(props);

		this.state = {'data': [],
				'interval': null
			};
		

		this.updateVis = this.updateVis.bind(this);

		this.computeNextState = this.computeNextState.bind(this);

		this.computeVal = this.computeVal.bind(this)
		this.computeNeighbors = this.computeNeighbors.bind(this);

		this.mod = this.mod.bind(this)
		this.floatToGrayscale = this.floatToGrayscale.bind(this)
		this.floatToHSL = this.floatToHSL.bind(this);

		this.refresh = this.refresh.bind(this);

		this.setup = this.setup.bind(this);
		this.drawChart = this.drawChart.bind(this)

		this.flipItem = this.flipItem.bind(this);

		this.setup();

		this.refresh();

	}


	setup(){
		let data = [];

		this.edgeLength = this.props.edgeLength;
		this.size = this.props.size;

		for(let i = 0; i < this.edgeLength**2; i++){
			data.push({'index': i, 'x': i%this.edgeLength, 'y': Math.floor(i/this.edgeLength), 
				'state': 0, 'color': ''})
		}

		this.setState({'data': data});

		this.margin = {'top': this.edgeLength*.1, 'bottom': this.edgeLength*.1, 'left': this.edgeLength*.1, 'right': this.edgeLength*.1}

		this.xScale = d3.scaleLinear()
			.domain([0, this.edgeLength])
			.range([this.margin.left, this.size - this.margin.right])

		this.yScale = d3.scaleLinear()
			.domain([0, this.edgeLength])
			.range([this.margin.top, this.size - this.margin.bottom])


		this.squareLength = this.size / this.edgeLength


		return data;

	}

	updateVis(){	
		// console.log(this.state.data)

		this.viscontainer
			.selectAll(".main-rect")
			.data(this.state.data)
			// .attr("fill", (d,i) => {return this.floatToGrayscale(d.state)})
			.attr("fill", (d,i) => {
				return d.color === '' ? 'black' : d.color;
			})
			.attr("fill-opacity", (d,i) => {return d.state})
			.transition(1000)
	}

	computeVal(index){
		if(index < 0 || index >= this.edgeLength**2){
			return -1;
		}
		else{
			// console.log(this.state.data[index].state)
			return this.state.data[index].state;
		}
	}

	mod(a, b){
		//needed otherwise -1 % 8  = -1 
		return ((a%b)+b)%b;
	}

	computeNeighbors(index){
		//goal is to return list of neighbors in formate
		//[up, right, down, left]
		//return actual vals
		// wraps around to other side

		// let r = Math.floor(index/this.edgeLength);
		// let c = index%edgeLength

		let up = this.computeVal(this.mod((index - this.edgeLength),(this.edgeLength**2)));
		let down = this.computeVal(this.mod((index + this.edgeLength),(this.edgeLength**2)));


		let rawleft = index%this.edgeLength==0 ? index+this.edgeLength-1 : index - 1;
		let left = this.computeVal(rawleft);

		let rawright = (index+1)%this.edgeLength==0 ? index-this.edgeLength+1 : index + 1;
		let right = this.computeVal(rawright);


		let upleft = this.computeVal(this.mod((rawleft - this.edgeLength),(this.edgeLength**2)));
		let downleft = this.computeVal(this.mod((rawleft + this.edgeLength),(this.edgeLength**2)));
		
		let upright = this.computeVal(this.mod((rawright - this.edgeLength),(this.edgeLength**2)));
		let downright = this.computeVal(this.mod((rawright + this.edgeLength),(this.edgeLength**2)));


		return [upleft, up, upright, right, downright, down, downleft, left]
	}

	floatToGrayscale(val){
		//https://stackoverflow.com/questions/16179713/converting-float-values-to-a-grayscale-hex-color-value
		// console.log(val)
		let dec = 255 * (1-val);
		let encoding = ("0" + Number(parseInt(dec, 10)).toString(16)).slice(-2);
		// console.log("#" + encoding.repeat(3))
		return "#" + encoding.repeat(3);
	}

	floatToHSL(val){
		return "hsl(" + Math.round(360*val) + ", 100%, 50%)" 
	}

	computeNextState(){
		this.setState((prevState) => {
			let newState = prevState.data.map((item, index) => {
				let neighbors = this.computeNeighbors(index);
				neighbors.upleft = neighbors[0]
				neighbors.up = neighbors[1]
				neighbors.upright = neighbors[2]
				neighbors.right = neighbors[3]
				neighbors.downright = neighbors[4]
				neighbors.down = neighbors[5]
				neighbors.downleft = neighbors[6]
				neighbors.left = neighbors[7]

				// console.log(neighbors)

				neighbors.curr = item.state
				neighbors.ones = neighbors.filter(x => x === 1).length
				neighbors.zeroes = neighbors.filter(x => x === 0).length
				neighbors.corners = neighbors.filter((x,i) => {return x === 1 && (i%2 === 0)}).length
				neighbors.sides = neighbors.filter((x,i) => {return x === 1 && (i%2 === 1)}).length

				let ctx = neighbors;

				ctx.index = index
				ctx.x = item.x
				ctx.y = item.y


				// return this.props.rule(n)

				let tempitem = {...item}

				// tempitem.state = this.props.rule(n)
				// console.log(this.props.rule(n))

				let value = this.props.rule(ctx);

				// console.log(ctx)

				if(typeof value === 'number'){
					tempitem.state = value;
				}

				if(ctx.color !== ''){
					tempitem.color = ctx.color;
				}
				else{
					tempitem.color = '';
				}



				// //substitute rule here

				// if(neighbors.filter(x => x==1).length  === 0){
				// 	tempitem.state =  1 - tempitem.state
				// }
				// else{
				// 	tempitem.state =  tempitem.state
				// }

				return tempitem;


			})

			return {'data': newState};

		})
	}

	flipItem(d){
		this.setState((prevState) => {


					let newState = prevState.data.map((item, index) => {
						if(index === d.index){
							let tempitem = {...item};

							if(tempitem.state < 0.5){
								tempitem.state = 1;
							}
							else{
								tempitem.state = 0;
							}

							// tempitem.state = 1 - tempitem.state;
							// console.log(tempitem)
							return tempitem;
						}
						else{
							return item;
						}
					})

					return {data: newState};
				})
		this.updateVis();
	}


	drawChart(){

		//get data right away so we dont have to worry about async issues

		this.data = this.setup();
		console.log(this.edgeLength)
		console.log("hi")
		this.svg = d3.select("#" + this.props.id)
			.attr("width", this.size + this.margin.left + this.margin.right)
			.attr("height", this.size + this.margin.top + this.margin.bottom)


		// console.log(this.svg.select('g').remove());

		this.svg.selectAll('g').remove()
		this.svg.selectAll('rect').remove()

		this.viscontainer = this.svg.append("g");
		// console.log(this.viscontainer);
		// console.log(this.state.data)

		let outerthis = this;

		console.log(this.state.data.length)

		//background color
		this.viscontainer
			.append('g')
			.selectAll(".background-rect")
			.data(this.data)
			.enter()
			.append("rect")
			.attr("class", 'background-rect')
			.attr("fill", (d,i) => {return 'white'})
			.attr("stroke-width", 2)
			.attr("stroke", "black")
			.attr("x", (d,i) => this.xScale(d.x))
			.attr("y", (d,i) => this.yScale(d.y))
			.attr("rx", (d,i) => this.squareLength*.2)
			.attr("ry", (d,i) => this.squareLength*.2)
			.attr("width", this.squareLength)
			.attr("height", this.squareLength)



		this.viscontainer
			.append('g')
			.selectAll(".main-rect")
			.data(this.data)
			.enter()
			.append("rect")
			.attr("class", 'main-rect')
			.attr("id", (d,i) => d.index)
			// .attr("fill", (d,i) => {return d.state ? "black" : "white"})
			.attr("fill", (d,i) => {return d.color === '' ? 'white' : d.color;})
			.attr("stroke-width", 2)
			.attr("stroke", "black")
			.attr("x", (d,i) => this.xScale(d.x))
			.attr("y", (d,i) => this.yScale(d.y))
			.attr("rx", (d,i) => this.squareLength*.2)
			.attr("ry", (d,i) => this.squareLength*.2)
			.attr("width", this.squareLength)
			.attr("height", this.squareLength)

			.on("mousedown", (e,d) =>{
				// console.log(e)
				// console.log(d)
				outerthis.isDown = true;

				outerthis.flipItem(d);
				
			})
			.on("mouseup", (e,d) => {
				outerthis.isDown = false;
			})
			.on("mouseover", (e,d)=> {
				if(outerthis.isDown){
					outerthis.flipItem(d);
				}
			})


		//avoids when you click down on vis but move mouse out
		d3.select('body')
			.on("mouseup", (e,d) => {
				outerthis.isDown = false;
			})
		
		// this.refresh();
	}


	componentDidMount(){
		this.drawChart();

	}

	refresh(){

		if(this.props.play){
			this.computeNextState();
			this.updateVis()
		}

		setTimeout(this.refresh, this.props.refreshRate);
		
	}



	componentDidUpdate(prevProps){


		if(this.props.edgeLength !== prevProps.edgeLength){
			console.log("lol")
			this.drawChart();
		}
		// if(this.props.play !== prevProps.play){
		// 	if(this.props.play){
		// 		this.refresh()

		// 		// //clear interval jic
		// 		// clearInterval(this.state.interval);

		// 		// let interval = setInterval(()=>{this.computeNextState(); this.updateVis();}, this.props.refreshRate);
		// 		// this.setState({
		// 		// 	'interval': interval
		// 		// })
		// 	}
		// 	// else{
		// 	// 	clearInterval(this.state.interval)
		// 	// 	this.setState({
		// 	// 		'interval': null
		// 	// 	})

		// 	// }
		// }

	}


	render(){
		return (
			<svg id={this.props.id} key={this.props.edgeLength}>
			</svg>
		);
	}
}

export default Visualization;