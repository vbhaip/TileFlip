(this["webpackJsonpsimulation-generation"]=this["webpackJsonpsimulation-generation"]||[]).push([[0],{165:function(t,e,i){},166:function(t,e,i){},698:function(t,e,i){"use strict";i.r(e);var a=i(2),n=i(0),r=i.n(n),s=i(32),o=i.n(s),h=(i(165),function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,717)).then((function(e){var i=e.getCLS,a=e.getFID,n=e.getFCP,r=e.getLCP,s=e.getTTFB;i(t),a(t),n(t),r(t),s(t)}))}),l=i(24),c=i(25),u=i(28),d=i(26),p=i(4),g=(i(166),i(714)),f=i(715),m=i(88),b=i(126),y=i(37),j=i(90),v=i.n(j),x=function(t){Object(u.a)(i,t);var e=Object(d.a)(i);function i(t){var a;return Object(l.a)(this,i),(a=e.call(this,t)).state={data:[],interval:null,ready:!1,existingBlobs:[],time:0},a.updateVis=a.updateVis.bind(Object(p.a)(a)),a.computeNextState=a.computeNextState.bind(Object(p.a)(a)),a.computeVal=a.computeVal.bind(Object(p.a)(a)),a.computeNeighbors=a.computeNeighbors.bind(Object(p.a)(a)),a.mod=a.mod.bind(Object(p.a)(a)),a.floatToGrayscale=a.floatToGrayscale.bind(Object(p.a)(a)),a.floatToHSL=a.floatToHSL.bind(Object(p.a)(a)),a.refresh=a.refresh.bind(Object(p.a)(a)),a.setup=a.setup.bind(Object(p.a)(a)),a.drawChart=a.drawChart.bind(Object(p.a)(a)),a.flipItem=a.flipItem.bind(Object(p.a)(a)),a.setup(),a.refresh(),a.gif=new v.a({workers:3,quality:1,repeat:0,workerScript:"/simulation-generation/gif.worker.js",debug:!0}),a.addGifItem=a.addGifItem.bind(Object(p.a)(a)),a}return Object(c.a)(i,[{key:"setup",value:function(){var t=[];this.edgeLength=this.props.edgeLength,this.size=this.props.size;for(var e=0;e<Math.pow(this.edgeLength,2);e++)t.push({index:e,x:e%this.edgeLength,y:Math.floor(e/this.edgeLength),state:0,color:"",animate:!1});return this.setState({data:t}),this.margin={top:.1*this.edgeLength,bottom:.1*this.edgeLength,left:.1*this.edgeLength,right:.1*this.edgeLength},this.xScale=y.b().domain([0,this.edgeLength]).range([this.margin.left,this.size-this.margin.right]),this.yScale=y.b().domain([0,this.edgeLength]).range([this.margin.top,this.size-this.margin.bottom]),this.squareLength=this.size/this.edgeLength,console.log(this.props.initdata),Object.entries(this.props.initdata).forEach((function(e){var i=Object(b.a)(e,2),a=i[0],n=i[1];try{t[parseInt(a)].state=parseFloat(n)}catch(r){console.log(r)}})),t}},{key:"updateVis",value:function(){var t=this;this.viscontainer.selectAll(".main-rect").data(this.state.data).filter((function(t,e){return t.animate})).transition().duration((function(e,i){return t.props.refreshRate})).ease(y.a).attr("fill",(function(t,e){return""===t.color?"black":t.color})).attr("fill-opacity",(function(t,e){return t.state})),this.viscontainer.selectAll(".main-rect").data(this.state.data).filter((function(t,e){return!t.animate})).attr("fill",(function(t,e){return""===t.color?"black":t.color})).attr("fill-opacity",(function(t,e){return t.state}))}},{key:"updateVisDiscreteFlip",value:function(){this.viscontainer.selectAll(".main-rect").data(this.state.data).attr("fill",(function(t,e){return""===t.color?"black":t.color})).attr("fill-opacity",(function(t,e){return t.state}))}},{key:"computeVal",value:function(t){return t<0||t>=Math.pow(this.edgeLength,2)?-1:this.state.data[t].state}},{key:"mod",value:function(t,e){return(t%e+e)%e}},{key:"computeNeighbors",value:function(t){var e=this.computeVal(this.mod(t-this.edgeLength,Math.pow(this.edgeLength,2))),i=this.computeVal(this.mod(t+this.edgeLength,Math.pow(this.edgeLength,2))),a=t%this.edgeLength===0?t+this.edgeLength-1:t-1,n=this.computeVal(a),r=(t+1)%this.edgeLength===0?t-this.edgeLength+1:t+1,s=this.computeVal(r),o=this.computeVal(this.mod(a-this.edgeLength,Math.pow(this.edgeLength,2))),h=this.computeVal(this.mod(a+this.edgeLength,Math.pow(this.edgeLength,2)));return[o,e,this.computeVal(this.mod(r-this.edgeLength,Math.pow(this.edgeLength,2))),s,this.computeVal(this.mod(r+this.edgeLength,Math.pow(this.edgeLength,2))),i,h,n]}},{key:"floatToGrayscale",value:function(t){return"#"+("0"+Number(parseInt(255*(1-t),10)).toString(16)).slice(-2).repeat(3)}},{key:"floatToHSL",value:function(t){return"hsl("+Math.round(t%1*360)+", 100%, 50%)"}},{key:"computeNextState",value:function(){var t=this;this.setState((function(e){return{data:e.data.map((function(i,a){var n=Object(m.a)({},i),r=t.computeNeighbors(a),s={};s.upleft=r[0],s.up=r[1],s.upright=r[2],s.right=r[3],s.downright=r[4],s.down=r[5],s.downleft=r[6],s.left=r[7],s.neighbors=r,s.curr=i.state,s.ones=r.filter((function(t){return 1===t})).length,s.zeroes=r.filter((function(t){return 0===t})).length,s.corners=r.filter((function(t,e){return 1===t&&e%2===0})).length,s.sides=r.filter((function(t,e){return 1===t&&e%2===1})).length,s.index=a,s.x=i.x,s.y=i.y,s.color=n.color,s.float_to_color=t.floatToHSL,s.resolution=t.props.edgeLength,s.t=e.time;var o=t.props.rule(s);return"number"!==typeof o||isNaN(o)||(n.state=o),"boolean"===typeof o&&(n.state=o?1:0),""!==s.color?n.color=s.color:n.color="",!0===s.animate?n.animate=!0:n.animate=!1,n})),time:e.time+1}}))}},{key:"flipItem",value:function(t){this.setState((function(e){return{data:e.data.map((function(e,i){if(i===t.index){var a=Object(m.a)({},e);return a.state<.5?a.state=1:a.state=0,a}return e}))}})),this.updateVisDiscreteFlip()}},{key:"drawChart",value:function(){var t=this;this.data=this.setup(),this.svg=y.c("#"+this.props.id).attr("width",this.size+this.margin.left+this.margin.right).attr("height",this.size+this.margin.top+this.margin.bottom),this.svg.selectAll("g").remove(),this.svg.selectAll("rect").remove(),this.viscontainer=this.svg.append("g");var e=this;this.viscontainer.append("g").selectAll(".background-rect").data(this.data).enter().append("rect").attr("class","background-rect").attr("fill",(function(t,e){return"white"})).attr("stroke-width",2).attr("stroke","black").attr("x",(function(e,i){return t.xScale(e.x)})).attr("y",(function(e,i){return t.yScale(e.y)})).attr("rx",(function(e,i){return.2*t.squareLength})).attr("ry",(function(e,i){return.2*t.squareLength})).attr("width",this.squareLength).attr("height",this.squareLength),this.viscontainer.append("g").selectAll(".main-rect").data(this.data).enter().append("rect").attr("class","main-rect").attr("id",(function(t,e){return t.index})).attr("fill",(function(t,e){return""===t.color?"black":t.color})).attr("fill-opacity",(function(t,e){return t.state})).attr("stroke-width",2).attr("stroke","black").attr("x",(function(e,i){return t.xScale(e.x)})).attr("y",(function(e,i){return t.yScale(e.y)})).attr("rx",(function(e,i){return.2*t.squareLength})).attr("ry",(function(e,i){return.2*t.squareLength})).attr("width",this.squareLength).attr("height",this.squareLength),this.props.isMobile?this.viscontainer.selectAll(".main-rect").on("touchstart",(function(t,i){e.isDown=!0,e.flipItem(i)})).on("touchend",(function(t,i){e.isDown=!1})):this.viscontainer.selectAll(".main-rect").on("mousedown",(function(t,i){e.isDown=!0,e.flipItem(i)})).on("mouseup",(function(t,i){e.isDown=!1})).on("mouseover",(function(t,i){e.isDown&&e.flipItem(i)})),y.c("body").on("mouseup",(function(t,i){e.isDown=!1})),this.setState({ready:!0})}},{key:"componentDidMount",value:function(){this.drawChart()}},{key:"refresh",value:function(){this.props.play&&this.state.ready&&(this.addGifItem(),this.computeNextState(),this.updateVis()),setTimeout(this.refresh,this.props.refreshRate)}},{key:"componentDidUpdate",value:function(t){if(this.props.edgeLength!==t.edgeLength&&this.drawChart(),this.props.play!==t.play&&this.props.play){for(var e={},i=0;i<this.state.data.length;i++)0!==this.state.data[i].state&&(e[i]=this.state.data[i].state.toFixed(2));this.props.setExportInitData(JSON.stringify(e)),this.gif=new v.a({workers:3,quality:1,repeat:0,workerScript:"/simulation-generation/gif.worker.js",debug:!0}),this.state.existingBlobs.map((function(t){URL.revokeObjectURL(t)})),this.setState({existingBlobs:[],time:0}),this.props.setGifURL("")}if(this.props.play!==t.play&&!this.props.play&&this.gif.frames.length>0){this.gif.render();var a=this;this.gif.on("finished",(function(t){var e=URL.createObjectURL(t,{type:"image/gif"});a.setState((function(t){return{existingBlobs:t.existingBlobs.concat(e)}})),a.props.setGifURL(e)}))}}},{key:"addGifItem",value:function(){if(!(this.state.existingBlobs.length>50)){var t=new Image,e=(new XMLSerializer).serializeToString(this.svg.node()),i=new Blob([e],{type:"image/svg+xml"}),a=URL.createObjectURL(i);this.setState((function(t){return{existingBlobs:t.existingBlobs.concat(a)}}));var n=this;t.onload=function(){n.gif.addFrame(t,{delay:n.props.refreshRate,copy:!0})},t.src=a}}},{key:"render",value:function(){return Object(a.jsx)("svg",{id:this.props.id},this.props.edgeLength)}}]),i}(r.a.Component),O=i(716),L=i(48),w=i(121),S=i.n(w),R=(i(176),i(177),i(178),i(49)),k=i.n(R),F=i(50),C=i.n(F),I=function(t){Object(u.a)(i,t);var e=Object(d.a)(i);function i(t){var a;if(Object(l.a)(this,i),(a=e.call(this,t)).handleRuleChange=a.handleRuleChange.bind(Object(p.a)(a)),a.handleRuleChangeAce=a.handleRuleChangeAce.bind(Object(p.a)(a)),a.updateResolution=a.updateResolution.bind(Object(p.a)(a)),a.handlePlayChange=a.handlePlayChange.bind(Object(p.a)(a)),a.setExportInitData=a.setExportInitData.bind(Object(p.a)(a)),a.shareURL=a.shareURL.bind(Object(p.a)(a)),a.setGifURL=a.setGifURL.bind(Object(p.a)(a)),a.updateRefresh=a.updateRefresh.bind(Object(p.a)(a)),a.setStateFromQuery=a.setStateFromQuery.bind(Object(p.a)(a)),a.progressExample=a.progressExample.bind(Object(p.a)(a)),a.rawquery=window.location.search.slice(1),a.query=k.a.parse(a.rawquery),fetch("/simulation-generation/examples.txt").then((function(t){return t.text()})).then((function(t){if(a.examples=t.split("\n\n"),a.examples=a.examples.map((function(t){return t.slice(t.indexOf(":")+1)})),console.log(a.examples),a.curr_example=0,0===Object.keys(a.query).length){var e=k.a.parse(a.examples[a.curr_example]);a.setStateFromQuery(e)}a.setState({curr_example:0,examples:a.examples})})),a.refreshRate=1e3,a.edgeLength=10,a.editor_val="function rule(ctx){\n\n        }",a.play=!1,a.initdata=[],"refreshRate"in a.query&&(a.refreshRate=parseInt(a.query.refreshRate)),"resolution"in a.query&&(a.edgeLength=parseInt(a.query.resolution)),"code"in a.query&&(a.editor_val=C.a.decode(a.query.code)),"play"in a.query&&"true"===a.query.play&&(a.play=!0),"state"in a.query)try{a.initdata=JSON.parse(a.query.state)}catch(n){console.log(n)}return a.initrule=a.getFunctionFromString(a.editor_val),a.state={rule:a.initrule,edgeLength:a.edgeLength,play:a.play,editor_val:a.editor_val,refreshRate:a.refreshRate,exportInitData:"",gifURL:""},a.state.initdata=a.initdata,L.isMobile?(a.viswidth=.65*window.innerWidth,a.editorwidth=.7*window.innerWidth,a.fontSize=10):(a.viswidth=.4*window.innerHeight,a.editorwidth=.4*window.innerWidth,a.fontSize=14),a}return Object(c.a)(i,[{key:"setStateFromQuery",value:function(t){if(console.log(t),"refreshRate"in t&&this.setState({refreshRate:parseInt(t.refreshRate)}),"resolution"in t&&this.setState({edgeLength:parseInt(t.resolution)}),"code"in t){var e=C.a.decode(t.code);this.setState({editor_val:e}),this.setState({rule:this.getFunctionFromString(e)})}if("play"in t&&"true"===t.play&&this.setState({play:!0}),"state"in t&&t.state.length>0)try{this.setState({initdata:JSON.parse(t.state)})}catch(a){console.log(a)}else{this.initdata={};for(var i=0;i<Math.pow(this.edgeLength,2);i++)this.initdata[i]=0;this.setState({initdata:this.initdata})}}},{key:"progressExample",value:function(){var t=this;this.setState((function(e){var i=(e.curr_example+1)%e.examples.length;return t.setStateFromQuery(k.a.parse(e.examples[i])),{curr_example:i}}))}},{key:"setExportInitData",value:function(t){this.setState({exportInitData:t})}},{key:"updateRefresh",value:function(t,e){console.log(e),this.setState({refreshRate:e})}},{key:"getFunctionFromString",value:function(t){try{return new Function("x","\n        try{\n          // ".concat(t.replace(/\n/g,""),";\n          let f = ").concat(t,"\n\n          return f(x);\n        }\n        catch(error){\n          return error;\n        }\n        "))}catch(e){console.log(e)}return this.state?new Function("x","return null;"):this.state.rule}},{key:"handleRuleChange",value:function(t){console.log(t);try{var e=new Function("ctx","\n        try{\n          ".concat(t.target.value.replace(/\n/g,""),";\n        }\n        catch(error){\n          return error;\n        }\n        "));this.setState({rule:e}),console.log(e)}catch(i){console.log(i)}}},{key:"handleRuleChangeAce",value:function(t){this.setState({editor_val:t}),console.log(t),console.log(C.a.encode(t));var e=this.getFunctionFromString(t);this.setState({rule:e})}},{key:"updateResolution",value:function(t,e){this.setState({edgeLength:e,initdata:[]})}},{key:"handlePlayChange",value:function(t){this.setState((function(t){return{play:!t.play}}))}},{key:"shareURL",value:function(){var t={};t.refreshRate=this.state.refreshRate,t.play=!0,t.resolution=this.state.edgeLength,t.code=C.a.encode(this.state.editor_val),t.state=this.state.exportInitData;var e=k.a.stringify(t),i=window.location.toString(),a=(i=i.slice(0,i.lastIndexOf("/")))+"?"+e;console.log(a),window.history.pushState("","",a),window.prompt("Copy to share (Ctrl+C, Enter)",a)}},{key:"setGifURL",value:function(t){this.setState({gifURL:t})}},{key:"render",value:function(){return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsxs)("div",{id:"vis-container",children:[Object(a.jsx)(x,{id:"viz",edgeLength:this.state.edgeLength,size:this.viswidth,rule:this.state.rule,play:this.state.play,refreshRate:this.state.refreshRate,initdata:this.state.initdata,setExportInitData:this.setExportInitData,setGifURL:this.setGifURL,isMobile:L.isMobile}),Object(a.jsx)("p",{style:{color:this.props.theme.palette.lightText.main,fontFamily:this.props.theme.typography.fontFamily},children:"Refresh Rate (ms)"}),Object(a.jsx)(f.a,{defaultValue:this.refreshRate,valueLabelDisplay:"auto",step:100,marks:!0,min:200,max:2e3,value:this.state.refreshRate,style:{width:"50%"},onChange:this.updateRefresh}),Object(a.jsx)("p",{style:{color:this.props.theme.palette.lightText.main,fontFamily:this.props.theme.typography.fontFamily},children:"Resolution"}),Object(a.jsx)(f.a,{defaultValue:this.edgeLength,valueLabelDisplay:"auto",step:1,marks:!0,min:4,max:15,value:this.state.edgeLength,onChange:this.updateResolution,style:{width:"50%"}}),Object(a.jsx)("br",{}),Object(a.jsx)("br",{}),Object(a.jsx)(g.a,{variant:"contained",color:"primary",onClick:this.handlePlayChange,children:this.state.play?"Pause":"Play"}),Object(a.jsx)("br",{}),Object(a.jsx)("br",{}),Object(a.jsx)(g.a,{variant:"contained",color:"primary",onClick:this.shareURL,children:"Share URL"}),Object(a.jsx)("br",{}),Object(a.jsx)("br",{}),Object(a.jsx)("a",{target:"_blank",href:""!==this.state.gifURL&&this.state.gifURL,download:"evolution.gif",style:{color:"inherit","text-decoration":"none"},children:Object(a.jsx)(g.a,{variant:"contained",color:"primary",download:this.state.gifURL,disabled:""===this.state.gifURL,target:"_blank",children:""!==this.state.gifURL?"Download as GIF":"GIF not ready"})})]}),Object(a.jsxs)("div",{id:"controls-container",children:[Object(a.jsx)(S.a,{mode:"javascript",theme:"monokai",name:"editor",onChange:this.handleRuleChangeAce,fontSize:this.fontSize,showPrintMargin:!0,showGutter:!0,highlightActiveLine:!0,value:this.state.editor_val,height:.5*window.innerHeight,setOptions:{enableBasicAutocompletion:!0,enableLiveAutocompletion:!0,enableSnippets:!1,showLineNumbers:!L.isMobile,showGutter:!L.isMobile,tabSize:2},width:this.editorwidth+"px"}),Object(a.jsx)(g.a,{variant:"contained",color:"primary",onClick:this.progressExample,children:"Next Example"}),Object(a.jsx)("br",{}),Object(a.jsx)("br",{}),Object(a.jsx)(g.a,{variant:"contained",color:"secondary",href:"#help",children:"Help/More Info"})]})]})}}]),i}(r.a.Component),U=Object(O.a)(I),q=i(122),D=i.n(q),M=i(123),A=i.n(M),V=function(t){Object(u.a)(i,t);var e=Object(d.a)(i);function i(t){var a;return Object(l.a)(this,i),(a=e.call(this,t)).state={text:""},fetch("/simulation-generation/info.md").then((function(t){return t.text()})).then((function(t){a.setState({text:t})})),a}return Object(c.a)(i,[{key:"render",value:function(){return Object(a.jsxs)("div",{style:{marginLeft:"20vw",marginRight:"20vw",color:"white"},children:[Object(a.jsx)(D.a,{plugins:[A.a],children:this.state.text}),Object(a.jsx)("div",{style:{textAlign:"center"},children:Object(a.jsx)(g.a,{variant:"contained",color:"primary",href:"#",children:"Back"})})]})}}]),i}(r.a.Component),G=i(125),_=i(713),z=i(124),N=i(5),B=Object(G.a)({palette:{primary:{main:"#9B6A6C"},secondary:{main:"#6DC0D5"},error:{main:"#c1666b"},warning:{main:"#d4b843"},black:{main:"#020202"},lightText:{main:"#F7F0F5"}},typography:{fontFamily:"'Oswald'"}}),E=function(t){Object(u.a)(i,t);var e=Object(d.a)(i);function i(){return Object(l.a)(this,i),e.apply(this,arguments)}return Object(c.a)(i,[{key:"render",value:function(){return Object(a.jsx)(z.a,{children:Object(a.jsxs)(N.c,{children:[Object(a.jsx)(N.a,{exact:!0,path:"/",children:Object(a.jsx)(_.a,{theme:B,children:Object(a.jsx)(U,{})})}),Object(a.jsx)(N.a,{exact:!0,path:"/help",children:Object(a.jsx)(_.a,{theme:B,children:Object(a.jsx)(V,{})})})]})})}}]),i}(r.a.Component),T=Object(O.a)(E);o.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(T,{})}),document.getElementById("root")),h()}},[[698,1,2]]]);
//# sourceMappingURL=main.e1d45983.chunk.js.map