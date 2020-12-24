import React from 'react'
import * as d3 from 'd3'

class Visualization extends React.Component {

	//props
	//this.edgeLength = edge length of number of shapes per side
	//id
	//this.size = pixel length

	constructor(props){
		super(props);

		let data = [];

		this.edgeLength = this.props.edgeLength;
		this.size = this.props.size;

		for(let i = 0; i < this.edgeLength**2; i++){
			data.push({'index': i, 'x': i%this.edgeLength, 'y': Math.floor(i/this.edgeLength), 'state': 0})
		}

		this.state = {'data': data};

		this.margin = {'top': this.edgeLength*.1, 'bottom': this.edgeLength*.1, 'left': this.edgeLength*.1, 'right': this.edgeLength*.1}

		this.xScale = d3.scaleLinear()
			.domain([0, this.edgeLength])
			.range([this.margin.left, this.size - this.margin.right])

		this.yScale = d3.scaleLinear()
			.domain([0, this.edgeLength])
			.range([this.margin.top, this.size - this.margin.bottom])


		this.squareLength = this.size / this.edgeLength


		this.updateVis = this.updateVis.bind(this);

		this.computeNextState = this.computeNextState.bind(this);

		this.computeVal = this.computeVal.bind(this)
		this.computeNeighbors = this.computeNeighbors.bind(this);

		this.mod = this.mod.bind(this)
	}

	updateVis(){	
		// console.log(this.state.data)

		this.viscontainer
			.selectAll("rect")
			.data(this.state.data)
			.attr("fill", (d,i) => {return d.state ? "black" : "white"})
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

		let left = index%this.edgeLength==0 ? this.computeVal(index+this.edgeLength-1) : this.computeVal(index - 1);
		let right = (index+1)%this.edgeLength==0 ? this.computeVal(index-this.edgeLength+1) : this.computeVal(index + 1)

		return [up, right, down, left]
	}


	computeNextState(){
		this.setState((prevState) => {
			let newState = prevState.data.map((item, index) => {
				let neighbors = this.computeNeighbors(index);
				neighbors.up = neighbors[0]
				neighbors.right = neighbors[1]
				neighbors.down = neighbors[2]
				neighbors.left = neighbors[3]
				neighbors.curr = item.state

				let n = neighbors;


				// return this.props.rule(n)

				let tempitem = {...item}

				// tempitem.state = this.props.rule(n)
				// console.log(this.props.rule(n))

				let value = this.props.rule(n);

				if(value === 1 || value === 0){
					tempitem.state = value;
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


	componentDidMount(){
		this.svg = d3.select("#" + this.props.id)
			.attr("width", this.size + this.margin.left + this.margin.right)
			.attr("height", this.size + this.margin.top + this.margin.bottom)

		this.viscontainer = this.svg.append("g");
		// console.log(this.viscontainer);
		// console.log(this.state.data)

		let outerthis = this;

		this.viscontainer
			.selectAll("rect")
			.data(this.state.data)
			.enter()
			.append("rect")
			.attr("id", (d,i) => d.index)
			.attr("fill", (d,i) => {return d.state ? "black" : "white"})
			.attr("stroke-width", 2)
			.attr("stroke", "black")
			.attr("x", (d,i) => this.xScale(d.x))
			.attr("y", (d,i) => this.yScale(d.y))
			.attr("rx", (d,i) => this.squareLength*.2)
			.attr("ry", (d,i) => this.squareLength*.2)
			.attr("width", this.squareLength)
			.attr("height", this.squareLength)

			.on("click", (e,d) =>{
				// console.log(e)
				// console.log(d)
				outerthis.setState((prevState) => {
					
					let newState = prevState.data.map((item, index) => {
						if(index === d.index){
							let tempitem = {...item};
							tempitem.state = 1 - tempitem.state;
							// console.log(tempitem)
							return tempitem;
						}
						else{
							return item;
						}
					})

					return {data: newState};
				})
				outerthis.updateVis();
			})


		setInterval(()=>{this.computeNextState(); this.updateVis();}, 1000)

	}


	render(){
		return (
			<svg id={this.props.id}>
			</svg>
		);
	}
}

export default Visualization;